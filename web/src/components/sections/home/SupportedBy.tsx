import React from "react";
// DIHAPUS: import Image from "next/image";

// Ganti nama komponen agar sesuai dengan konvensi (PascalCase)
export const SupportedBy: React.FC = () => {
  // Perbarui array logo untuk menggunakan path dari folder public
  const supportingLogos = [
    {
      id: 1,
      // Path dimulai dengan '/' yang merujuk ke folder 'public'
      src: "/logo_instansi/smpn6tpi.png", 
      alt: "Logo SMP Negeri 6 Tanjungpinang",
      width: 150, // Lebar asli gambar
      height: 150, // Tinggi asli gambar
    },
    {
      id: 2,
      src: "/logo_instansi/umrah.png",
      alt: "Logo Universitas Maritim Raja Ali Haji",
      width: 150,
      height: 150,
    },
  ];

  return (
    // Buat section lebih responsif dengan padding standar Tailwind
    <section className="flex flex-col items-center py-24 bg-slate-50">
      {/* Sederhanakan styling judul dengan kelas Tailwind standar */}
      <h2 className="text-3xl font-bold text-[#0F4C75] tracking-wider mb-12">
        DIDUKUNG OLEH:
      </h2>

      {/* Buat container logo lebih responsif */}
      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
        {supportingLogos.map((logo) => (
          // DIUBAH: Menggunakan tag <img> standar agar bisa dikompilasi
          <div key={logo.id} className="relative">
            <img
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              // Kontrol ukuran tampilan agar konsisten dan responsif
              className="h-28 w-auto object-contain md:h-36"
            />
          </div>
        ))}
      </div>
    </section>
  );
};