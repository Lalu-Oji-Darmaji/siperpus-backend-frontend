<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    BookOpenCheck,
    Search,
    User,
    LayoutDashboard,
    LogOut,
    BookOpen,
    Home
} from 'lucide-vue-next'

const router = useRouter()
const kataCariHeader = ref('')
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
// import { useRouter } from 'vue-router'
// ... import komponen shadcn seperti sebelumnya ...
const authStore = useAuthStore()
// Gunakan storeToRefs agar nilai tetap reaktif
const { isLoggedIn, isPustakawan, namaUser, inisialUser } =storeToRefs(authStore)
// Data user - Mocking (Nanti di Bab 4 menggunakan Pinia Store)

const navItems = [
    { to: '/', label: 'Beranda', icon: Home },
    { to: '/katalog', label: 'Katalog', icon: BookOpen },
]

function cariDariHeader() {
    if (!kataCariHeader.value.trim()) return
    // Pastikan route 'katalog' sudah terdaftar di router/index.js
    router.push({ path: '/katalog', query: { q: kataCariHeader.value } })
    kataCariHeader.value = ''
}


// Hapus data user hardcode dan gunakan dari store
// const namaUser = ref('Ahmad Fauzi') <- HAPUS
function handleLogout() {
    authStore.logout()
    router.push({ name: 'home' })
}
</script>

<template>
    <header class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div class="container mx-auto flex h-16 items-center justify-between px-4">
            
            <RouterLink to="/" class="flex items-center gap-2.5 transition-opacity hover:opacity-80">
                <BookOpenCheck class="h-6 w-6 text-primary" />
                <span class="font-bold text-lg tracking-tight text-foreground">SiPerpus</span>
            </RouterLink>

            <nav class="hidden md:flex items-center gap-2">
                <RouterLink 
                    v-for="item in navItems" 
                    :key="item.to" 
                    :to="item.to" 
                    v-slot="{ isActive }"
                >
                    <Button 
                        :variant="isActive ? 'secondary' : 'ghost'" 
                        size="sm" 
                        class="gap-1.5"
                    >
                        <component :is="item.icon" class="h-4 w-4" />
                        {{ item.label }}
                    </Button>
                </RouterLink>
            </nav>

            <div class="flex items-center gap-4">
                <div class="relative hidden sm:block">
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        v-model="kataCariHeader" 
                        placeholder="Cari koleksi..." 
                        class="w-48 lg:w-64 pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1" 
                        @keyup.enter="cariDariHeader" 
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost" size="icon" class="relative h-9 w-9 rounded-full border">
                            <Avatar class="h-8 w-8">
                                <AvatarFallback class="bg-primary/10 text-primary font-bold">
                                    {{ inisialUser }}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" class="w-56 p-2" :side-offset="8">
                        <DropdownMenuLabel class="font-normal flex flex-col gap-1 px-2 py-1.5">
                            <span class="text-sm font-bold leading-none">{{ namaUser }}</span>
                            <span class="text-xs text-muted-foreground leading-none">
                                {{ isPustakawan ? 'Pustakawan' : 'Anggota' }}
                            </span>
                        </DropdownMenuLabel>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem class="cursor-pointer">
                            <User class="mr-2 h-4 w-4" /> Profil Saya
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem v-if="isPustakawan" class="cursor-pointer">
                            <LayoutDashboard class="mr-2 h-4 w-4" /> Dashboard Admin
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem @click="handleLogout" class="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer">
                            <LogOut class="mr-2 h-4 w-4" /> Keluar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>
</template>