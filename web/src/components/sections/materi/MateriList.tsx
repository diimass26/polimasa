"use client"; // Menandai ini sebagai Client Component karena butuh interaktivitas

import React, { useState, useMemo } from "react";

// Tipe data yang diterima dari Server Component
type Materi = {
  _id: string;
  judul: string;
  slug: { current: string };
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
  deskripsiSingkat: string; 
};

// ==========================================================================
// KOMPONEN PENDUKUNG (digabung di sini untuk mengatasi error resolusi path)
// Di proyek Anda, ini harus berada di file terpisah (misal: /ui/CourseCard.tsx)
// ==========================================================================
const SubjectTag = ({ subject }: { subject: string }) => {
  const isMatematika = subject.toLowerCase() === 'matematika';
  const bgColor = isMatematika ? 'bg-[#0F4C75]' : 'bg-[#36B3B5]';
  const iconSrc = isMatematika ? '/icons/math.png' : '/icons/science.png';

  return (
    <div className={`flex items-center justify-center gap-2 ${bgColor} text-white rounded-full px-3 h-8 text-sm font-bold`}>
      <img src={iconSrc} alt={`${subject} icon`} width="14" height="14" className="w-[14px] h-[14px]" />
      <span className="capitalize">{subject}</span>
    </div>
  );
};

const CourseCard = ({ title, subject, grade, description, link }: { title: string, subject: 'matematika' | 'sains', grade: string, description: string, link: string }) => {
  return (
    <div className="w-full max-w-[325px] bg-[#F4F7F9] rounded-[10px] shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] p-5 flex flex-col gap-[15px]">
      <div className="flex items-center justify-between w-full">
        <SubjectTag subject={subject} />
        <div className="flex items-center justify-end h-8 px-4">
          <span className="text-[#393E46] text-sm font-normal">{grade}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-bold text-[#393E46] text-xl leading-tight mb-2">{title}</h3>
          <p className="text-[#393E46] text-base font-light leading-snug line-clamp-4 mb-4">{description}</p>
        </div>
        <a href={link} className="flex items-center gap-1 self-end group mt-auto">
          <span className="text-[#393E46] text-center text-base font-light underline">Pelajari Selengkapnya</span>
          <img src="/icons/arrow-right.png" alt="Arrow right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};
// ==========================================================================


interface MateriListProps {
  allMateri: Materi[]; // Menerima semua materi sebagai props
}

// Komponen utama untuk menampilkan filter dan hasil yang difilter
export default function MateriList({ allMateri }: MateriListProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('judul-asc');

  const subjectFilters = [
    { id: 'subject-all', label: 'Semua', value: 'all' },
    { id: 'subject-math', label: 'Matematika', value: 'matematika' },
    { id: 'subject-science', label: 'Sains', value: 'sains' }
  ];

  // Objek untuk memetakan nilai filter ke kelas warna yang sesuai
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
      const subjectMatch = selectedSubject === 'all' || materi.tagPelajaran === selectedSubject;
      const gradeMatch = selectedGrades.length === 0 || selectedGrades.includes(materi.tagKelas);
      return subjectMatch && gradeMatch;
    });

    return [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case 'judul-asc':
          return a.judul.localeCompare(b.judul);
        case 'judul-desc':
          return b.judul.localeCompare(a.judul);
        default:
          return 0;
      }
    });
  }, [allMateri, selectedSubject, selectedGrades, sortOrder]);

  return (
    <div>
      {/* Filter Bar */}
      <div className="w-full bg-[#F4F7F9] p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Pelajaran:</span>
          <div className="flex items-center gap-3">
            {subjectFilters.map(filter => {
              const isActive = selectedSubject === filter.value;
              // Logika untuk menentukan kelas warna dinamis
              const activeClass = isActive 
                ? `${subjectColors[filter.value]} text-white` 
                : 'bg-white text-gray-600 hover:bg-gray-100';

              return (
                <button 
                  key={filter.id}
                  onClick={() => setSelectedSubject(filter.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeClass}`}
                >
                  {filter.label}
                </button>
              );
            })}
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
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">{filter.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Baris informasi jumlah materi dan dropdown urutan */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <p className="text-sm font-medium text-[#393E46]">
          Menampilkan {sortedAndFilteredMaterials.length} dari {allMateri.length} materi
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-order" className="text-sm font-medium text-gray-700">Urutkan:</label>
          <select
            id="sort-order"
            name="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="judul-asc">Judul (A-Z)</option>
            <option value="judul-desc">Judul (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Grid untuk menampilkan kartu-kartu */}
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