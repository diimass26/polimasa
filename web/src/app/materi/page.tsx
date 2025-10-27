import MateriHeader from '@/components/sections/materi/MateriHeader';
import MateriList from '@/components/sections/materi/MateriList';
import { getAllMateri } from '@/lib/sanity';
import { Suspense } from 'react';

export default async function MateriPage() {
  const allMateri = await getAllMateri();

  return (
    <main className="container mx-auto px-6 py-12 md:px-8">
      <MateriHeader />
      {/* 🔧 Tambahkan Suspense untuk membungkus komponen client */}
      <Suspense fallback={<p className="text-center text-gray-500">Memuat daftar materi...</p>}>
        <MateriList allMateri={allMateri} />
      </Suspense>
    </main>
  );
}
