// frontend/src/services/bukuService.js
// Semua panggilan API yang berhubungan dengan buku ada di sini
import api from './api'
export const bukuService = {
    // GET /api/buku — daftar buku dengan filter
    async getAll(params = {}) {
        const response = await api.get('/buku', { params })
        return response.data // { success, data: { items, pagination } }
    },
    // GET /api/buku/:id
    async getById(id) {
        const response = await api.get(`/buku/${id}`)
        return response.data // { success, data: buku }
    },
    // POST /api/buku
    async create(data) {
        const response = await api.post('/buku', data)
        return response.data
    },
    // PUT /api/buku/:id
    async update(id, data) {
        const response = await api.put(`/buku/${id}`, data)
        return response.data
    },
    // DELETE /api/buku/:id
    async remove(id) {
        const response = await api.delete(`/buku/${id}`)
        return response.data
    },
    // GET /api/buku/statistik
    async getStatistik() {
        const response = await api.get('/buku/statistik')
        return response.data
    },
}
// frontend/src/services/authService.js
import api from './api'
export const authService = {
    async login(email, password) {
        const response = await api.post('/auth/login', { email, password })
        return response.data // { success, data: { token, user } }
    },
    async getMe() {
        const response = await api.get('/auth/me')
        return response.data
    },
    async register(data) {
        const response = await api.post('/auth/register', data)
        return response.data
    },
}