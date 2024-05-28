<template>
  <div>
    <h2 class="text-3xl font-extrabold">افزودن محصول جدید</h2>
    <div class="mt-5 py-5 px-7 bg-white">
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
    <div class="bg-white mt-9 py-4 px-5">
      <TablePanel v-if="products.length" :headers="tableHeaders">
        <template #default>
          <tr v-for="(product, index) in products" :key="index" class="child:px-16">
            <td><img class="w-36 h-36" :src="product.img" alt="img" /></td>
            <td>{{ product.title }}</td>
            <td>{{ product.price?.toLocaleString() }}</td>
            <td>{{ product.count }}</td>
            <td class="text-white child:py-2 child:px-3 child:bg-pinkSecondary child:rounded-lg">
              <button @click="detailHandler(product)">جزییات</button>
              <button @click="deleteProduct(product.id)" class="mr-3">حذف</button>
              <button @click="editHandler(product)" class="mr-3">ویرایش</button>
            </td>
          </tr>
        </template>
      </TablePanel>
      <NothingDiv v-else />
    </div>

    <ModalPanel :isOpen="isModalDetailOpen" @close="isModalDetailOpen = false">
      <h3 class="text-2xl font-bold">جزئیات محصول</h3>
      <p>محبوبیت: {{ selectedProduct?.popularity }}</p>
      <p>تعداد رنگ: {{ selectedProduct?.colors }}</p>
      <p v-if="selectedProduct">مجموع فروش: {{ selectedProduct.sale?.toLocaleString() }}</p>
    </ModalPanel>

    <ModalPanel :isOpen="isEditHandlerOpen" @close="isEditHandlerOpen = false">
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
        <input v-model.number="editForm.sale" type="text" placeholder="میزان فروش محصول را بنویسید" />
        <input
          v-model.number="editForm.colors"
          type="text"
          placeholder="تعداد رنگ بندی محصول را بنویسید"
        />
      </div>
    </ModalPanel>
  </div>
</template>

<script lang="ts" setup>
import NothingDiv from '../components/NothingDiv.vue'
import TablePanel from '../components/TablePanel.vue'
import ModalPanel from '../components/ModalPanel.vue'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'

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
const isEditHandlerOpen = ref<boolean>(false)
const selectedProduct = ref<ProductInfo | null>(null)

onMounted(() => {
  fetchProducts()
})

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/products/')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در بارگیری محصولات',
      icon: 'error'
    })
  }
}

const submitProduct = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    if (!response.ok) throw new Error('Network response was not ok')
    const newProduct = await response.json()
    products.value.push(newProduct)
    Swal.fire({
      title: 'عملیات موفق آمیز بود',
      icon: 'success'
    })
    resetForm()
  } catch (error) {
    console.error('Error submitting product:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در ثبت محصول',
      icon: 'error'
    })
    resetForm()
  }
}

const deleteProduct = (id: number) => {
  Swal.fire({
    title: 'آیا مطئمن به حذف هستید',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  }).then((resault) => {
    if (resault.value) {
      console.log(resault.value)
      console.log(id)
      try {
        fetch(`http://localhost:8000/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          Swal.fire({
            title: 'عملیات موفق آمیز بود',
            icon: 'success',
            confirmButtonText: 'تایید'
          }).then(() => fetchProducts())
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
  })
}

const detailHandler = (product: ProductInfo) => {
  selectedProduct.value = product
  isModalDetailOpen.value = true
}

const editHandler = (product: ProductInfo) => {
  isEditHandlerOpen.value = true
  editForm.value = {
    title : product.title,
    img: product.img,
    count : product.count,
    colors: product.colors,
    popularity:product.popularity,
    price:product.price,
    sale:product.sale
  }
}

const resetForm = () => {
  form.value = {
    id: 0,
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

<style >
</style>
