<template>
  <div>
    <h2 class="text-3xl font-extrabold">سفارشات</h2>
    <div class="bg-white mt-9 py-4 px-5 mb-4 rounded-xl">
      <TablePanel v-if="orders.length" :headers="tableHeaders">
        <template #default>
          <tr v-for="(order, index) in orders" :key="index" class="child:px-14 child:text-center">
            <td>{{ order.userID }}</td>
            <td>{{ order.productID }}</td>
            <td>{{ order.date.slice(0, 10) }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.off }}</td>
            <td class="text-white child:py-2 child:px-3 child:bg-pinkSecondary child:rounded-lg">
              <DeleteButton :deleteID="order.id"> حذف </DeleteButton>
              <button
                v-if="order.isActive === 0"
                @click="acceptComment(order.id ?? undefined)"
                class="mr-3"
              >
                تایید
              </button>
              <button v-else @click="rejectComment(order.id ?? undefined)" class="mr-3">رد</button>
            </td>
          </tr>
        </template>
      </TablePanel>
      <NothingDiv v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FetchApis from '@/api/Fetchapi'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import NothingDiv from '@/components/NothingDiv.vue'
import TablePanel from '@/components/TablePanel.vue'

import axios from 'axios'
import Swal from 'sweetalert2'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import type { orderInfo } from './type'

const orders = ref<orderInfo[]>([])
const tableHeaders = ref<string[]>(['نام و نام خانوادگی', 'محصول', 'تاریخ', 'قیمت', 'تخفیف'])

const route = useRoute()

const fetchOrders = async () => {
  orders.value = await FetchApis(route)
}

onMounted(fetchOrders)

const acceptComment = async (id: number | undefined) => {
  Swal.fire({
    title: 'آیا مطمئن به تایید کردن هستید؟',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:8000/api/orders/active-order/${id}/1`)
        Swal.fire({
          title: 'سفارش تایید شد',
          icon: 'success',
          confirmButtonText: 'تایید'
        })
        await fetchOrders()
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

const rejectComment = async (id: number | undefined) => {
  Swal.fire({
    title: 'آیا مطمئن به رد کردن هستید؟',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:8000/api/orders/active-order/${id}/0`)
        Swal.fire({
          title: 'سفارش رد شد',
          icon: 'success',
          confirmButtonText: 'تایید'
        })
        await fetchOrders() 
      } catch (error) {
        console.log('Error rejecting comment:', error)
        Swal.fire({
          title: 'خطا',
          text: 'خطا در رد کامنت',
          icon: 'error'
        })
      }
    }
  })
}
</script>

<style>
</style>
