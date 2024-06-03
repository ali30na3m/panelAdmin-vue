<template>
  <div
    :class="[
      'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition duration-500',
      isOpen ? 'opacity-100 z-50' : 'opacity-0 -z-50'
    ]"
    @click="closeModal"
  >
    <div class="box-Panel bg-white p-5 rounded-lg shadow-lg" @click.stop>
      <slot></slot>
      <button @click="closeModal" class="flex items-center justify-center mx-auto mt-4 bg-red-500 text-white py-2 px-4 rounded">بستن</button>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === 'Escape') {
    closeModal()
  }
})
</script>
  
<style scoped>
</style>
