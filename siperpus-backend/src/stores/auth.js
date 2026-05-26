// frontend/src/stores/auth.js — UPDATE: gunakan authService nyata
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('siperpus_token') || null)
    const user = ref(JSON.parse(localStorage.getItem('siperpus_user') ||
        'null'))
    const isLoggedIn = computed(() => !!token.value)
    const isPustakawan = computed(() => user.value?.role === 'pustakawan')
    const namaUser = computed(() => user.value?.nama || 'Tamu')
    const inisialUser = computed(() => {
        if (!user.value?.nama) return '?'
        return user.value.nama.split('').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    })
    // ACTION LOGIN: sekarang memanggil API nyata!
    async function login(email, password) {
        const result = await authService.login(email, password)
        // result.data = { token, user }
        token.value = result.data.token
        user.value = result.data.user
        localStorage.setItem('siperpus_token', result.data.token)
        localStorage.setItem('siperpus_user', JSON.stringify(result.data.user))
        return result.data.user
    }
    function logout() {
        token.value = null
        user.value = null
        localStorage.removeItem('siperpus_token')
        localStorage.removeItem('siperpus_user')
    }
    return {
        token, user, isLoggedIn, isPustakawan, namaUser, inisialUser,
        login, logout
    }
})
// frontend/src/stores/buku.js — UPDATE: gunakan bukuService nyata
import { bukuService } from '@/services/bukuService'
// Di dalam actions, ganti simulasi dengan API call nyata:
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
async function tambahBuku(data) {
    const result = await bukuService.create(data)
    daftarBuku.value.unshift(result.data) // Tambah ke awal list
    return result.data
}
async function hapusBuku(id) {
    await bukuService.remove(id)
    daftarBuku.value = daftarBuku.value.filter(b => b.id !== id)
}