import { createClient } from '@sanity/client';

export type Materi = {
  _id: string;
  judul: string;
  slug: { current: string };
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  deskripsiSingkat: string; 
};

export type MateriDetail = {
  _id: string;
  judul: string;
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  deskripsiMateri: any[]; // Portable Text
  linkYoutube?: string;
  fileMateriUrl?: string;
  sumberMateri?: any[]; // Portable Text
};

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
});

export async function getFeaturedMateri(): Promise<Materi[]> {
  const query = `*[_type == "materi"] | order(_createdAt desc) [0..5] {
    _id,
    judul,
    slug,
    tagPelajaran,
    tagKelas,
    "deskripsiSingkat": pt::text(deskripsiMateri) 
  }`;
  return await sanityClient.fetch<Materi[]>(query);
}

export async function getAllMateri(): Promise<Materi[]> {
  const query = `*[_type == "materi"]{
    _id,
    judul,
    slug,
    tagPelajaran,
    tagKelas,
    "deskripsiSingkat": pt::text(deskripsiMateri) 
  }`;
  return await sanityClient.fetch<Materi[]>(query);
}

export async function getMateriDetail(slug: string): Promise<MateriDetail | null> {
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

export async function getAllMateriSlugs(): Promise<{ slug: string }[]> {
  const query = `*[_type == "materi"]{ "slug": slug.current }`;
  return await sanityClient.fetch<{ slug: string }[]>(query);
}