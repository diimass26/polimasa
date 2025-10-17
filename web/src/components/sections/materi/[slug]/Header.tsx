interface MateriDetail {
  judul: string;
  tagPelajaran: 'matematika' | 'sains';
  tagKelas: string;
}

interface HeaderProps {
  materi: MateriDetail;
}

// Komponen Ikon
const ChevronRightIcon = () => <svg className="w-4 h-4 flex-shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

export default function Header({ materi }: HeaderProps) {
  const subjectTag = {
    icon: materi.tagPelajaran === 'matematika' ? '/icons/math.png' : '/icons/science.png',
    bgColor: materi.tagPelajaran === 'matematika' ? 'bg-[#0F4C75]' : 'bg-[#36B3B5]',
    text: 'text-white'
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Breadcrumb */}
      <nav className="w-full flex items-center gap-1 pb-2 md:pb-3">
        {/* DIUBAH: Menggunakan tag <a> standar untuk mengatasi galat resolusi path */}
        <a href="/materi" className="text-black font-normal text-base md:text-lg tracking-tight hover:underline">
          Materi
        </a>
        <ChevronRightIcon />
        <span className="text-black font-normal text-base md:text-lg tracking-tight truncate">
          {materi.judul}
        </span>
      </nav>

      {/* Tags */}
      <div className="w-full flex flex-wrap items-start gap-2 pb-4 md:pb-5">
        <div className={`flex items-center justify-center gap-2 px-4 h-8 rounded-full ${subjectTag.bgColor} ${subjectTag.text}`}>
          <img src={subjectTag.icon} alt={`${materi.tagPelajaran} icon`} className="w-4 h-4" />
          <span className="text-sm font-normal tracking-tight capitalize">{materi.tagPelajaran}</span>
        </div>
        <div className="flex items-center justify-center px-4 h-8 rounded-full border border-black/20">
          <span className="text-[#393E46] text-sm font-normal tracking-tight">{materi.tagKelas}</span>
        </div>
      </div>

      {/* Judul */}
      <div className="pb-4 md:pb-6">
        <h1 className="text-[#0F4C75] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tighter text-left">
          {materi.judul}
        </h1>
      </div>
    </div>
  );
}