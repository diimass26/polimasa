import React from 'react';
import { defineType, defineField } from 'sanity';

/**
 * Ini adalah schema definition untuk tipe konten 'materi'.
 * Schema ini akan membuat sebuah form di Sanity Studio
 * yang bisa diisi oleh para guru untuk menambahkan materi baru.
 */
export default defineType({
  // Nama unik untuk tipe konten ini di dalam sistem Sanity
  name: 'materi',
  // Nama yang akan ditampilkan di dalam Sanity Studio UI
  title: 'Materi Pembelajaran',
  // Tipe konten ini adalah sebuah 'document' (dokumen level atas)
  type: 'document',

  // 'fields' adalah array yang berisi semua kolom isian untuk form ini
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Materi',
      type: 'string',
      description: 'Judul harus jelas dan sesuai dengan isi materi.',
      // Aturan validasi agar field ini wajib diisi
      validation: (Rule) => Rule.required().error('Judul materi tidak boleh kosong.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Unik)',
      type: 'slug',
      description: 'Ini akan menjadi bagian dari URL halaman materi. Klik "Generate" untuk membuatnya secara otomatis dari judul.',
      options: {
        source: 'judul', // Membuat slug secara otomatis dari field 'judul'
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagPelajaran',
      title: 'Tag Pelajaran',
      type: 'string',
      options: {
        list: [
          { title: 'Matematika', value: 'matematika' },
          { title: 'Sains', value: 'sains' },
        ],
        layout: 'radio', // Tampilan pilihan dalam bentuk radio button
      },
      validation: (Rule) => Rule.required().error('Pilih salah satu pelajaran.'),
    }),
    defineField({
      name: 'tagKelas',
      title: 'Tag Kelas',
      type: 'string',
      options: {
        list: [
          { title: 'Kelas 7', value: 'Kelas 7' },
          { title: 'Kelas 8', value: 'Kelas 8' },
          { title: 'Kelas 9', value: 'Kelas 9' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Pilih salah satu kelas.'),
    }),
    defineField({
      name: 'deskripsiMateri',
      title: 'Deskripsi Materi',
      type: 'array', // Tipe 'array' of 'block' digunakan untuk rich text editor
      of: [{ type: 'block' }],
      description: 'Jelaskan secara rinci tentang materi ini. Anda bisa menambahkan bold, italic, dan list.',
    }),
    defineField({
      name: 'linkYoutube',
      title: 'Link Video YouTube',
      type: 'url',
      description: 'Salin dan tempel URL lengkap video YouTube di sini (contoh: https://www.youtube.com/watch?v=xxxx).',
    }),
    defineField({
      name: 'fileMateri',
      title: 'File Materi (PDF)',
      type: 'file',
      description: 'Upload file rangkuman materi dalam format PDF.',
      options: {
        accept: '.pdf', // Hanya mengizinkan upload file PDF
      },
    }),
    defineField({
      name: 'sumberMateri',
      title: 'Sumber Materi',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Sebutkan sumber-sumber yang digunakan, seperti link ke buku atau website lain.',
    }),
  ],

  // 'preview' mengkonfigurasi bagaimana tampilan setiap materi di dalam daftar Sanity Studio
  preview: {
    select: {
      title: 'judul',
      subtitle: 'tagKelas',
      media: 'tagPelajaran',
    },
    // Fungsi prepare untuk kustomisasi tampilan preview
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: 'matematika' | 'sains' }) {
      const EMOJIS = {
        matematika: '🧮',
        sains: '🔬',
      };
      return {
        title: title,
        subtitle: subtitle || 'Belum ada kelas',
        // Perbaikan: Ubah `media` menjadi fungsi yang mengembalikan JSX
        media: () => <span style={{ fontSize: '1.5rem' }}>{EMOJIS[media] || '📄'}</span>,
      };
    },
  },
});