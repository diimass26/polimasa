import MateriHeader from '@/components/sections/materi/MateriHeader';
import MateriList from '@/components/sections/materi/MateriList';
import { getAllMateri } from '@/lib/sanity';

export default async function MateriPage() {
  const allMateri = await getAllMateri();

  return (
    <main className="container mx-auto px-6 py-12 md:px-8">
      <MateriHeader />
      <MateriList allMateri={allMateri} />
    </main>
  );
}