<template>
  <header class="flex items-center justify-between fixed top-0 right-0 left-0 mr-48 py-3 px-5 backdrop-blur-sm">
    <div class="flex items-center gap-3">
      <img class="w-12 h-12 rounded-full" :src="imagUrl" alt="developer" />
      <div class="flex flex-col text-right">
        <h2 class="">سینا میراخوری</h2>
        <h2 class="text-gray-600 tracking-tighter">توسعه دهنده رابط کاربری</h2>
      </div>
    </div>
    <div class="flex items-center gap-2 child:text-white">
      <div class="flex items-center bg-white py-2 px-4 rounded-xl">
        <input
          class="outline-none text-black text-right"
          placeholder="جست و جو کنید ..."
          type="text"
        />
        <button class="flex items-center justify-center bg-pinkSecondary py-2 px-3 rounded-2xl">
          جست و جو
        </button>
      </div>
      <button class="flex items-center justify-center p-3 bg-pinkSecondary rounded-lg">
        <BellOutlined />
      </button>
      <button class="flex items-center justify-center p-3 bg-pinkSecondary rounded-lg">
        <BellOutlined />
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { BellOutlined } from '@ant-design/icons-vue'
import imagUrl from '@/assets/photo_2024-01-03_15-03-36.jpg'
</script>

<style>
</style>