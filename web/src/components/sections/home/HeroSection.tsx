export default function HeroSection() {
  return (
    <div className="min-h-screen">
      <div 
        className="relative flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 px-6 sm:px-10 md:px-16 lg:px-20 py-16 lg:py-0 min-h-[600px] lg:h-[700px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero/background.png')`
        }}
      >
        <div className="flex flex-col justify-center items-start flex-1 max-w-full lg:max-w-[50%] z-10 text-white">
          <div className="w-full max-w-[430px]">
            <h1 
              className="font-bold leading-[100%] tracking-[-0.05em] mb-4 lg:mb-6"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
              }}
            >
              Selamat Datang di Pojok Literasi Digital Matematika dan Sains
            </h1>
          </div>
          
          <div className="pb-6 lg:pb-8">
            <p 
              className="leading-[100%] tracking-[-0.05em]"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(20px, 3vw, 30px)',
                fontWeight: 300,
              }}
            >
              Belajar Matematika dan Sains Menyenangkan dan Menggembirakan
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
            {/* DIUBAH: Komponen <Link> diubah menjadi tag <a> standar */}
            <a href="/matematika" className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0F4C75] hover:bg-[#85B5D1] transition-colors">
                {/* SVG Anda untuk Matematika */}
                <span 
                  className="text-white hover:text-[#393E46] font-semibold"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '24px',
                  }}
                >
                  Matematika
                </span>
            </a>
            
            <a href="/sains" className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#36B3B5] hover:bg-[#A3D5D0] transition-colors">
                {/* SVG Anda untuk Sains */}
                <span 
                  className="text-white hover:text-[#393E46] font-semibold"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '24px',
                  }}
                >
                  Sains
                </span>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col items-center lg:items-start">
          {/* DIUBAH: Komponen <Image> diubah menjadi tag <img> standar */}
          {/* Ganti 'main-image.png' dengan nama file gambar utama Anda */}
          <img 
            src="/hero/illustration.png" 
            alt="Siswa sedang belajar bersama" 
            className="w-full max-w-[400px] lg:max-w-[470px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}