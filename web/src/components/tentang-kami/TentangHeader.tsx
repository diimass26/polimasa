// src/components/tentang-kami/TentangHeader.tsx

import React from "react";

const TentangHeader: React.FC = () => {
  return (
    <section className="w-full text-center py-12 px-4 bg-white">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3C64] mb-3">
        Tentang RumahMatsains
      </h2>
      <p className="max-w-2xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed">
        Sebuah inisiatif untuk menjadikan pembelajaran Matematika dan Sains lebih
        mudah diakses, interaktif, dan menyenangkan bagi semua siswa.
      </p>
    </section>
  );
};

export default TentangHeader;
