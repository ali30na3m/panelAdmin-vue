<template>
  <div>
    <h2 class="text-3xl font-extrabold">تخفیفات</h2>
    <div class="box-Panel bg-white mt-9 py-4 px-5 mb-4 rounded-xl">
      <TablePanel v-if="offs.length" :headers="tableHeaders">
        <template #default>
          <tr v-for="(off, index) in offs" :key="index" class="child:px-14 child:text-center">
            <td>{{ off.productID }}</td>
            <td>{{ off.adminID }}</td>
            <td>{{ off.percent }}</td>
            <td>{{ off.date }}</td>
            <td class="text-white child:py-2 child:px-3 child:bg-pinkSecondary child:rounded-lg">
              <DeleteButton @mutate="mutateDelete" :deleteID="off.id"> حذف </DeleteButton>
              <button
                v-if="off.isActive === 0"
                @click="acceptComment(off.id ?? undefined)"
                class="mr-3"
              >
                تایید
              </button>
              <button v-else @click="rejectComment(off.id ?? undefined)" class="mr-3">رد</button>
            </td>
          </tr>
        </template>
      </TablePanel>
      <NothingDiv v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import NothingDiv from '@/components/NothingDiv.vue'
import TablePanel from '@/components/TablePanel.vue'
import { getApi, putApi } from '@/api'
import type { offInfo } from './type'

import { onMounted, ref } from 'vue'

import Swal from 'sweetalert2'

const tableHeaders = ref<string[]>(['محصول', 'ادمین', 'درصد', 'تاریخ'])
const offs = ref<offInfo[]>([])

const fetchOffs = async () => {
  await getApi('offs').then((data) => (offs.value = data))
}

onMounted(() => {
  fetchOffs()
})

const mutateDelete = () => {
  return fetchOffs()
}

const acceptComment = (id: number | undefined) => {
  Swal.fire({
    title: 'آیا مطمئن به تایید کردن هستید؟',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then(async (resault) => {
    if (resault.isConfirmed) {
      try {
        await putApi(`offs/active-off/${id}/1`)
        Swal.fire({
          title: 'سفارش تایید شد',
          icon: 'success',
          confirmButtonText: 'تایید'
        }).then(() => fetchOffs())
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
  }).then(async (resault) => {
    if (resault.isConfirmed) {
      try {
        await putApi(`offs/active-off/${id}/0`)
        Swal.fire({
          title: 'سفارش رد شد',
          icon: 'success',
          confirmButtonText: 'تایید'
        }).then(() => fetchOffs())
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

<style scoped>
</style>