import React from "react";

export const Cta: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 px-6 py-16 md:py-20 bg-gradient-to-r from-[#0F4C75] to-[#36B3B5]">
      {/* Judul CTA */}
      <h2 className="font-bold text-white text-4xl md:text-5xl text-center tracking-tight leading-tight">
        Siap Memulai Petualangan <br />
        Belajarmu?
      </h2>

      {/* DIUBAH: Komponen Link diganti menjadi tag <a> standar */}
      <a
        href="/materi"
        className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        aria-label="Lihat Semua Materi"
      >
        <span className="font-semibold text-lg text-[#0F4C75]">
          Lihat Semua Materi
        </span>
      </a>
    </section>
  );
};