<template>
  <div>
    <h2 class="text-3xl font-extrabold">کاربران</h2>
    <div class="bg-white mt-9 py-4 px-5 mb-4 rounded-xl">
      <TablePanel v-if="users.length" :headers="tableHeaders">
        <template #default>
          <tr v-for="(user, index) in users" :key="index" class="child:px-14 child:text-center">
            <td>{{ user.firsname }} {{ user.lastname }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.email }}</td>
            <td class="text-white child:py-2 child:px-3 child:bg-pinkSecondary child:rounded-lg">
              <DeleteButton :deleteID="user.id"> حذف </DeleteButton>
              <button @click="detailHandler(user)" class="mr-3">جزییات</button>
              <button @click="editHandler(user)" class="mr-3">ویرایش</button>
            </td>
          </tr>
        </template>
      </TablePanel>
      <NothingDiv v-else />
    </div>
    <DetailModal :isOpen="isModalDetailOpen" @close="isModalDetailOpen = false">
      <template #default>
        <h3 class="text-2xl font-bold text-center">جزئیات محصول</h3>
        <p>شهر:{{ userDetails?.city }}</p>
        <p>آدرس:{{ userDetails?.address }}</p>
        <p>امتیاز:{{ userDetails?.score }}</p>
        <p>خرید:{{ userDetails?.buy }}</p>
      </template>
    </DetailModal>
    <EditModal
      :url="urlEditModal"
      :editsValue="editForm"
      :isOpen="isModalEditOpen"
      @mutate="mutateFunc"
      @close="handleEditModalClose"
    >
      <h3 class="text-2xl font-bold mb-3">ویرایش محصول</h3>
      <div
        class="grid grid-cols-2 gap-5 child:py-3 child:px-5 child:rounded-xl child:outline-none child:bg-[#f0f0f0]"
      >
        <input v-model.number="editForm.firsname" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model="editForm.lastname" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model="editForm.username" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model="editForm.password" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model="editForm.email" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model="editForm.address" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model="editForm.city" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model.number="editForm.buy" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model.number="editForm.phone" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model.number="editForm.score" type="text" placeholder="اسم محصول را بنویسید" />
      </div>
    </EditModal>
  </div>
</template>

<script lang="ts" setup>
import NothingDiv from '@/components/NothingDiv.vue'
import DetailModal from '@/components/Modal/DetailModal.vue'
import TablePanel from '@/components/TablePanel.vue'
import EditModal from '@/components/Modal/EditModal/EditModal.vue'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import FetchApis from '@/api/Fetchapi'
import type { userInfo } from './type'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const isModalDetailOpen = ref<boolean>(false)
const isModalEditOpen = ref<boolean>(false)
const tableHeaders = ref<string[]>(['نام و نام خانوادگی	', 'نام کاربری', 'شماره تماس', 'ایمیل'])
const users = ref<userInfo[]>([])
const userDetails = ref<userInfo | null>(null)
const editForm = ref<userInfo>({
  id: null,
  address: '',
  buy: null,
  city: '',
  email: '',
  firsname: '',
  lastname: '',
  password: '',
  phone: null,
  score: null,
  username: ''
})
const urlEditModal = 'http://localhost:8000/api/users/'

const route = useRoute()

onMounted(async () => {
  users.value = await FetchApis(route)
})

const detailHandler = (user: userInfo) => {
  isModalDetailOpen.value = true
  userDetails.value = user
}

const editHandler = (user: userInfo) => {
  isModalEditOpen.value = true
  editForm.value = {
    id: user.id,
    address: user.address,
    buy: user.buy,
    city: user.city,
    email: user.email,
    firsname: user.firsname,
    lastname: user.lastname,
    password: user.password,
    phone: user.phone,
    score: user.score,
    username: user.username
  }
}
const mutateFunc = (updatedUser: userInfo) => {
  const index = users.value.findIndex((user) => user.id === updatedUser.id)

  if (index !== -1) {
    users.value[index] = updatedUser
  } else {
    users.value.push(updatedUser)
  }
}

const handleEditModalClose = () => {
  isModalEditOpen.value = false
  FetchApis(route)
}
</script>
