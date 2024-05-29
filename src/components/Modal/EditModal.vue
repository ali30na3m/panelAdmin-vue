<template>
  <div
    :class="[
      'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition duration-500',
      props.isOpen ? 'opacity-100 z-50' : 'opacity-0 -z-50'
    ]"
    @click="closeModal"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg" @click.stop>
      <slot></slot>
      <div class="flex items-center gap-3">
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

interface ProductInfo {
  id?: number | null
  title: string
  price: number | null
  count: number | null
  img: string
  popularity: number | null
  sale: number | null
  colors: number | null
}

const props = defineProps<{ isOpen: boolean; editsValue: ProductInfo }>()
const emit = defineEmits(['close'])

const editModal = () => {
  console.log(props.editsValue)

  try {
    fetch(`http://localhost:8000/api/products/${props.editsValue.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.editsValue)
    }).then(() => {
      Swal.fire({
        title: 'عملیات موفق آمیز بود',
        icon: 'success',
        confirmButtonText: 'تایید'
      })
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در حذف محصول',
      icon: 'error'
    })
  }
  closeModal()
}

const closeModal = () => {
  emit('close')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
  }else if(e.key === 'Enter') {
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
  