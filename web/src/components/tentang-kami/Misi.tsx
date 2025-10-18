import React from "react";

export const Misi: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-16 md:py-20 bg-gradient-to-r from-[#0F4C75] to-[#36B3B5] text-white">
      {/* Gambar */}
      <div className="flex-shrink-0">
        <img
          src="/tentang_kami/image.jpeg"
          alt="Gedung UMRAH"
          className="rounded-2xl shadow-lg w-full md:w-[450px]"
        />
      </div>

      {/* Konten Teks */}
      <div className="max-w-2xl text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Misi Kami</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          Polimasa (Pojok Literasi Matematika dan Sains) lahir dari semangat 
          Program Kreativitas Mahasiswa (PKM) Universitas Maritim Raja Ali Haji. 
          Misi utama kami adalah untuk menjembatani kesenjangan sumber 
          belajar digital yang berkualitas, khususnya bagi siswa SMPN 6 Tanjungpinang.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-base md:text-lg leading-relaxed">
          <li>
            Menyediakan kumpulan materi ajar yang terkurasi dari sumber-sumber
            kredibel seperti video YouTube, PDF, dan tautan edukatif lainnya.
          </li>
          <li>
            Menciptakan platform yang mudah digunakan dan dapat diakses kapan
            saja, di mana saja, untuk mendukung pembelajaran mandiri.
          </li>
          <li>
            Mendorong minat belajar siswa terhadap Matematika dan Sains melalui
            pendekatan yang lebih modern dan relevan.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Misi;
