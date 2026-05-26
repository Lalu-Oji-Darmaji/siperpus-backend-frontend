<template>
  <div class="katalog-page">
    <div class="page-header">
      <h1>Katalog Buku</h1>
      <p>Menampilkan {{ bukuTerfilter.length }} dari {{ statistik.total }} buku</p>
    </div>
    <div class="toolbar">
      <div class="search-wrap">
        <input 
          v-model.trim="filter.search" 
          type="text" 
          placeholder="Cari judul atau penulis..." 
          class="input-search"
          @keyup.escape="filter.search = ''" 
        />
        <button v-if="filter.search" class="btn-clear" @click="filter.search = ''">
          ✕
        </button>
      </div>

      <select v-model="filter.kategori" class="select-filter">
        <option value="">Semua Kategori</option>
        <option v-for="kat in daftarKategori" :key="kat" :value="kat">
          {{ kat }}
        </option>
      </select>

      <div class="filter-status">
        <button 
          v-for="s in statusOptions" 
          :key="s.value" 
          :class="['btn-status', { aktif: filter.status === s.value }]"
          @click="filter.status = s.value"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="grid-buku">
      <div v-for="n in 8" :key="n" class="skeleton-kartu"></div>
    </div>

    <div v-else-if="bukuTerfilter.length === 0" class="state-kosong">
      <p>📭 Tidak ada buku yang cocok dengan pencarian Anda.</p>
      <button @click="resetFilter" class="btn-reset">Reset Filter</button>
    </div>

    <div v-else class="grid-buku">
      <div v-for="buku in bukuTerfilter" :key="buku.id" :class="[
        'kartu-buku',
        { 'kartu-dipinjam': !buku.tersedia }
      ]">
        <h3 class="judul">{{ buku.judul }}</h3>
        <p class="penulis">{{ buku.penulis }}</p>
        <div class="kartu-meta">
          <span class="badge-kategori">{{ buku.kategori }}</span>
          <span class="badge-status" :class="buku.tersedia ? 'tersedia' : 'dipinjam'">
            {{ buku.tersedia ? 'Tersedia' : 'Dipinjam' }}
          </span>
        </div>
        <p class="tahun">{{ buku.tahun }} &bull; {{ buku.penerbit }}</p>
        <div class="kartu-actions">
          <button class="btn-detail" @click="goToDetail(buku)">Detail</button>
          <button v-if="buku.tersedia" class="btn-pinjam" @click="handlePinjam(buku.id)">
            Pinjam
          </button>
        </div>
      </div>
    </div>

    <button class="btn-filter-toggle" @click="panelFilterTerbuka = !panelFilterTerbuka">
      {{ panelFilterTerbuka ? 'Sembunyikan' : 'Tampilkan' }} Filter Lanjutan
    </button>

    <div v-show="panelFilterTerbuka" class="panel-filter-lanjutan">
      <h4>Filter Lanjutan</h4>
      <label>Tahun dari:</label>
      <input v-model.number="filterTahunDari" type="number" placeholder="2000" />
      <label>Tahun sampai:</label>
      <input v-model.number="filterTahunSampai" type="number" :placeholder="tahunSekarang" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue' 
import { storeToRefs } from 'pinia'
import { useBukuStore } from '@/stores/buku'
import { useRouter } from 'vue-router'

const router = useRouter()
const bukuStore = useBukuStore()

const {
  bukuTerfilter,
  isLoading,
  error,
  filter,
  statistik,
  daftarKategori,
} = storeToRefs(bukuStore)

const { ambilSemuaBuku, setFilter, resetFilter, pinjamBuku } = bukuStore

const panelFilterTerbuka = ref(false)
const filterTahunDari = ref(null)
const filterTahunSampai = ref(null)
const tahunSekarang = new Date().getFullYear().toString()

