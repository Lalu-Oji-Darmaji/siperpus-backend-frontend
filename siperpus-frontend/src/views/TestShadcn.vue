<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>
<template>
  <div class="container mx-auto p-8 space-y-6">

    <h1 class="text-3xl font-bold text-blue-600">
      Test shadcn-vue ✓
    </h1>

    <p class="text-gray-500">
      Jika judul di atas berwarna biru dan tombol berikut tampil dengan benar, instalasi shadcn-vue berhasil!
    </p>

    <div class="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Tombol Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
    </div>

    <Card class="max-w-sm">
      <CardHeader>
        <CardTitle>Card Test</CardTitle>
        <CardDescription>Komponen Card shadcn-vue berfungsi</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-gray-500">
          Tailwind CSS dan CSS variables bekerja dengan benar.
        </p>
      </CardContent>
    </Card>

    <div class="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>

  </div>
</template>