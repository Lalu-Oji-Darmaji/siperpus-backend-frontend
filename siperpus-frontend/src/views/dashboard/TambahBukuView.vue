<!-- src/views/FormBukuView.vue — Semua variasi v-model untuk SiPerpus -->
<template>
    <form @submit.prevent="simpanBuku" class="form-buku">
        <!-- TEXT INPUT — sinkron setiap keystroke -->
        <div class="field">
            <label>Judul Buku *</label>
            <input v-model="form.judul" type="text" placeholder="Masukkan judul buku" />
            <span class="counter">{{ form.judul.length }}/200 karakter</span>
        </div>
        <!-- .trim — hapus spasi di awal dan akhir otomatis -->
        <div class="field">
            <label>Penulis *</label>
            <input v-model.trim="form.penulis" placeholder="Nama penulis" />
        </div>
        <!-- .lazy — sinkron saat blur (pindah fokus), bukan setiap ketik -->
        <!-- Lebih hemat untuk validasi berat atau panggilan API -->
        <div class="field">
            <label>ISBN</label>
            <input v-model.lazy="form.isbn" placeholder="Contoh: 9780132350884" />
        </div>
        <!-- .number — konversi string ke number otomatis -->
        <div class="field">
            <label>Tahun Terbit</label>
            <input v-model.number="form.tahun" type="number" min="1900" />
        </div>
        <!-- TEXTAREA -->
        <div class="field">
            <label>Sinopsis</label>
            <textarea v-model.trim="form.sinopsis" rows="5"></textarea>
        </div>
        <!-- SELECT dropdown -->
        <div class="field">
            <label>Kategori *</label>
            <select v-model="form.kategori">
                <option value="">-- Pilih Kategori --</option>
                <option v-for="kat in daftarKategori" :key="kat" :value="kat">
                    {{ kat }}
                </option>
            </select>
        </div>
        <!-- CHECKBOX single — boolean -->
        <div class="field">
            <label class="checkbox-label">
                <input type="checkbox" v-model="form.tersedia" />
                Buku tersedia untuk dipinjam
            </label>
        </div>
        <!-- CHECKBOX multiple — array -->
        <div class="field">
            <label>Tag/Label</label>
            <div class="checkbox-group">
                <label v-for="tag in daftarTag" :key="tag" class="checkbox-label">
                    <input type="checkbox" v-model="form.tags" :value="tag" />
                    {{ tag }}
                </label>
            </div>
        </div>
        <!-- RADIO button -->
        <div class="field">
            <label>Kondisi Buku</label>
            <div class="radio-group">
                <label><input type="radio" v-model="form.kondisi" value="baru" />
                    Baru</label>
                <label><input type="radio" v-model="form.kondisi" value="baik" />
                    Baik</label>
                <label><input type="radio" v-model="form.kondisi" value="rusak" />
                    Rusak</label>
            </div>
        </div>
        <!-- Preview data real-time berkat reaktivitas -->
        <div class="preview" v-if="form.judul">
            <h4>Preview:</h4>
            <p><strong>{{ form.judul }}</strong> oleh {{ form.penulis }}</p>
            <p>Kategori: {{ form.kategori }} | Kondisi: {{ form.kondisi }}</p>
            <p>Tag: {{ form.tags.join(', ') || 'Belum dipilih' }}</p>
        </div>
        <button type="submit" :disabled="!isFormValid" class="btn-submit">
            Simpan Buku
        </button>
    </form>
</template>
<script setup>
import { reactive, computed } from 'vue'
const form = reactive({
    judul: '',
    penulis: '',
    isbn: '',
    tahun: new Date().getFullYear(),
    sinopsis: '',
    kategori: '',
    tersedia: true,
    tags: [],
    kondisi: 'baru',
})
const daftarKategori = ['Fiksi', 'Non-Fiksi', 'Sains', 'Teknologi',
    'Sejarah', 'Bisnis', 'Seni', 'Agama']
const daftarTag = ['Rekomendasi', 'Buku Baru', 'Populer', 'Langka',
    'Referensi']
const isFormValid = computed(() =>
    form.judul.trim().length >= 3 &&
    form.penulis.trim().length >= 3 &&
    form.kategori !== ''
)
function simpanBuku() {
    console.log('Data buku:', JSON.parse(JSON.stringify(form)))
    // Bab 5: kirim ke backend Express.js via Axios
}
</script>