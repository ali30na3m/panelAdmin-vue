<template>
  <button @click="removeComment(props.deleteID)">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router'

const route = useRoute()
const params = route.fullPath
const props = defineProps<{ deleteID: number | null }>()

const removeComment = async (id: number | null) => {
  if (id === null) return
  Swal.fire({
    title: 'آیا مطمئن به حذف هستید؟',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        axios.delete(`http://localhost:8000/api${params}/${id}`)
        Swal.fire({
          title: 'عملیات موفق آمیز بود',
          icon: 'success',
          confirmButtonText: 'تایید'
        })
      } catch (error) {
        console.error('Error deleting comment:', error)
        Swal.fire({
          title: 'خطا',
          text: 'خطا در حذف کردن آیتم مورد نظر',
          icon: 'error'
        })
      }
    }
  })
}
</script>

<style>
</style>