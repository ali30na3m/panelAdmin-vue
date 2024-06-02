<template>
  <div>
    <h2 class="text-3xl font-extrabold">کامنت ها</h2>
    <div class="bg-white mt-9 py-4 px-5 mb-4 rounded-xl">
      <TablePanel v-if="comments.length" :headers="tableHeaders">
        <template #default>
          <tr
            v-for="(comment, index) in comments"
            :key="index"
            class="child:px-14 child:text-center"
          >
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
              <DeleteButton :deleteID="comment.id">حذف</DeleteButton>
              <button @click="editComment(comment)" class="mr-2">ویرایش</button>
              <button @click="acceptComment(comment.id)" v-if="comment.isAccept === 0" class="mr-2">
                تایید
              </button>
              <button @click="rejectComment(comment.id)" v-else class="mr-2">رد</button>
            </td>
          </tr>
        </template>
      </TablePanel>
      <NothingDiv v-else />
      <DetailModal :isOpen="isCommentOpen" @close="isCommentOpen = false">
        <h3 class="text-center text-2xl font-bold my-4">کامنت</h3>
        <p>{{ commentBody }}</p>
      </DetailModal>
      <EditModal
        :url="urlEditModal"
        :editsValue="editCommentData"
        :isOpen="isEditModal"
        @mutate="mutateFunc"
        @close="handleEditModalClose"
      >
        <template #default>
          <h3 class="text-2xl font-bold mb-3">ویرایش کامنت</h3>
          <div
            class="child:w-[400px] child:h-[200px] child:py-3 child:px-5 child:rounded-xl child:outline-none child:bg-[#f0f0f0]"
          >
            <textarea v-model="editCommentData.body" placeholder="کامنت را ویرایش کنید"></textarea>
          </div>
        </template>
      </EditModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FetchApis from '@/api/Fetchapi'

import TablePanel from '@/components/TablePanel.vue'
import DetailModal from '@/components/Modal/DetailModal.vue'
import EditModal from '@/components/Modal/EditModal/EditModal.vue'
import NothingDiv from '@/components/NothingDiv.vue'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import type { CommentInfo } from './type' 

import Swal from 'sweetalert2'

const tableHeaders = ref<string[]>(['اسم کاربر', 'محصول', 'کامنت', 'تاریخ', 'ساعت'])
const comments = ref<CommentInfo[]>([])
const isCommentOpen = ref<boolean>(false)
const isEditModal = ref<boolean>(false)
const commentBody = ref<string>('')
const urlEditModal = 'http://localhost:8000/api/comments/'

const editCommentData = ref<CommentInfo>({
  id: null,
  productID: '',
  userID: '',
  body: '',
  date: '',
  hour: '',
  isAccept: null
})

const route = useRoute()

onMounted(async () => {
  comments.value = await FetchApis(route)
})

const showComment = (comment: string) => {
  isCommentOpen.value = true
  commentBody.value = comment
}

const editComment = (comment: CommentInfo) => {
  isEditModal.value = true
  editCommentData.value = { ...comment }
}

const handleEditModalClose = async () => {
  isEditModal.value = false
  await FetchApis(route)
}
const mutateFunc = (updatedComment: CommentInfo) => {
  const index = comments.value.findIndex((comment) => comment.id === updatedComment.id)
  if (index !== -1) {
    comments.value[index] = { ...updatedComment }
  } else {
    comments.value.push(updatedComment)
  }
}

const acceptComment = async (id: number | null) => {
  if (id === null) return

  try {
    const response = await fetch(`http://localhost:8000/api/comments/accept/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error('Network response was not ok')
    await FetchApis(route)
    Swal.fire({
      title: 'کامنت تایید شد',
      icon: 'success',
      confirmButtonText: 'تایید'
    })
  } catch (error) {
    console.error('Error accepting comment:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در تایید کامنت',
      icon: 'error'
    })
  }
}

const rejectComment = async (id: number | null) => {
  if (id === null) return

  try {
    const response = await fetch(`http://localhost:8000/api/comments/reject/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error('Network response was not ok')
    await FetchApis(route)
    Swal.fire({
      title: 'کامنت رد شد',
      icon: 'success',
      confirmButtonText: 'تایید'
    })
  } catch (error) {
    console.error('Error rejecting comment:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در رد کامنت',
      icon: 'error'
    })
  }
}
</script>

<style>
</style>
