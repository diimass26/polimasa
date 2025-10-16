import Image from 'next/image'; // 1. Impor komponen Image dari Next.js

interface SubjectTagProps {
  // Tipe 'subject' diubah agar lebih fleksibel jika ada pelajaran baru
  subject: string;
}

export default function SubjectTag({ subject }: SubjectTagProps) {
  const isMatematika = subject.toLowerCase() === 'matematika';

  // 2. Menentukan warna dan path gambar berdasarkan props 'subject'
  const bgColor = isMatematika ? 'bg-[#0F4C75]' : 'bg-[#36B3B5]';
  const textColor = 'text-[#FFFFFF]'; // Warna teks selalu putih
  
  // Path ke file SVG di dalam folder 'public'. 
  // Ganti 'icons/math.svg' jika nama atau lokasinya berbeda.
  const iconSrc = isMatematika ? '/icons/math.png' : '/icons/science.png';

  return (
    // 3. Menerapkan kelas warna dan teks yang baru
    <div className={`flex items-center justify-center gap-2 ${bgColor} ${textColor} rounded-full px-3 h-8 text-sm font-bold`}>
      {/* 4. Menggunakan komponen Image untuk menampilkan SVG dari folder public */}
      <Image
        src={iconSrc}
        alt={`${subject} icon`}
        width={14}
        height={14}
        // Catatan: Pastikan file SVG Anda berwarna putih, atau atur agar warnanya bisa diubah (misal: fill="currentColor").
      />
      <span className="capitalize">{subject}</span>
    </div>
  );
}