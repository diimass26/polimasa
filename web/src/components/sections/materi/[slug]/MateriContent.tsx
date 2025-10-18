import { PortableText } from '@portabletext/react';
import type { PortableTextReactComponents } from '@portabletext/react';

// Definisikan tipe data yang diharapkan komponen ini
interface MateriDetail {
  judul: string;
  deskripsiMateri: any[];
  linkYoutube?: string;
  fileMateriUrl?: string;
  sumberMateri?: any[];
}

interface MateriContentProps {
  materi: MateriDetail;
}

// Komponen Ikon
const DownloadIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;

export default function MateriContent({ materi }: MateriContentProps) {
  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId: string | null = null;
      if (urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.substring(1);
      } else if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v');
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch (e) {
      return null;
    }
  };
  const youtubeEmbedUrl = materi.linkYoutube ? getYoutubeEmbedUrl(materi.linkYoutube) : null;

  // Konfigurasi HANYA untuk "Sumber Materi"
  const sourcePortableTextComponents: Partial<PortableTextReactComponents> = {
    marks: {
      link: ({children, value}) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#0F4C75] hover:underline break-all">
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({children}) => <ul className="space-y-3 list-none p-0 m-0">{children}</ul>,
    },
    listItem: {
      bullet: ({children}) => (
        <li className="flex items-start gap-3">
          <img 
            src="/icons/link.png" 
            alt="Link icon" 
            className="w-5 h-5 mt-1 flex-shrink-0"
          />
          <span className="flex-grow">{children}</span>
        </li>
      ),
    },
  };

    const descriptionPortableTextComponents: Partial<PortableTextReactComponents> = {
    list: {
      bullet: ({ children }) => <ul className="list-disc space-y-2 pl-5">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal space-y-2 pl-5">{children}</ol>,
    },
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center bg-[#F4F7F9] rounded-2xl px-4 sm:px-6 md:px-12 lg:px-20 py-6 md:py-10">
      
      {youtubeEmbedUrl && (
        <div className="w-full max-w-2xl mb-8 md:mb-10">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={youtubeEmbedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {materi.deskripsiMateri && materi.deskripsiMateri.length > 0 && (
        <div className="w-full max-w-2xl mb-8 md:mb-10">
            <h2 className="text-[#393E46] text-lg md:text-xl font-bold leading-tight tracking-tight mb-3">
                Deskripsi Materi
            </h2>
            {/* DIUBAH: Menggunakan konfigurasi terpisah & menghapus kelas 'prose' yang tidak perlu */}
            <div className="text-[#393E46] font-light text-base md:text-lg leading-relaxed tracking-tight space-y-4">
                <PortableText 
                    value={materi.deskripsiMateri} 
                    components={descriptionPortableTextComponents} 
                />
            </div>
        </div>
      )}

      {materi.fileMateriUrl && (
        <div className="w-full max-w-2xl mb-8 md:mb-10">
          <h2 className="text-[#393E46] text-lg md:text-xl font-bold leading-tight tracking-tight mb-4">
            Pratinjau & Unduh Materi (PDF)
          </h2>
          <div className="border rounded-lg overflow-hidden mb-4 w-full">
            <iframe 
              src={`${materi.fileMateriUrl}#toolbar=0&navpanes=0&view=FitH`} 
              title={`Pratinjau PDF: ${materi.judul}`} 
              className="w-full h-[500px] md:h-[600px]"
            >
              Browser Anda tidak mendukung pratinjau PDF.
            </iframe>
          </div>
          <a 
            href={materi.fileMateriUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 transition-colors shadow-sm text-[#0F4C75]"
          >
            <DownloadIcon />
            <span className="font-medium text-base md:text-lg">
              Unduh Rangkuman Materi (PDF)
            </span>
          </a>
        </div>
      )}

      {materi.sumberMateri && materi.sumberMateri.length > 0 && (
        <div className="w-full max-w-2xl">
          <h2 className="text-[#393E46] text-lg md:text-xl font-bold leading-tight tracking-tight mb-3">
            Sumber Materi
          </h2>
          <div className="text-[#393E46] font-light text-base md:text-lg leading-relaxed tracking-tight">
            <PortableText value={materi.sumberMateri} components={sourcePortableTextComponents} />
          </div>
        </div>
      )}
    </div>
  );
}