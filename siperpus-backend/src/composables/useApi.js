// frontend/src/composables/useApi.js
// Composable generik untuk menangani state API call
import { ref } from 'vue'
export function useApi() {
const isLoading = ref(false)
const error = ref(null)
// execute: jalankan API call dengan state management otomatis
async function execute(apiFn, ...args) {
isLoading.value = true
error.value = null
try {
const result = await apiFn(...args)
return result
} catch (e) {
// Extract pesan error dari Axios response
error.value =
e.response?.data?.message ||
e.response?.data?.errors?.[0]?.message ||
e.message ||
'Terjadi kesalahan yang tidak diketahui'
throw e // Re-throw agar pemanggil bisa handle juga
} finally {
isLoading.value = false
}
}
function clearError() {
error.value = null
}
return { isLoading, error, execute, clearError }
}
// Penggunaan di komponen:
// const { isLoading, error, execute } = useApi()
//
// async function simpan() {
// try {
// await execute(bukuService.create, formData)
// router.push({ name: 'kelola-buku' })
// } catch (e) {
// // error.value sudah terisi oleh useApi
// // tampilkan di template: <p v-if="error">{{ error }}</p>
// }
// }