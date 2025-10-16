"use client";

import React, { useState } from "react";
import CourseCard from '../../ui/CourseCard';

// Tipe data dari Sanity (tetap diperlukan untuk props)
interface SanityMateri {
  _id: string;
  judul: string;
  slug: {
    current: string;
  };
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  deskripsiSingkat: string;
}

// Komponen utama untuk section "Materi Unggulan"
export default function FeaturedMaterial({ initialMaterials }: { initialMaterials: SanityMateri[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [materials] = useState<SanityMateri[]>(initialMaterials || []);

  const categories = [
    { id: "semua", label: "Semua" },
    { id: "matematika", label: "Matematika" },
    { id: "sains", label: "Sains" },
  ];

  // Fungsi untuk mendapatkan kelas CSS tombol berdasarkan status aktif dan kategori
  const getButtonClasses = (categoryId: string) => {
    const isActive = activeCategory === categoryId;
    
    if (isActive) {
      if (categoryId === 'matematika') return 'bg-[#0F4C75] text-white';
      if (categoryId === 'sains') return 'bg-[#36B3B5] text-white';
      return 'bg-[#393E46] text-white'; // Warna default untuk "Semua"
    }
    
    // Kelas untuk tombol yang tidak aktif
    return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  };

  const filteredMaterials = materials.filter(material => 
    activeCategory === 'semua' || material.tagPelajaran === activeCategory
  );

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <header className="flex flex-col items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F4C75] mb-4">Materi Unggulan</h1>
          <p className="text-lg md:text-xl font-light text-[#393E46]">Temukan topik yang paling sering dipelajari.</p>
        </header>

        <nav className="flex justify-center gap-4 md:gap-8 mb-12" role="navigation">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-lg font-semibold transition-colors duration-300 ${getButtonClasses(category.id)}`}
              aria-pressed={activeCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <CourseCard
                key={material._id}
                title={material.judul}
                subject={material.tagPelajaran}
                grade={material.tagKelas}
                description={material.deskripsiSingkat || 'Tidak ada deskripsi.'}
                link={`/materi/${material.slug.current}`}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">Tidak ada materi yang ditemukan.</p>
          )}
        </div>
      </div>
    </section>
  );
}