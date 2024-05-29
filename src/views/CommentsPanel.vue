<template>
  <div>
    <h2 class="text-3xl font-extrabold">کامنت ها</h2>
    <div class="bg-white mt-9 py-4 px-5 mb-4 rounded-xl">
      <TablePanel v-if="comments.length" :headers="tableHeaders">
        <template #default>
          <tr v-for="comment in comments" :key="comment.id" class="child:px-14">
            <td>{{ comment.userID }}</td>
            <td>{{ comment.productID }}</td>
            <td>
              <button
                @click="showComment(comment.body)"
                class="py-2 px-3 bg-pinkSecondary text-white rounded-lg"
              >
                نمایش
              </button>
            </td>
            <td>{{ comment.date }}</td>
            <td>{{ comment.hour }}</td>
            <td class="text-white child:py-2 child:px-3 child:bg-pinkSecondary child:rounded-lg">
              <button @click="removeComments(comment.id)">حذف</button>
              <button @click="editComments(comment)" class="mr-2">ویرایش</button>
              <button class="mr-2">تایید</button>
            </td>
          </tr>
        </template>
      </TablePanel>
      <NothingDiv v-else />
      <DetailModal :isOpen="isCommentOpen" @close="isCommentOpen = false">
        <h3 class="text-center text-2xl font-bold my-4">کامنت</h3>
        <p>{{ commentBody }}</p>
      </DetailModal>
      <EditModal :editsValue="editForm" :isOpen="isEditModal" @close="isEditModal = false">
      </EditModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TablePanel from '../components/TablePanel.vue'
import DetailModal from '../components/Modal/DetailModal.vue'
import EditModal from '../components/Modal/EditModal.vue'
import NothingDiv from '../components/NothingDiv.vue'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'

interface commentInfo {
  id?: number | null
  productID?: number | string
  userID: string
  body: string
  date: string
  hour: string
  isAccept: number | null
}

const tableHeaders = ref<string[]>(['اسم کاربر', 'محصول', 'کامنت', 'تاریخ', 'ساعت'])
const comments = ref<commentInfo[]>([])
const isCommentOpen = ref<boolean>(false)
const isEditModal = ref<boolean>(false)
const commentBody = ref<string>('')

const editForm = ref<commentInfo>({
  id: null,
  body: '',
  date: '',
  hour: '',
  isAccept: null,
  userID: '',
  productID: ''
})

onMounted(() => {
  fetchComments()
})

const fetchComments = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/comments/')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    comments.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در بارگیری محصولات',
      icon: 'error'
    })
  }
}

const removeComments = (id: number) => {
  Swal.fire({
    title: 'آیا مطمئن به حذف هستید؟',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        fetch(`http://localhost:8000/api/comments/${id}`, {
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
          .then(() => fetchComments())
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

const showComment = (comment: string) => {
  isCommentOpen.value = true
  commentBody.value = comment
}

const editComments = (commentInfos: commentInfo[]) => {}
</script>

<style>
</style>