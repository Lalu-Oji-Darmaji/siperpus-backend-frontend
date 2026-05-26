import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
export const useAuthStore = defineStore('auth', () => {
  // ── STATE ────────────────────────────────────────────────
  // Mengambil data dari localStorage agar sesi tetap terjaga saat refresh
  const token = ref(localStorage.getItem('siperpus_token') || null)
  const user = ref(JSON.parse(localStorage.getItem('siperpus_user') || 'null'))

  // ── GETTERS (COMPUTED) ───────────────────────────────────
  const isLoggedIn = computed(() => !!token.value)
  const isPustakawan = computed(() => user.value?.role === 'pustakawan')
  const isAnggota = computed(() => user.value?.role === 'anggota')
  const namaUser = computed(() => user.value?.nama || 'Tamu')

  const inisialUser = computed(() => {
    if (!user.value?.nama) return '?'
    return user.value.nama.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  })
  // ── ACTIONS ──────────────────────────────────────────────

  /**
   * Simulasi login user (Akan dihubungkan ke Express.js pada Bab 5)
   */
  async function login(email, password) {
    const result = await authService.login(email, password)
    // result.data = { token, user }
    token.value = result.data.token
    user.value = result.data.user
    localStorage.setItem('siperpus_token', result.data.token)
    localStorage.setItem('siperpus_user', JSON.stringify(result.data.user))
    return result.data.user
  }

  /**
   * Menghapus sesi dan data lokal
   */
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