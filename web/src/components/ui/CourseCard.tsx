import SubjectTag from './SubjectTag';
import Image from 'next/image';

interface CourseCardProps {
  subject: 'matematika' | 'sains';
  grade: string;
  title: string;
  description: string;
  link?: string;
}

export default function CourseCard({ 
  subject, 
  grade, 
  title, 
  description, 
  link = "#" 
}: CourseCardProps) {
  return (
    <div className="w-full max-w-[325px] bg-[#F4F7F9] rounded-[10px] shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] p-5 flex flex-col gap-[15px]">
      <div className="flex items-center justify-between w-full">
        <SubjectTag subject={subject} />
        
        <div className="flex items-center justify-end">
          <div className="flex items-center justify-end h-8 px-4">
            <span className="text-[#393E46] text-sm font-normal leading-[80%] tracking-[-0.7px]">
              {grade}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-between h-[188px]">
        <div className="pb-[10px]">
          <h3 className="font-heading text-[#393E46] text-xl font-bold leading-[80%] tracking-[-1px]">
            {title}
          </h3>
        </div>
        
        <div className="pb-[30px]">
          <p className="text-[#393E46] text-base font-light leading-[100%] tracking-[-0.8px] line-clamp-6 w-[284px]">
            {description}
          </p>
        </div>
        
        <a 
          href={link} 
          className="flex items-center gap-[2px] self-end group" // Diubah menjadi items-center untuk alignment yang lebih baik
        >
          <span className="text-[#393E46] text-center text-base font-light leading-[80%] tracking-[-0.8px] underline">
            Pelajari Selengkapnya
          </span>
          {/* 2. Ganti SVG dengan komponen Image */}
          <Image
            src="/icons/arrow-right.png" // Ganti dengan nama file Anda jika berbeda
            alt="Arrow right"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </a>
      </div>
    </div>
  );
}

