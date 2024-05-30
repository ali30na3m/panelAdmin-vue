<template>
  <div>
    <h2 class="text-3xl font-extrabold">سفارشات</h2>
    <div class="bg-white mt-9 py-4 px-5 mb-4 rounded-xl">
      <TablePanel v-if="orders.length" :headers="tableHeaders">
        <template #default>
          <tr v-for="(order, index) in orders" :key="index" class="child:px-14 child:text-center">
            <td>{{ order.userID }}</td>
            <td>{{ order.productID }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.off }}</td>
            <td class="text-white child:py-2 child:px-3 child:bg-pinkSecondary child:rounded-lg">
              <button @click="confirmAndDeleteProduct(order.id ?? undefined)" class="mr-3">
                حذف
              </button>
              <button
                v-if="order.isActive === 0"
                @click="acceptComment(order.id ?? undefined)"
                class="mr-3"
              >
                تایید
              </button>
              <button
                v-if="order.isActive === 1"
                @click="rejectComment(order.id ?? undefined)"
                class="mr-3"
              >
                رد
              </button>
            </td>
          </tr>
        </template>
      </TablePanel>
      <NothingDiv v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NothingDiv from '@/components/NothingDiv.vue'
import TablePanel from '@/components/TablePanel.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'

interface orderInfo {
  id?: number | null
  count: number | null
  price: number | null
  date: string
  hour: string
  isActive: number | null
  off: number | null
  popularity: number | null
  productID: string
  sale: number | null
  sale_count: number | null
  userID?: string
}

const orders = ref<orderInfo[]>([])
const tableHeaders = ref<string[]>(['نام و نام خانوادگی', 'محصول', 'تاریخ', 'قیمت', 'تخفیف'])

onMounted(() => {
  fetchOrders()
})

const fetchOrders = () => {
  axios.get('http://localhost:8000/api/orders/').then((data) => {
    orders.value = data.data
    console.log(data.data)
  })
}

const confirmAndDeleteProduct = (id: number | undefined) => {
  if (id === undefined) {
    console.warn('Product ID is undefined')
    return
  }

  Swal.fire({
    title: 'آیا مطمئن به حذف هستید؟',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then((resault) => {
    if (resault.isConfirmed) {
      try {
        axios
          .delete(`http://localhost:8000/api/orders/${id}`)
          .then(() => {
            Swal.fire({
              title: 'عملیات موفق آمیز بود',
              icon: 'success',
              confirmButtonText: 'تایید'
            })
          })
          .then(() => fetchOrders())
      } catch (error) {
        console.error('Error deleting product:', error)
        Swal.fire({
          title: 'خطا',
          text: 'خطا در حذف محصول',
          icon: 'error'
        })
      }
    }
  })
}

const acceptComment = (id: number | undefined) => {
  Swal.fire({
    title: 'آیا مطمئن به تایید کردن هستید؟',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then((resault) => {
    if (resault.isConfirmed) {
      try {
        axios.put(`http://localhost:8000/api/orders/active-order/${id}/1`)
          .then(() => {
            Swal.fire({
              title: 'سفارش تایید شد',
              icon: 'success',
              confirmButtonText: 'تایید'
            })
          })
          .then(() => fetchOrders())
      } catch (error) {
        console.log('Error accepting comment:', error)
        Swal.fire({
          title: 'خطا',
          text: 'خطا در تایید کامنت',
          icon: 'error'
        })
      }
    }
  })
}
const rejectComment = (id: number | undefined) => {
  Swal.fire({
    title: 'آیا مطمئن به رد کردن هستید؟',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then((resault) => {
    if (resault.isConfirmed) {
      try {
        axios.put(`http://localhost:8000/api/orders/active-order/${id}/0`)
          .then(() => {
            Swal.fire({
              title: 'سفارش رد شد',
              icon: 'success',
              confirmButtonText: 'تایید'
            })
          })
          .then(() => fetchOrders())
      } catch (error) {
        console.log('Error accepting comment:', error)
        Swal.fire({
          title: 'خطا',
          text: 'خطا در تایید کامنت',
          icon: 'error'
        })
      }
    }
  })
}
</script>

<style>
</style>