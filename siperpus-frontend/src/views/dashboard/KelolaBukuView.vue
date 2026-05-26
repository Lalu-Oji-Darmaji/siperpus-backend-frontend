<template>
  <div class="p-8 space-y-8">
    <div class="flex justify-between items-center bg-slate-50 p-6 rounded-xl border border-dashed">
      <div>
        <h2 class="text-2xl font-bold">Manajemen Koleksi</h2>
        <p class="text-muted-foreground">Tambah atau perbarui katalog buku SiPerpus</p>
      </div>

      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger asChild>
          <Button class="gap-2">
            <PlusIcon class="w-4 h-4" /> Tambah Buku
          </Button>
        </DialogTrigger>
        <DialogContent class="p-0 overflow-hidden border-none">
          <FormBuku 
            :edit-mode="false" 
            @submit="handleTambahBuku" 
            @cancel="isDialogOpen = false" 
          />
        </DialogContent>
      </Dialog>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <KartuBuku 
        v-for="buku in koleksiBuku" 
        :key="buku.id" 
        :buku="buku"
      >
        <template #footer>
          <Button variant="outline" class="flex-1 border-blue-200 text-blue-600">
            Edit Info
          </Button>
          <Button variant="destructive" size="icon" @click="hapusBuku(buku.id)">
            <Trash2 class="w-4 h-4" />
          </Button>
        </template>
      </KartuBuku>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, Trash2 } from 'lucide-vue-next'

// Shadcn & UI Components
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

// Import Domain Wrappers
import FormBuku from '@/components/buku/FormBuku.vue'
import KartuBuku from '@/components/buku/KartuBuku.vue'

const isDialogOpen = ref(false)

// Data Dummy
const koleksiBuku = ref([
    { id: 1, judul: 'Clean Code', penulis: 'Robert C. Martin', kategori: 'Teknologi', penerbit: 'Prentice Hall', tahun: 2008, tersedia: true, sinopsis: 'Panduan menulis kode yang rapi dan mudah dipelihara.' },
    { id: 2, judul: 'Vue.js 3 for Beginners', penulis: 'Simone Cuomo', kategori: 'Teknologi', penerbit: 'Packt', tahun: 2024, tersedia: false, sinopsis: 'Belajar Vue dari dasar hingga mahir.' },
    { id: 3, judul: 'Learning Vue', penulis: 'Maya Shavin', kategori: 'Teknologi', penerbit: "O'Reilly", tahun: 2024, tersedia: true },
    { id: 4, judul: 'Bumi', penulis: 'Tere Liye', kategori: 'Fiksi', penerbit: 'Gramedia', tahun: 2014, tersedia: true },
    { id: 5, judul: 'Sapiens', penulis: 'Yuval Noah Harari', kategori: 'Sejarah', penerbit: 'Harper', tahun: 2011, tersedia: false },
    { id: 6, judul: 'Atomic Habits', penulis: 'James Clear', kategori: 'Bisnis', penerbit: 'Avery', tahun: 2018, tersedia: true },
    { id: 7, judul: 'The Pragmatic Programmer', penulis: 'David Thomas', kategori: 'Teknologi', penerbit: 'Addison-Wesley', tahun: 1999, tersedia: true },
    { id: 8, judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', kategori: 'Fiksi', penerbit: 'Bentang', tahun: 2005, tersedia: false }
])

// Logika Integrasi
const handleTambahBuku = (dataBaru) => {
  const payload = {
    ...dataBaru,
    id: Date.now(),
    tersedia: true
  }
  
  koleksiBuku.value.unshift(payload) // Tambah ke daftar
  isDialogOpen.value = false // Tutup modal
  alert('Buku berhasil ditambahkan ke sistem!')
}

const hapusBuku = (id) => {
  if(confirm('Hapus buku ini dari koleksi?')) {
    koleksiBuku.value = koleksiBuku.value.filter(b => b.id !== id)
  }
}
</script>