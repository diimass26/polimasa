import { createClient } from '@sanity/client';
import CourseCard from '@/components/CourseCard'; // Pastikan path ini benar

// Tipe data yang kita harapkan dari Sanity, sekarang dengan deskripsi
type Materi = {
  _id: string;
  judul: string;
  slug: { current: string };
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  deskripsiSingkat: string; 
};

// Konfigurasi koneksi ke Sanity (sama seperti sebelumnya)
const sanityClient = createClient({
  projectId: 'du4ey14y', // Ganti dengan Project ID Anda
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

// Fungsi untuk mengambil SEMUA data materi
async function getAllMateri() {
  // Kueri GROQ untuk mengambil semua field yang kita butuhkan
  const query = `*[_type == "materi"]{
    _id,
    judul,
    slug,
    tagPelajaran,
    tagKelas,
    // Mengubah deskripsi (rich text) menjadi teks biasa (plain text)
    "deskripsiSingkat": pt::text(deskripsiMateri) 
  }`;
  
  const materiItems = await sanityClient.fetch<Materi[]>(query);
  return materiItems;
}

// Komponen Halaman Daftar Materi
export default async function MateriPage() {
  const allMateri = await getAllMateri();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-steel-blue mb-8">
        Semua Materi Pembelajaran
      </h1>
      
      {/* Grid untuk menampilkan kartu-kartu */}
      {/* Tambahkan 'justify-items-center' untuk memusatkan kartu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {/* Loop (map) melalui setiap data materi */}
        {allMateri.map((materi) => (
          // Untuk setiap materi, render satu komponen CourseCard
          // dan oper data dari Sanity ke props yang sesuai
          <CourseCard
            key={materi._id}
            title={materi.judul}
            subject={materi.tagPelajaran}
            grade={materi.tagKelas}
            description={materi.deskripsiSingkat || 'Tidak ada deskripsi.'}
            link={`/materi/${materi.slug.current}`}
          />
        ))}
      </div>
    </main>
  );
}

