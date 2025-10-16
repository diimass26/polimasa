import Link from 'next/link';
import Image from 'next/image'; // <-- Impor komponen Image

export default function Footer() {
  return (
    <footer className="bg-[#0F4C75] px-6 sm:px-12 lg:px-20 py-12 sm:py-16 lg:py-[60px] flex flex-col items-center">
      {/* Container diubah untuk memastikan layout di semua layar */}
      <div className="w-full max-w-[1280px] flex flex-row justify-between items-start gap-8 pb-8 lg:pb-10 border-b border-white/10">
        {/* Info Section */}
        <div className="flex flex-col items-start gap-2">
          {/* Container logo diubah untuk Next/Image */}
          <div className="relative w-[240px] sm:w-[280px] h-auto aspect-[4/1]">
            <Image
              src="/logo/POLIMASA2.png"
              alt="Polimasa Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-[30px] leading-[0.8] tracking-[-0.05em] max-w-[320px]">
            Pojok Literasi Matematika dan Sains
          </h2>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-white font-bold text-lg sm:text-xl lg:text-[20px] leading-[0.8] tracking-[-0.05em]">
            Navigasi
          </h3>
          <nav className="flex flex-col items-start gap-3">
            <Link
              href="/"
              className="text-white font-lato text-base sm:text-lg leading-[0.8] tracking-[-0.05em] hover:opacity-80 transition-opacity"
            >
              Beranda
            </Link>
            <Link
              href="/materi"
              className="text-white font-lato text-base sm:text-lg leading-[0.8] tracking-[-0.05em] hover:opacity-80 transition-opacity"
            >
              Materi
            </Link>
            <Link
              href="/tentang-kami"
              className="text-white font-lato text-base sm:text-lg leading-[0.8] tracking-[-0.05em] hover:opacity-80 transition-opacity"
            >
              Tentang Kami
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-[1280px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6">
        <p className="text-white font-lato text-sm sm:text-base lg:text-lg leading-[0.8] tracking-[-0.05em]">
          Sebuah Proyek PKM dari Universitas Maritim Raja Ali Haji
        </p>
        <p className="text-white font-lato text-sm sm:text-base lg:text-lg leading-[0.8] tracking-[-0.05em]">
          © 2025 Polimasa. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}