<template>
  <header
    class="flex items-center justify-between fixed top-0 right-0 left-0 mr-48 py-3 px-5 backdrop-blur-sm"
  >
    <div class="flex items-center gap-3">
      <img class="w-12 h-12 rounded-full" :src="imagUrl" alt="developer" />
      <div class="flex flex-col text-right">
        <h2 >سینا میراخوری</h2>
        <h2 class="text-gray-600 tracking-tighter">توسعه دهنده رابط کاربری</h2>
      </div>
    </div>
    <div class="flex items-center gap-2 child:text-white">
      <button
        @click="themeClick"
        class="flex items-center justify-center p-3 bg-pinkSecondary rounded-lg"
      >
        <FontAwesomeIcon :icon="faMoon" />
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import imagUrl from '@/assets/photo_2024-01-03_15-03-36.jpg'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref } from 'vue'

const theme = ref<boolean>(false)

onMounted(() => {
  loadProfile()
})

const loadProfile = () => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    theme.value = savedTheme === "dark" ? true  : false
    document.documentElement.classList.add(savedTheme)
  }
}

const themeClick = () => {
  theme.value = !theme.value

  localStorage.setItem('theme', theme.value ? 'dark' : 'light')
  document.documentElement.classList.remove('dark', 'light')
  document.documentElement.classList.add(theme.value ? 'dark' : '')

  if (theme.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

}
</script>

<style>

html.dark {
  background-color: #27272a;
}

</style>