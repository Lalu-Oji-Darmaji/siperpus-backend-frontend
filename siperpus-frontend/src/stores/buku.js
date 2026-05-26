// src/stores/buku.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// frontend/src/stores/buku.js — UPDATE: gunakan bukuService nyata
import { bukuService } from '@/services/bukuService'
// Di dalam actions, ganti simulasi dengan API call nyata:
export const useBukuStore = defineStore('buku', () => {
    // ── STATE ────────────────────────────────────────────────
    const daftarBuku = ref([]) // Array semua buku
    const bukuTerpilih = ref(null) // Buku yang sedang dilihat detailnya
    const isLoading = ref(false) // Status loading
    const error = ref(null) // Pesan error
    const filter = ref({ // State filter aktif
        search: '',
        kategori: '',
        status: 'semua', // 'semua' | 'tersedia' | 'dipinjam'
    })
    const pagination = ref({
        page: 1,
        perPage: 12,
        total: 0,
    })
    // ── GETTERS ──────────────────────────────────────────────
    const bukuTersedia = computed(() =>
        daftarBuku.value.filter(b => b.tersedia)
    )
    const bukuDipinjam = computed(() =>
        daftarBuku.value.filter(b => !b.tersedia)
    )
    // Filter gabungan berdasarkan state filter
    const bukuTerfilter = computed(() => {
        let hasil = [...daftarBuku.value]
        // Filter pencarian
        if (filter.value.search) {
            const q = filter.value.search.toLowerCase()
            hasil = hasil.filter(b =>
                b.judul.toLowerCase().includes(q) ||
                b.penulis.toLowerCase().includes(q) ||
                b.isbn?.includes(q)
            )
        }
        // Filter kategori
        if (filter.value.kategori) {
            hasil = hasil.filter(b => b.kategori === filter.value.kategori)
        }
        // Filter status
        if (filter.value.status === 'tersedia') {
            hasil = hasil.filter(b => b.tersedia)
        } else if (filter.value.status === 'dipinjam') {
            hasil = hasil.filter(b => !b.tersedia)
        }
        return hasil
    })
    const statistik = computed(() => ({
        total: daftarBuku.value.length,
        tersedia: bukuTersedia.value.length,
        dipinjam: bukuDipinjam.value.length,
        persen: daftarBuku.value.length > 0
            ? Math.round(bukuTersedia.value.length / daftarBuku.value.length * 100)
            : 0,
    }))
    const daftarKategori = computed(() =>
        [...new Set(daftarBuku.value.map(b => b.kategori))].sort()
    )
    // ── ACTIONS ──────────────────────────────────────────────
    async function ambilSemuaBuku(params = {}) {
        isLoading.value = true
        error.value = null
        try {
            // SEBELUMNYA: daftarBuku.value = dataBukuSementara
            // SEKARANG: fetch dari API backend Express.js
            const result = await bukuService.getAll({
                search: filter.value.search,
                kategori: filter.value.kategori,
                status: filter.value.status === 'semua' ? '' : filter.value.status,
                page: pagination.value.page,
                limit: pagination.value.perPage,
            })
            daftarBuku.value = result.data.items
            pagination.value.total = result.data.pagination.total
        } catch (e) {
            // Axios error: pesan ada di e.response?.data?.message
            error.value = e.response?.data?.message || e.message || 'Gagal memuat data'
        } finally {
            isLoading.value = false
        }
    }
    async function ambilBukuById(id) {
        isLoading.value = true
        try {
            // Bab 5: GET /api/buku/:id
            await new Promise(r => setTimeout(r, 400))
            bukuTerpilih.value = daftarBuku.value.find(b => b.id === id) || null
        } finally {
            isLoading.value = false
        }
    }
    async function tambahBuku(data) {
        const result = await bukuService.create(data)
        daftarBuku.value.unshift(result.data) // Tambah ke awal list
        return result.data
    }
    function updateBuku(id, dataUpdate) {
        const idx = daftarBuku.value.findIndex(b => b.id === id)
        if (idx !== -1) {
            daftarBuku.value[idx] = { ...daftarBuku.value[idx], ...dataUpdate }
        }
        // Bab 5: PUT /api/buku/:id
    }
    async function hapusBuku(id) {
        await bukuService.remove(id)
        daftarBuku.value = daftarBuku.value.filter(b => b.id !== id)
    }
    function pinjamBuku(id) {
        const buku = daftarBuku.value.find(b => b.id === id)
        if (buku && buku.tersedia) {
            buku.tersedia = false
            // Bab 5: POST /api/peminjaman
        }
    }
    function setFilter(filterBaru) {
        Object.assign(filter.value, filterBaru)
        pagination.value.page = 1 // Reset ke halaman 1 saat filter berubah
    }
    function resetFilter() {
        filter.value = { search: '', kategori: '', status: 'semua' }
        pagination.value.page = 1
    }
    return {
        // State
        daftarBuku, bukuTerpilih, isLoading, error, filter, pagination,
        // Getters
        bukuTersedia, bukuDipinjam, bukuTerfilter, statistik, daftarKategori,
        // Actions
        ambilSemuaBuku, ambilBukuById, tambahBuku, updateBuku, hapusBuku,
        pinjamBuku, setFilter, resetFilter,
    }
})
// Data sementara — Bab 5 diganti API