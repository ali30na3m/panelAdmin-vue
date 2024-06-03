import { ref } from "vue"
import type { ProductInfo } from "./type"

export const form = ref<ProductInfo>({
  id: null,
  title: '',
  price: null,
  count: null,
  img: '',
  popularity: null,
  sale: null,
  colors: null
})

export const editForm = ref<ProductInfo>({
  id: null,
  title: '',
  price: null,
  count: null,
  img: '',
  popularity: null,
  sale: null,
  colors: null
})
