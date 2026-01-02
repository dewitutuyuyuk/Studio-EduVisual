
import { GoogleGenAI, Type } from "@google/genai";
import { PromptConfig, GenerationResult } from "../types";

/**
 * Menghasilkan visual edukasi menggunakan Gemini 3 untuk penyempurnaan teks
 * dan Gemini 2.5 Flash Image untuk visualisasi aktual.
 */
export const generateEduVisual = async (config: PromptConfig): Promise<GenerationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `Anda adalah seorang ahli prompt engineering kelas dunia untuk generator gambar AI khusus materi pendidikan.
  Tujuan Anda adalah mengubah kebutuhan dasar pengguna menjadi prompt pembuatan gambar yang sangat mendetail dan profesional.
  
  FOKUS KRITIS:
  - Struktur: Bagi prompt akhir menjadi bagian logis: "Subjek & Elemen", "Gaya & Estetika", "Tata Letak & Komposisi", "Suasana & Pencahayaan", dan "Spesifikasi Teknis".
  - Utilitas Pendidikan: Lembar kerja harus memiliki area yang jelas untuk latihan. Poster harus memiliki hierarki informasi yang kuat.
  - Bahasa: Gunakan istilah pendidikan yang tepat dalam bahasa Indonesia atau Inggris sesuai permintaan.
  - Watermark: Jika watermarkText disediakan, deskripsikan sebagai elemen profesional yang halus di posisi yang diminta.
  
  Berikan respons dalam format JSON yang berisi array "refinedPromptParts" (label dan isi) dan "explanation" (rasional desain dalam Bahasa Indonesia).`;

  const watermarkPart = config.watermarkPosition !== 'Tidak Ada' && config.watermarkText 
    ? `Sertakan watermark teks yang halus dan bersih bertuliskan "${config.watermarkText}" di posisi ${config.watermarkPosition}.` 
    : '';

  const userPrompt = `Buat prompt visual berkualitas tinggi untuk materi ${config.productType}.
  Topik: ${config.topic}
  Target Audiens: ${config.audience}
  Suasana/Nada (Mood): ${config.moodAndTone}
  Format Konten: ${config.contentFormat}
  Struktur Tata Letak: ${config.layoutStructure}
  Gaya Visual: ${config.style}
  Palet Warna: ${config.colorPalette}
  Rasio Aspek: ${config.ratio}
  Bahasa Konten: ${config.language}
  ${watermarkPart}`;

  const textResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: userPrompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          refinedPromptParts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                content: { type: Type.STRING },
              },
              required: ["label", "content"],
            }
          },
          explanation: { type: Type.STRING },
        },
        required: ["refinedPromptParts", "explanation"],
      }
    }
  });

  const parsed = JSON.parse(textResponse.text || "{}");
  const fullPrompt = (parsed.refinedPromptParts || []).map((p: any) => p.content).join(' ');
  
  const imageResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: fullPrompt || userPrompt },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: config.ratio as any,
      },
    },
  });

  let imageUrl = undefined;
  if (imageResponse.candidates?.[0]?.content?.parts) {
    for (const part of imageResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  }

  return {
    refinedPrompt: fullPrompt,
    refinedPromptParts: parsed.refinedPromptParts || [],
    explanation: parsed.explanation || "",
    imageUrl,
  };
};
