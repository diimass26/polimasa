// src/components/tentang-kami/TentangHeader.tsx

import React from "react";

const TentangHeader: React.FC = () => {
  return (
    <section className="w-full text-center py-12 px-4 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-[#0F4C75] mb-4">
        Tentang Polimasa
      </h1>
      <p className="max-w-2xl mx-auto text-[#393E46] text-base md:text-lg leading-relaxed">
        Sebuah inisiatif untuk menjadikan pembelajaran Matematika dan Sains lebih
        mudah diakses, interaktif, dan menyenangkan bagi semua siswa.
      </p>
    </section>
  );
};

export default TentangHeader;
