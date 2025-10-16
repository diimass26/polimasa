"use client"; // Menandai ini sebagai Client Component karena butuh interaktivitas

import React, { useState, useMemo } from "react";
import CourseCard from '@/components/ui/CourseCard'; // Mengimpor komponen CourseCard dari file terpisah

// Tipe data yang diterima dari Server Component
type Materi = {
  _id: string;
  judul: string;
  slug: { current: string };
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  deskripsiSingkat: string; 
};

interface MateriListProps {
  allMateri: Materi[]; // Menerima semua materi sebagai props
}

// Komponen utama untuk menampilkan filter dan hasil yang difilter
export default function MateriList({ allMateri }: MateriListProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('judul-asc');

  const subjectFilters = [
    { id: 'subject-all', label: 'Semua', value: 'all' },
    { id: 'subject-math', label: 'Matematika', value: 'matematika' },
    { id: 'subject-science', label: 'Sains', value: 'sains' }
  ];

  const subjectColors: { [key: string]: string } = {
    all: 'bg-[#393E46]',
    matematika: 'bg-[#0F4C75]',
    sains: 'bg-[#36B3B5]',
  };

  const gradeFilters = [
    { id: 'grade-7', label: 'Kelas 7', value: 'Kelas 7' },
    { id: 'grade-8', label: 'Kelas 8', value: 'Kelas 8' },
    { id: 'grade-9', label: 'Kelas 9', value: 'Kelas 9' }
  ];

  const handleGradeChange = (value: string) => {
    setSelectedGrades(prevGrades =>
      prevGrades.includes(value)
        ? prevGrades.filter(grade => grade !== value)
        : [...prevGrades, value]
    );
  };

  const sortedAndFilteredMaterials = useMemo(() => {
    const filtered = allMateri.filter(materi => {
      const searchMatch = searchQuery === '' || materi.judul.toLowerCase().includes(searchQuery.toLowerCase());
      const subjectMatch = selectedSubject === 'all' || materi.tagPelajaran === selectedSubject;
      const gradeMatch = selectedGrades.length === 0 || selectedGrades.includes(materi.tagKelas);
      return searchMatch && subjectMatch && gradeMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'judul-asc') {
        return a.judul.localeCompare(b.judul);
      }
      if (sortOrder === 'judul-desc') {
        return b.judul.localeCompare(a.judul);
      }
      return 0;
    });
  }, [allMateri, searchQuery, selectedSubject, selectedGrades, sortOrder]);

  return (
    <div>
      {/* Search Bar dengan desain baru */}
      <div className="mb-8 flex justify-center">
        <div className="relative flex items-center w-full max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <img 
              src="/icons/search.png" 
              alt="Ikon cari" 
              className="h-6 w-6"
            />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi, contoh: Aljabar"
            className="block w-full pl-12 pr-4 py-3 border-none bg-slate-100 rounded-full text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
          />
        </div>
      </div>

      <div className="w-full bg-slate-50 p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Pelajaran:</span>
          <div className="flex items-center gap-3">
            {subjectFilters.map(filter => (
                <button 
                  key={filter.id}
                  onClick={() => setSelectedSubject(filter.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    selectedSubject === filter.value
                      ? `${subjectColors[filter.value]} text-white`
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter.label}
                </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Kelas:</span>
          <div className="flex items-center gap-4">
            {gradeFilters.map(filter => (
              <label key={filter.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={filter.value}
                  checked={selectedGrades.includes(filter.value)}
                  onChange={() => handleGradeChange(filter.value)}
                  className="h-4 w-4 rounded border-gray-300 text-[#0F4C75] focus:ring-[#0F4C75]"
                />
                <span className="text-gray-700">{filter.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <p className="text-sm font-medium" style={{ color: '#393E46' }}>
          Menampilkan {sortedAndFilteredMaterials.length} dari {allMateri.length} materi
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-order" className="text-sm font-medium text-gray-700">Urutkan:</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#0F4C75] focus:border-[#0F4C75] sm:text-sm rounded-md"
          >
            <option value="judul-asc">Judul (A-Z)</option>
            <option value="judul-desc">Judul (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {sortedAndFilteredMaterials.length > 0 ? (
          sortedAndFilteredMaterials.map((materi) => (
            <CourseCard
              key={materi._id}
              title={materi.judul}
              subject={materi.tagPelajaran}
              grade={materi.tagKelas}
              description={materi.deskripsiSingkat || 'Tidak ada deskripsi.'}
              link={`/materi/${materi.slug.current}`}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            Tidak ada materi yang cocok dengan filter Anda.
          </p>
        )}
      </div>
    </div>
  );
}

