import { createClient } from '@sanity/client';

// Mendefinisikan tipe data untuk materi agar sesuai dengan TypeScript
type Materi = {
  _id: string;
  judul: string;
  slug: {
    current: string;
  };
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  // Tambahkan properti lain jika Anda ingin menampilkannya
};

// Konfigurasi koneksi ke Sanity
// Ganti projectId dan dataset dengan milik Anda dari file sanity.json atau sanity.cli.ts
const sanityClient = createClient({
  projectId: 'du4ey14y', // <-- Ganti dengan Project ID Anda
  dataset: 'production', // atau dataset yang Anda gunakan
  useCdn: true, // `false` jika Anda ingin data terbaru saat development
  apiVersion: '2023-05-03', // Gunakan tanggal hari ini atau yang lebih baru
});

// Fungsi untuk mengambil data materi dari Sanity
async function getMateriItems() {
  const query = `*[_type == "materi"]{
    _id,
    judul,
    slug,
    tagPelajaran,
    tagKelas
  }`;
  
  const materiItems = await sanityClient.fetch<Materi[]>(query);
  return materiItems;
}

// Untuk SEO di App Router, kita mengekspor objek metadata
export const metadata = {
  title: 'Polimasa - Beranda',
  description: 'Platform belajar Sains & Matematika',
};

// Komponen Halaman Utama sekarang menjadi Server Component yang asynchronous
export default async function HomePage() {
  const materiItems = await getMateriItems();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-steel-blue mb-8">
        Selamat Datang di RumahMatsains
      </h1>
      
      <h2 className="text-2xl font-semibold text-charcoal-grey mb-4">
        Data Materi dari Sanity:
      </h2>

      {/* Cek apakah ada data, jika tidak tampilkan pesan */}
      {materiItems.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {/* Loop melalui setiap item materi dan tampilkan judulnya */}
          {materiItems.map((materi) => (
            <li key={materi._id} className="text-lg">
              {materi.judul} ({materi.tagPelajaran}, {materi.tagKelas})
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada materi yang diinput di Sanity.</p>
      )}
    </main>
  );
}

