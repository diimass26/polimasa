import { createClient } from '@sanity/client';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Impor komponen-komponen baru Anda
import Header from '@/components/sections/materi/[slug]/Header';
import MateriContent from '@/components/sections/materi/[slug]/MateriContent';

// Definisikan tipe data
interface MateriDetail {
  _id: string;
  judul: string;
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  deskripsiMateri: any[];
  linkYoutube?: string;
  fileMateriUrl?: string;
  sumberMateri?: any[];
}

// Konfigurasi Sanity Client
const sanityClient = createClient({
  projectId: 'du4ey14y',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

// Fungsi untuk mengambil data dari Sanity
async function getMateriDetail(slug: string): Promise<MateriDetail | null> {
  const query = `*[_type == "materi" && slug.current == $slug][0]{
    _id,
    judul,
    tagPelajaran,
    tagKelas,
    deskripsiMateri,
    linkYoutube,
    "fileMateriUrl": fileMateri.asset->url,
    sumberMateri
  }`;
  return await sanityClient.fetch<MateriDetail>(query, { slug });
}

// Fungsi SEO & Generasi Halaman Statis
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const materi = await getMateriDetail(params.slug);
  if (!materi) return { title: 'Materi Tidak Ditemukan' };
  return { title: `${materi.judul} | Polimasa`, description: `Pelajari lebih lanjut tentang ${materi.judul}.` };
}

export async function generateStaticParams() {
  const query = `*[_type == "materi"]{ "slug": slug.current }`;
  const slugs = await sanityClient.fetch<{ slug: string }[]>(query);
  return slugs.map(item => ({ slug: item.slug }));
}

// Komponen Halaman Utama
export default async function MateriDetailPage({ params }: { params: { slug: string } }) {
  const materi = await getMateriDetail(params.slug);

  if (!materi) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="flex flex-col items-center py-6 md:py-10 px-4 shadow-lg shadow-black/5">
        <Header materi={materi} />
        <MateriContent materi={materi} />
      </div>
    </main>
  );
}