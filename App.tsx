
import React, { useState } from 'react';
import { Sparkles, Copy, Download, RefreshCw, Check, Info, Image as ImageIcon, Layout as LayoutIcon, List, Smile, Shield } from 'lucide-react';
import { 
  PRODUCT_TYPES, 
  VISUAL_STYLES, 
  ASPECT_RATIOS, 
  COLOR_PALETTES, 
  AUDIENCES,
  CONTENT_FORMATS,
  LAYOUT_STRUCTURES,
  MOOD_AND_TONES,
  WATERMARK_POSITIONS
} from './constants';
import { PromptConfig, GenerationResult, ProductType, VisualStyle, AspectRatio, TargetAudience } from './types';
import { generateEduVisual } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<PromptConfig>({
    productType: 'Worksheet',
    style: 'Flat Design' as any,
    ratio: '3:4',
    colorPalette: 'Warna Pastel',
    topic: 'Penjumlahan Dasar',
    audience: 'SD' as any,
    language: 'Indonesian',
    contentFormat: 'Kotak Latihan (Baris/Kolom)',
    layoutStructure: 'Header-Body-Footer',
    moodAndTone: 'Ceria & Menyenangkan',
    watermarkText: '',
    watermarkPosition: 'Tidak Ada',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!config.topic) return;
    setIsLoading(true);
    try {
      const data = await generateEduVisual(config);
      setResult(data);
    } catch (error) {
      console.error("Gagal menghasilkan:", error);
      alert("Gagal membuat konten. Silakan periksa koneksi Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.refinedPrompt) {
      navigator.clipboard.writeText(result.refinedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-indigo-900">Studio <span className="text-indigo-600">EduVisual</span></h1>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <span>Lembar Kerja</span>
            <span>Poster</span>
            <span>Kartu Belajar</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Panel Kontrol */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
                <Info size={18} className="text-indigo-600" />
                Konfigurasi Media
              </h2>
              
              <div className="space-y-4">
                {/* Input Topik */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subjek atau Topik</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Tata Surya, Dasar Pecahan..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    value={config.topic}
                    onChange={(e) => setConfig({...config, topic: e.target.value})}
                  />
                </div>

                {/* Tipe Produk */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Media</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRODUCT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setConfig({...config, productType: type.id as ProductType})}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-all ${
                          config.productType === type.id 
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' 
                            : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                        }`}
                      >
                        {type.icon}
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood, Format & Layout */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                      <Smile size={14} className="text-indigo-500" /> Suasana & Nada (Mood)
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={config.moodAndTone}
                      onChange={(e) => setConfig({...config, moodAndTone: e.target.value})}
                    >
                      {MOOD_AND_TONES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                      <List size={14} className="text-indigo-500" /> Format Konten
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={config.contentFormat}
                      onChange={(e) => setConfig({...config, contentFormat: e.target.value})}
                    >
                      {CONTENT_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                      <LayoutIcon size={14} className="text-indigo-500" /> Struktur Tata Letak
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={config.layoutStructure}
                      onChange={(e) => setConfig({...config, layoutStructure: e.target.value})}
                    >
                      {LAYOUT_STRUCTURES.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                {/* Branding & Watermark Section */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Shield size={14} /> Branding & Perlindungan
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase">Teks Watermark</label>
                      <input 
                        type="text"
                        placeholder="Nama/Sekolah Anda"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500"
                        value={config.watermarkText}
                        onChange={(e) => setConfig({...config, watermarkText: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase">Posisi</label>
                      <select 
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500"
                        value={config.watermarkPosition}
                        onChange={(e) => setConfig({...config, watermarkPosition: e.target.value})}
                      >
                        {WATERMARK_POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Audiens & Gaya */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Audiens</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={config.audience}
                      onChange={(e) => setConfig({...config, audience: e.target.value as TargetAudience})}
                    >
                      {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gaya Visual</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={config.style}
                      onChange={(e) => setConfig({...config, style: e.target.value as VisualStyle})}
                    >
                      {VISUAL_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Rasio & Bahasa */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rasio Aspek</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={config.ratio}
                      onChange={(e) => setConfig({...config, ratio: e.target.value as AspectRatio})}
                    >
                      {ASPECT_RATIOS.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bahasa Konten</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={config.language}
                      onChange={(e) => setConfig({...config, language: e.target.value as any})}
                    >
                      <option value="Indonesian">Bahasa Indonesia</option>
                      <option value="English">Bahasa Inggris</option>
                    </select>
                  </div>
                </div>

                {/* Palet Warna */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Palet Warna</label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PALETTES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setConfig({...config, colorPalette: p.id})}
                        className={`group relative p-1 rounded-full border-2 transition-all ${
                          config.colorPalette === p.id ? 'border-indigo-600 scale-110' : 'border-transparent'
                        }`}
                        title={p.id}
                      >
                        <div className="flex w-10 h-6 rounded-full overflow-hidden shadow-sm">
                          {p.colors.map((c, i) => (
                            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isLoading || !config.topic}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                  {isLoading ? 'Sedang Merancang Keajaiban...' : 'Buat Prompt & Pratinjau'}
                </button>
              </div>
            </div>

            {/* Kotak Tips */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm">
              <p className="font-semibold mb-1 flex items-center gap-2">
                <Info size={16} /> Tips Ahli
              </p>
              <p>Output yang terstruktur membantu Anda memahami bagaimana konfigurasi yang Anda pilih memengaruhi hasil akhir pembuatan gambar AI.</p>
            </div>
          </section>

          {/* Panel Pratinjau */}
          <section className="lg:col-span-7 space-y-6">
            {!result && !isLoading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white text-slate-400 p-8 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon size={40} />
                </div>
                <h3 className="text-xl font-medium text-slate-600 mb-2">Belum Ada Hasil</h3>
                <p className="max-w-xs text-slate-500">Konfigurasi materi Anda di panel kiri dan klik tombol buat untuk melihat keajaibannya.</p>
              </div>
            )}

            {isLoading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-8 text-center animate-pulse">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                  <RefreshCw className="animate-spin" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Berpikir...</h3>
                <p className="text-slate-500 max-w-sm">Gemini sedang mendesain konten edukasi Anda, melindunginya dengan watermark, dan memilih nada yang sempurna.</p>
              </div>
            )}

            {result && !isLoading && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Pratinjau Gambar */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Visualisasi Pratinjau</span>
                    <button 
                      onClick={() => result.imageUrl && window.open(result.imageUrl, '_blank')}
                      className="p-2 hover:bg-white rounded-lg transition-colors text-indigo-600"
                      title="Buka ukuran penuh"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                  <div className="p-4 flex justify-center bg-slate-100">
                    <img 
                      src={result.imageUrl} 
                      alt="Pratinjau AI" 
                      className="max-h-[500px] rounded-lg shadow-xl object-contain bg-white"
                    />
                  </div>
                </div>

                {/* Detail Prompt */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Prompt yang Disempurnakan</span>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-all active:scale-95"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Berhasil Disalin!' : 'Salin Semua Prompt'}
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-4">
                      {result.refinedPromptParts.map((part, idx) => (
                        <div key={idx} className="group">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{part.label}</span>
                          </div>
                          <div className="bg-slate-900 text-slate-300 p-3 rounded-xl font-mono text-sm leading-relaxed border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                            {part.content}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Sparkles size={16} className="text-amber-500" />
                        Rasional Desain
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                        {result.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Didukung oleh Google Gemini 3 Flash & 2.5 Flash Image. Dibuat untuk Guru & Pendidik.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
