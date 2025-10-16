"use client"; // Diperlukan karena kita menggunakan interaktivitas (useState)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        // Header sekarang menjadi elemen root tunggal untuk Navbar
        <header className="sticky top-0 z-50 bg-[#F4F7F9] shadow-navbar">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-5">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    {/* Menggunakan Image dari Next.js untuk logo */}
                    <Image
                        src="/logo/POLIMASA.png"
                        alt="Polimasa"
                        width={160}
                        height={40}
                        className="h-10 w-40 object-contain"
                    />
                </Link>

                {/* Navigasi Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-black font-lato text-lg hover:opacity-70 transition-opacity">Beranda</Link>
                    <Link href="/materi" className="text-black font-lato text-lg hover:opacity-70 transition-opacity">Materi</Link>
                    <Link href="/tentang-kami" className="text-black font-lato text-lg hover:opacity-70 transition-opacity">Tentang Kami</Link>
                </nav>

                {/* Tombol Hamburger (Mobile) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors z-50"
                    aria-label="Toggle menu"
                >
                    {/* 2. Mengganti SVG dengan komponen Image */}
                    {isOpen ? (
                        <Image src="/icons/cross.png" alt="Tutup Menu" width={24} height={24} />
                    ) : (
                        <Image src="/icons/burger.png" alt="Buka Menu" width={24} height={24} />
                    )}
                </button>
            </div>

            {/* Menu Mobile (Dropdown) - SEKARANG DI DALAM HEADER */}
            {isMounted && (
                <div
                    className={`absolute top-full left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                >
                    {/* Konten Menu */}
                    <div className={`bg-[#F4F7F9] shadow-[0_4px_10px_0_rgba(0,0,0,0.15)] px-6 py-5 transition-transform duration-300 ease-in-out rounded-b-[20px] ${isOpen ? 'translate-y-0' : '-translate-y-5'}`}>
                        <nav className="flex flex-col pt-8 pb-4">
                            <Link href="/" onClick={toggleMenu} className="text-black font-lato text-lg leading-[80%] tracking-[-0.9px] mb-8">Beranda</Link>
                            <div className="h-[1px] bg-black mb-8" />
                            <Link href="/materi" onClick={toggleMenu} className="text-black font-lato text-lg leading-[80%] tracking-[-0.9px] mb-8">Materi</Link>
                            <div className="h-[1px] bg-black mb-8" />
                            <Link href="/tentang-kami" onClick={toggleMenu} className="text-black font-lato text-lg leading-[80%] tracking-[-0.9px]">Tentang Kami</Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

