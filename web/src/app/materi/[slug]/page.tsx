import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMateriDetail, getAllMateriSlugs } from '@/lib/sanity';
import Header from '@/components/sections/materi/[slug]/Header';
import MateriContent from '@/components/sections/materi/[slug]/MateriContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const materi = await getMateriDetail(resolvedParams.slug);
  if (!materi) return { title: 'Materi Tidak Ditemukan' };
  return { title: `${materi.judul} | Polimasa`, description: `Pelajari lebih lanjut tentang ${materi.judul}.` };
}

export async function generateStaticParams() {
  const slugs = await getAllMateriSlugs();
  return slugs.map(item => ({ slug: item.slug }));
}

export default async function MateriDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  console.log('🧩 Page params:', resolvedParams);
  console.log('🧩 Page slug:', resolvedParams.slug);

  const materi = await getMateriDetail(resolvedParams.slug);

  if (!materi) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="flex flex-col items-center py-6 md:py-10 px-4 shadow-lg shadow-black/5">
        <Header materi={materi} />
        <MateriContent materi={materi} />
      </div>
    </main>
  );
}
