
import React from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Layers, 
  Palette, 
  Layout, 
  Type
} from 'lucide-react';

export const PRODUCT_TYPES = [
  { id: 'Worksheet', label: 'Lembar Kerja', icon: <FileText size={20} /> },
  { id: 'Poster', label: 'Poster Pendidikan', icon: <ImageIcon size={20} /> },
  { id: 'Flashcard', label: 'Kartu Belajar (Flashcard)', icon: <Layers size={20} /> },
  { id: 'Infographic', label: 'Infografis', icon: <Layout size={20} /> },
  { id: 'Coloring Page', label: 'Halaman Mewarnai', icon: <Palette size={20} /> },
  { id: 'Classroom Banner', label: 'Spanduk Kelas', icon: <Type size={20} /> },
];

export const VISUAL_STYLES = [
  'Desain Flat (Flat Design)', 
  'Render 3D', 
  'Cat Air (Watercolor)', 
  'Minimalis', 
  'Vintage/Retro', 
  'Komik/Kartun', 
  'Realistik', 
  '3D Claymation', 
  'Seni Potong Kertas (Papercut)', 
  'Coretan (Doodle)', 
  'Gaya 3D Pixar'
];

export const MOOD_AND_TONES = [
  'Energetik & Semangat',
  'Tenang & Profesional',
  'Ceria & Menyenangkan',
  'Inspiratif & Imajinatif',
  'Canggih & Futuristik',
  'Lucu & Menggemaskan',
  'Serius & Berwibawa',
  'Organik & Alami'
];

export const WATERMARK_POSITIONS = [
  'Tidak Ada',
  'Kanan Bawah',
  'Kiri Bawah',
  'Kanan Atas',
  'Kiri Atas',
  'Tengah (Overlay Transparan)'
];

export const CONTENT_FORMATS = [
  'Kotak Latihan (Baris/Kolom)',
  'Langkah-demi-Langkah',
  'Fokus Subjek Tengah',
  'Perbandingan (Berdampingan)',
  'Peta Pikiran (Mindmap)',
  'Pilihan Ganda',
  'Isi Titik-titik',
  'Diagram & Keterangan'
];

export const LAYOUT_STRUCTURES = [
  'Header-Body-Footer',
  'Keseimbangan Simetris',
  'Pola-Z (Asimetris)',
  'Aturan Sepertiga (Rule of Thirds)',
  'Berita/Kolom (2 atau 3 Kolom)',
  'Radial / Melingkar',
  'Modular / Masonry',
  'Gambar Utama Besar (Hero)'
];

export const ASPECT_RATIOS: { id: string; label: string }[] = [
  { id: '1:1', label: 'Kotak (1:1)' },
  { id: '3:4', label: 'Potret (3:4)' },
  { id: '4:3', label: 'Lanskap (4:3)' },
  { id: '9:16', label: 'Cerita/Story (9:16)' },
  { id: '16:9', label: 'Layar Lebar (16:9)' },
];

export const COLOR_PALETTES = [
  { id: 'Warna Primer', colors: ['#FF0000', '#0000FF', '#FFFF00'] },
  { id: 'Warna Pastel', colors: ['#FFB7B2', '#B2FFB7', '#B2B2FF'] },
  { id: 'Nuansa Bumi (Earth Tones)', colors: ['#795548', '#8D6E63', '#A1887F'] },
  { id: 'Warna Neon', colors: ['#39FF14', '#FF00FF', '#00FFFF'] },
  { id: 'Hitam & Putih', colors: ['#000000', '#FFFFFF', '#808080'] },
  { id: 'Modern Korporat', colors: ['#003366', '#004080', '#0059b3'] },
];

export const AUDIENCES = ['PAUD/TK', 'SD', 'SMP', 'SMA/SMK', 'Pembelajar Dewasa'];
