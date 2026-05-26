<template>
  <Card class="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle>{{ editMode ? 'Edit Buku' : 'Tambah Buku Baru' }}</CardTitle>
      <CardDescription>
        Masukkan detail informasi buku untuk koleksi perpustakaan.
      </CardDescription>
    </CardHeader>
    
    <CardContent>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2">
          <Label for="judul">Judul Buku</Label>
          <Input 
            id="judul" 
            v-model="form.judul" 
            placeholder="Contoh: Clean Architecture" 
            :class="{ 'border-destructive': errors.judul }"
          />
          <p v-if="errors.judul" class="text-xs text-destructive">{{ errors.judul }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="penulis">Penulis</Label>
            <Input 
              id="penulis" 
              v-model="form.penulis" 
              placeholder="Nama penulis" 
              :class="{ 'border-destructive': errors.penulis }"
            />
            <p v-if="errors.penulis" class="text-xs text-destructive">{{ errors.penulis }}</p>
          </div>

          <div class="space-y-2">
            <Label for="kategori">Kategori</Label>
            <Input 
              id="kategori" 
              v-model="form.kategori" 
              placeholder="Contoh: Teknologi, Fiksi" 
              :class="{ 'border-destructive': errors.kategori }"
            />
            <p v-if="errors.kategori" class="text-xs text-destructive">{{ errors.kategori }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="tahun">Tahun Terbit</Label>
            <Input 
              id="tahun" 
              type="number" 
              v-model.number="form.tahun" 
              :class="{ 'border-destructive': errors.tahun }"
            />
            <p v-if="errors.tahun" class="text-xs text-destructive">{{ errors.tahun }}</p>
          </div>

          <div class="space-y-2">
            <Label for="penerbit">Penerbit</Label>
            <Input 
              id="penerbit" 
              v-model="form.penerbit" 
              placeholder="Nama penerbit" 
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="sinopsis">Sinopsis Singkat</Label>
          <Textarea 
            id="sinopsis" 
            v-model="form.sinopsis" 
            placeholder="Garis besar cerita atau isi buku..." 
            class="h-24"
          />
        </div>

        <CardFooter class="flex justify-end gap-3 px-0 pt-4">
          <Button type="button" variant="outline" @click="$emit('cancel')">
            Batal
          </Button>
          <Button type="submit">
            Simpan Buku
          </Button>
        </CardFooter>
      </form>
    </CardContent>
  </Card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      judul: '',
      penulis: '',
      kategori: '',
      tahun: new Date().getFullYear(),
      penerbit: '',
      sinopsis: ''
    })
  },
  editMode: Boolean
})

const emit = defineEmits(['submit', 'cancel'])

// State form menggunakan reactive
const form = reactive({ ...props.initialData })
const errors = reactive({})

// Fungsi Validasi Manual
const validate = () => {
  // Reset errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  let isValid = true

  if (!form.judul || form.judul.length < 3) {
    errors.judul = 'Judul minimal 3 karakter'
    isValid = false
  }
  
  if (!form.penulis) {
    errors.penulis = 'Nama penulis wajib diisi'
    isValid = false
  }

  if (!form.kategori) {
    errors.kategori = 'Kategori wajib diisi'
    isValid = false
  }

  if (!form.tahun || form.tahun < 1900 || form.tahun > new Date().getFullYear()) {
    errors.tahun = 'Tahun tidak valid'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validate()) {
    emit('submit', { ...form })
  }
}
</script>