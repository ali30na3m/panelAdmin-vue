<template>
  <div
    :class="[
      'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition duration-500',
      isOpen ? 'opacity-100 z-50' : 'opacity-0 -z-50'
    ]"
    @click="closeModal"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg" @click.stop>
      <slot></slot>
      <div class="flex justify-center items-center gap-3">
        <button @click="editModal" class="mt-4 bg-green-500 text-white py-2 px-4 rounded-xl">
          ویرایش
        </button>
        <button @click="closeModal" class="mt-4 bg-red-500 text-white py-2 px-4 rounded-xl">
          بستن
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2'
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

import type { EditModalProps } from './Type';

const props = defineProps<EditModalProps>()
const emit = defineEmits(['close', 'mutate'])

const editModal = async () => {
  try {
    if (!props.editsValue.id) {
      throw new Error('Invalid data')
    }
    const response = await fetch(`${props.url}${props.editsValue.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.editsValue)
    })
    if (!response.ok) throw new Error('Network response was not ok')
    Swal.fire({
      title: 'عملیات موفق آمیز بود',
      icon: 'success',
      confirmButtonText: 'تایید'
    }).then(() => {
      emit('close')
      emit('mutate', props.editsValue)
    })
  } catch (error) {
    console.error('Error editing product:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در ویرایش محصول',
      icon: 'error'
    })
  }
}

const closeModal = () => {
  emit('close')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
  } else if (e.key === 'Enter') {
    editModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
</style>
