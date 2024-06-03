<template>
  <div>
    <h2 class="text-3xl font-extrabold">افزودن محصول جدید</h2>
    <div class="mt-5 py-5 px-7 bg-white rounded-xl">
      <div
        class="grid grid-cols-2 gap-5 child:py-3 child:px-5 child:rounded-xl child:outline-none child:bg-[#f0f0f0]"
      >
        <input v-model="form.title" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model.number="form.price" type="text" placeholder="قیمت محصول را بنویسید" />
        <input v-model.number="form.count" type="text" placeholder="موجودی محصول را بنویسید" />
        <input v-model="form.img" type="text" placeholder="آدرس محصول را بنویسید" />
        <input
          v-model.number="form.popularity"
          type="text"
          placeholder="میزان محبوبیت محصول را بنویسید"
        />
        <input v-model.number="form.sale" type="text" placeholder="میزان فروش محصول را بنویسید" />
        <input
          v-model.number="form.colors"
          type="text"
          placeholder="تعداد رنگ بندی محصول را بنویسید"
        />
      </div>
      <button
        @click.prevent="submitProduct"
        class="mt-4 bg-pinkSecondary py-2 px-3 rounded-xl text-white"
      >
        ثبت محصول
      </button>
    </div>
    <div class="bg-white mt-9 py-4 px-5 mb-4 rounded-xl">
      <TablePanel v-if="products.length" :headers="tableHeaders">
        <template #default>
          <tr
            v-for="(product, index) in products"
            :key="index"
            class="child:px-14 child:text-center"
          >
            <td><img class="w-36 h-36" :src="product.img" alt="img" /></td>
            <td>{{ product.title }}</td>
            <td>{{ product.price?.toLocaleString() }}</td>
            <td>{{ product.count }}</td>
            <td class="text-white child:py-2 child:px-3 child:bg-pinkSecondary child:rounded-lg">
              <button @click="detailHandler(product)">جزییات</button>
              <DeleteButton class="mr-3" @mutate="mutateDelete" :deleteID="product.id ?? null">حذف</DeleteButton>
              <button @click="editHandler(product)" class="mr-3">ویرایش</button>
            </td>
          </tr>
        </template>
      </TablePanel>
      <NothingDiv v-else />
    </div>

    <DetailModal :isOpen="isModalDetailOpen" @close="isModalDetailOpen = false">
      <h3 class="text-2xl font-bold text-center">جزئیات محصول</h3>
      <p>محبوبیت: {{ selectedProduct?.popularity }}</p>
      <p>تعداد رنگ: {{ selectedProduct?.colors }}</p>
      <p v-if="selectedProduct">مجموع فروش: {{ selectedProduct.sale?.toLocaleString() }}</p>
    </DetailModal>

    <EditModal
      url="products"
      :editsValue="editForm"
      :isOpen="isModalEditOpen"
      @mutate="mutateFunc"
      @close="handleEditModalClose"
    >
      <h3 class="text-2xl font-bold mb-3">ویرایش محصول</h3>
      <div
        class="grid grid-cols-2 gap-5 child:py-3 child:px-5 child:rounded-xl child:outline-none child:bg-[#f0f0f0]"
      >
        <input v-model="editForm.title" type="text" placeholder="اسم محصول را بنویسید" />
        <input v-model.number="editForm.price" type="text" placeholder="قیمت محصول را بنویسید" />
        <input v-model.number="editForm.count" type="text" placeholder="موجودی محصول را بنویسید" />
        <input v-model="editForm.img" type="text" placeholder="آدرس محصول را بنویسید" />
        <input
          v-model.number="editForm.popularity"
          type="text"
          placeholder="میزان محبوبیت محصول را بنویسید"
        />
        <input
          v-model.number="editForm.sale"
          type="text"
          placeholder="میزان فروش محصول را بنویسید"
        />
        <input
          v-model.number="editForm.colors"
          type="text"
          placeholder="تعداد رنگ بندی محصول را بنویسید"
        />
      </div>
    </EditModal>
  </div>
</template>

<script lang="ts" setup>
import NothingDiv from '@/components/NothingDiv.vue'
import TablePanel from '@/components/TablePanel.vue'
import DetailModal from '@/components/Modal/DetailModal.vue'
import EditModal from '@/components/Modal/EditModal/EditModal.vue'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import { getApi, postApi } from '@/api'
import type { ProductInfo } from './type'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'

const form = ref<ProductInfo>({
  id: null,
  title: '',
  price: null,
  count: null,
  img: '',
  popularity: null,
  sale: null,
  colors: null
})

const editForm = ref<ProductInfo>({
  id: null,
  title: '',
  price: null,
  count: null,
  img: '',
  popularity: null,
  sale: null,
  colors: null
})

const tableHeaders = ref<string[]>(['عکس', 'اسم', 'قیمت', 'موجودی'])
const products = ref<ProductInfo[]>([])
const isModalDetailOpen = ref<boolean>(false)
const selectedProduct = ref<ProductInfo | null>(null)
const isModalEditOpen = ref<boolean>(false)

const fetchProducts = async() => {
  await getApi('products').then(data => products.value = data)
}

onMounted(() => {
    fetchProducts()
})

const submitProduct = async () => {
  try {
    await postApi('products', form.value)
    Swal.fire({
      title: 'عملیات موفق آمیز بود',
      icon: 'success'
    }).then(() => {
      fetchProducts()
      resetForm()
    })
  } catch (error) {
    console.error('Error submitting product:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در ثبت محصول',
      icon: 'error'
    })
  }

}

const detailHandler = (product: ProductInfo) => {
  selectedProduct.value = product
  isModalDetailOpen.value = true
}

const editHandler = (product: ProductInfo) => {
  isModalEditOpen.value = true
  editForm.value = {
    ...editForm.value,
    id: product.id,
    title: product.title,
    img: product.img,
    count: product.count,
    colors: product.colors,
    popularity: product.popularity,
    price: product.price,
    sale: product.sale
  }
}

const mutateFunc = (updatedProduct : ProductInfo) => {
  const index = products.value.findIndex(product => product.id === updatedProduct.id)

  if (index !== -1){
    products.value[index] = updatedProduct
  }else{
    products.value.push(updatedProduct)
  }
}

const mutateDelete = () => {
  return fetchProducts()
}

const handleEditModalClose = async () => {
  isModalEditOpen.value = false
  await fetchProducts()
}

const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    price: null,
    count: null,
    img: '',
    popularity: null,
    sale: null,
    colors: null
  }
}
</script>

<style scoped>
</style>
