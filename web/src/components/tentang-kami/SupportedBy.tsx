// src/components/tentang-kami/SupportedBy.tsx

import React from "react";
import Image from "next/image";

const SupportedBy: React.FC = () => {
  return (
    <section className="w-full text-center py-12 px-4 bg-white border-t border-[#0F3C64]/20">
      {/* Judul */}
      <h2 className="text-xl md:text-2xl font-extrabold text-[#0F3C64] mb-3">
        Kemitraan Proyek
      </h2>

      {/* Deskripsi */}
      <p className="text-gray-700 text-sm md:text-base max-w-2xl mx-auto mb-8">
        Proyek ini tidak akan terwujud tanpa dukungan dan kerja sama dari
        institusi-institusi hebat berikut.
      </p>

      {/* Logo Mitra */}
      <div className="flex justify-center items-center gap-10 flex-wrap">
        <div className="w-28 h-28 md:w-32 md:h-32 relative">
          <Image
            src="/logo_instansi/smpn6tpi.png"
            alt="Logo SMPN 6 Tanjungpinang"
            fill
            className="object-contain"
          />
        </div>
        <div className="w-28 h-28 md:w-32 md:h-32 relative">
          <Image
            src="/logo_instansi/umrah.png"
            alt="Logo Universitas Maritim Raja Ali Haji"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default SupportedBy;
