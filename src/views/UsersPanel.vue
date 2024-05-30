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
              <button @click="confirmAndDeleteProduct(user.id ?? undefined)">حذف</button>
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
import NothingDiv from '../components/NothingDiv.vue'
import DetailModal from '../components/Modal/DetailModal.vue'
import TablePanel from '../components/TablePanel.vue'
import EditModal from '../components/Modal/EditModal.vue'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'

interface userInfo {
  id?: number | null
  address: string
  buy: number | null
  city: string
  email: string
  firsname: string
  lastname: string
  password: string
  phone: number | null
  score: number | null
  username: string
}

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

onMounted(() => {
  fetchUsers()
})

const fetchUsers = () => {
  fetch('http://localhost:8000/api/users')
    .then((res) => res.json())
    .then((data) => {
      users.value = data
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
        fetch(`http://localhost:8000/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            Swal.fire({
              title: 'عملیات موفق آمیز بود',
              icon: 'success',
              confirmButtonText: 'تایید'
            })
          })
          .then(() => fetchUsers())
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

const detailHandler = (user: userInfo) => {
  isModalDetailOpen.value = true
  userDetails.value = user
}

const editHandler = (user: userInfo) => {
  isModalEditOpen.value = true
  editForm.value = {
    id:user.id,
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

const handleEditModalClose = () => {
  isModalEditOpen.value = false
  fetchUsers()
}
</script>
