import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMateriDetail, getAllMateriSlugs } from '@/lib/sanity';
import Header from '@/components/sections/materi/[slug]/Header';
import MateriContent from '@/components/sections/materi/[slug]/MateriContent';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const materi = await getMateriDetail(params.slug);
  if (!materi) return { title: 'Materi Tidak Ditemukan' };
  return { title: `${materi.judul} | Polimasa`, description: `Pelajari lebih lanjut tentang ${materi.judul}.` };
}

export async function generateStaticParams() {
  const slugs = await getAllMateriSlugs(); // Menggunakan fungsi dari sanity.ts
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