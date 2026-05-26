<!-- src/components/ui/DataList.vue — Komponen daftar generik -->
<template>
    <div class="data-list">
    
        <!-- Skeleton loading state -->
    
        <div v-if="isLoading" class="grid gap-4" :class="gridClass">
    
            <Skeleton v-for="n in skeletonCount" :key="n" class="h-48 rounded-lg" />
    
        </div>
    
        <!-- Empty state -->
    
        <div v-else-if="items.length === 0" class="text-center py-16">
    
            <!-- Slot kosong: parent bisa kustomisasi tampilan kosong -->
    
            <slot name="empty">
    
                <p class="text-muted-foreground">Belum ada data.</p>
    
            </slot>
    
        </div>
    
        <!-- Data state: render tiap item via scoped slot -->
    
        <div v-else class="grid gap-4" :class="gridClass">
    
            <div v-for="(item, index) in items" :key="item[keyField]">
    
                <!-- Scoped slot: kirim item dan index ke parent -->
    
                <!-- Parent bisa akses: #default="{ item, index }" -->
    
                <slot :item="item" :index="index" />
    
            </div>
    
        </div>
    
    </div>
</template>
<script setup>
import { Skeleton } from '@/components/ui/skeleton' defineProps({
    items: { type: Array, required: true },
            isLoading: { type: Boolean, default: false },
            keyField: { type: String, default: 'id' },
            gridClass: {type: String, default: 'grid-cols-1 sm:grid-cols-2 lg: grid-cols-3 xl: grid-cols-4'}, skeletonCount: { type: Number, default: 8 },})
</script>
<!-- ═══ PENGGUNAAN DI KatalogView.vue ═══ -->
<DataList :items="bukuTerfilter" :is-loading="isLoading" grid-class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <template #default="{ item: buku }">
        <KartuBuku :buku="buku" @lihat-detail="goToDetail" @pinjam="handlePinjam" />
    </template>
    <!-- Named slot: tampilan saat daftar kosong -->
    <template #empty>
        <div class="text-center py-16">
    
            <BookX class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
    
            <p class="text-lg font-medium">Tidak ada buku ditemukan</p>
    
                <p class="text-muted-foreground mt-1">Coba ubah kata pencarian atau filter
    
            </p>
    
        </div>
    </template>
</DataList>