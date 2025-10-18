"use client"; // Diperlukan karena kita menggunakan hook (useState, usePathname)

import { useState, useEffect } from 'react'; // 1. Impor useEffect
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // 2. Tambahkan state untuk melacak status "mount"

    // 3. Gunakan useEffect untuk mengubah isMounted menjadi true hanya di sisi klien
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const pathname = usePathname(); 

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { href: "/", label: "Beranda" },
        { href: "/materi", label: "Materi" },
        { href: "/tentang-kami", label: "Tentang Kami" },
    ];

    return (
        <header className="sticky top-0 z-40 bg-[#F4F7F9] shadow-md">
            <div className="relative z-50 flex items-center justify-between max-w-7xl mx-auto px-6 py-5">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo/POLIMASA.png"
                        alt="Polimasa"
                        width={160}
                        height={40}
                        className="h-10 w-40 object-contain"
                        priority
                    />
                </Link>

                {/* Navigasi Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = link.href === "/" 
                            ? pathname === link.href 
                            : pathname.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-lato text-lg transition-colors duration-300 ${
                                    isActive 
                                        ? 'text-[#0F4C75] font-bold'
                                        : 'text-black hover:text-[#0F4C75]/80'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Tombol Hamburger (Mobile) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors z-50"
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <Image src="/icons/cross.png" alt="Tutup Menu" width={24} height={24} />
                    ) : (
                        <Image src="/icons/burger.png" alt="Buka Menu" width={24} height={24} />
                    )}
                </button>
            </div>

            {/* 4. Bungkus menu mobile dengan pengecekan isMounted */}
            {isMounted && (
                <div
                    className={`absolute top-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out bg-[#F4F7F9] shadow-lg rounded-b-2xl ${
                        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-5 invisible'
                    }`}
                >
                    <div className="px-6 pt-24 pb-8">
                        <nav className="flex flex-col items-center gap-4">
                            {navLinks.map((link) => {
                                 const isActive = link.href === "/" 
                                    ? pathname === link.href 
                                    : pathname.startsWith(link.href);
                                    
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={toggleMenu}
                                        className={`w-full text-center py-3 rounded-lg text-lg transition-colors duration-300 ${
                                            isActive 
                                                ? 'bg-[#0F4C75] text-white font-semibold'
                                                : 'text-black hover:bg-gray-200'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}