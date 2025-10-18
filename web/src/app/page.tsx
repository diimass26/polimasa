import HeroSection from '@/components/sections/home/HeroSection';
import FeaturedMaterial from '@/components/sections/home/FeaturedMaterial';
import { Cta } from '@/components/sections/home/cta';
import { SupportedBy } from '@/components/sections/home/SupportedBy';
import { getFeaturedMateri, Materi } from '@/lib/sanity';

export default async function HomePage() {
  const materiItems = await getFeaturedMateri();

  return (
    <div>
      <HeroSection />
      <FeaturedMaterial initialMaterials={materiItems} />
      <Cta />
      <SupportedBy />
    </div>
  );
}