import { createClient } from '@sanity/client';
import HeroSection from '@/components/sections/home/HeroSection';
import FeaturedMaterial from '@/components/sections/home/FeaturedMaterial';
import { Cta } from '@/components/sections/home/cta';
import { SupportedBy } from '@/components/sections/home/SupportedBy';

// Tipe data yang kita harapkan dari Sanity
type Materi = {
  _id: string;
  judul: string;
  slug: { current: string };
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  deskripsiSingkat: string; 
};

// Konfigurasi koneksi ke Sanity
const sanityClient = createClient({
  projectId: 'du4ey14y',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

// Fungsi untuk mengambil data materi dari Sanity
async function getMateriItems() {
  // Query disesuaikan agar sama dengan yang dibutuhkan FeaturedMaterial
  const query = `*[_type == "materi"]{
    _id,
    judul,
    slug,
    tagPelajaran,
    tagKelas,
    "deskripsiSingkat": pt::text(deskripsiMateri)
  }`;
  
  const materiItems = await sanityClient.fetch<Materi[]>(query);
  return materiItems;
}

export const metadata = {
  title: 'Polimasa - Beranda',
  description: 'Platform belajar Sains & Matematika',
};

// Komponen Halaman Utama (Server Component)
export default async function HomePage() {
  // 1. Ambil data di sini, di server
  const materiItems = await getMateriItems();

  return (
    <div>
      <HeroSection />
      <FeaturedMaterial initialMaterials={materiItems} />
      <Cta />
      <SupportedBy />
    </div>
  );
}