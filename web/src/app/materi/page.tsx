import { createClient } from '@sanity/client';
import MateriList from '@/components/sections/materi/MateriList'; // Mengimpor komponen client

// Tipe data dari Sanity
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

// Fungsi untuk mengambil SEMUA data materi
async function getAllMateri() {
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

// Komponen Halaman Daftar Materi (Server Component)
export default async function MateriPage() {
  const allMateri = await getAllMateri();

  return (
    <main className="container mx-auto px-6 py-12 md:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0F4C75]">
          Koleksi Materi Pembelajaran
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Temukan semua yang kamu butuhkan untuk menguasai Matematika dan Sains. 
Gunakan pencarian dan filter untuk menemukan topik spesifik.
        </p>
      </div>
      
      {/* Meneruskan data ke komponen client */}
      <MateriList allMateri={allMateri} />
    </main>
  );
}