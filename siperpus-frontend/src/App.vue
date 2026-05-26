<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <AppHeader />
    <main class="relative flex-1">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<style>
/* Dengan Tailwind v4, Anda biasanya tidak butuh style tag lagi di sini. 
  Pastikan @import "tailwindcss"; sudah ada di file CSS utama Anda.
*/
</style>