const statusOptions = [
  { label: 'Semua', value: 'semua' },
  { label: 'Tersedia', value: 'tersedia' },
  { label: 'Dipinjam', value: 'dipinjam' },
]

onMounted(() => {
  if (bukuStore.daftarBuku.length === 0) {
    ambilSemuaBuku()
  }
})

function goToDetail(buku) {
  router.push({ name: 'detail-buku', params: { id: buku.id } })
}

function handlePinjam(idBuku) {
  pinjamBuku(idBuku)
}
</script>
<style scoped>
.katalog-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 2rem;
  color: #1A3C5E;
}

.page-header p {
  color: #64748B;
  margin-top: 4px;
}

.toolbar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 220px;
}

.input-search {
  width: 100%;
  padding: 10px 36px 10px 12px;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: .2s;
}

.input-search:focus {
  border-color: #2563EB;
  box-shadow: 0 0 0 3px #BFDBFE;
}

.btn-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(- 50%);
  background: none;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  fontsize: 1rem;
}

.select-filter {
  padding: 10px 12px;
  border: 1px solid #CBD5E1;
  borderradius: 8px;
  font-size: .95rem;
  outline: none;
  cursor: pointer;
}

.filter-status {
  display: flex;
  gap: 6px;
}

.btn-status {
  padding: 8px 16px;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: .9rem;
  transition: .2s;
}

.btn-status.aktif {
  background: #2563EB;
  color: white;
  border-color: #2563EB;
}

.skeleton-kartu {
  height: 200px;
  background: #E2E8F0;
  border-radius: 12px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1
  }

  50% {
    opacity: .5
  }
}

.grid-buku {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.kartu-buku {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .07);
  transition: transform .2s, box-shadow .2s;
}

.kartu-buku:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, .12);
}

.kartu-dipinjam {
  opacity: .75;
}

.judul {
  font-size: 1rem;
  font-weight: 700;
  color: #1A3C5E;
  margin-bottom: 4px;
}

.penulis {
  color: #475569;
  font-size: .9rem;
  margin-bottom: 12px;
}

.kartu-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.badge-kategori {
  background: #EFF6FF;
  color: #1D4ED8;
  font-size: .75rem;
  padding: 2px 8px;
  border-radius: 12px;
}

.badge-status.tersedia {
  background: #F0FDF4;
  color: #15803D;
  font-size: .75rem;
  padding: 2px 8px;
  border-radius: 12px;
}

.badge-status.dipinjam {
  background: #FEF2F2;
  color: #DC2626;
  font-size: .75rem;
  padding: 2px 8px;
  border-radius: 12px;
}

.tahun {
  font-size: .8rem;
  color: #94A3B8;
  margin-bottom: 16px;
}

.kartu-actions {
  display: flex;
  gap: 8px;
}

.btn-detail {
  flex: 1;
  padding: 8px;
  border: 1px solid #2563EB;
  color: #2563EB;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: .2s;
}

.btn-detail:hover {
  background: #EFF6FF;
}

.btn-pinjam {
  flex: 1;
  padding: 8px;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: .2s;
}

.btn-pinjam:hover {
  background: #1D4ED8;
}

/* State kosong */
.state-kosong {
  text-align: center;
  padding: 60px 20px;
  color: #64748B;
}

.state-kosong p {
  font-size: 1.1rem;
  margin-bottom: 16px;
}

.btn-reset {
  background: #2563EB;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}

/* Panel filter lanjutan */
.btn-filter-toggle {
  margin-top: 20px;
  background: none;
  border: 1px solid #CBD5E1;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: #475569;
}

.panel-filter-lanjutan {
  margin-top: 12px;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  alignitems: center;
  flex-wrap: wrap;
}

.panel-filter-lanjutan h4 {
  color: #1A3C5E;
}

.panel-filter-lanjutan label {
  color: #475569;
  font-size: .9rem;
}

.panel-filter-lanjutan input {
  padding: 6px 10px;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  width: 100px;
}
</style>