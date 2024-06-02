import axios from 'axios'
import Swal from 'sweetalert2'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const fetchApis = async (route: RouteLocationNormalizedLoaded) => {
  const endpoint = `http://localhost:8000/api${route.path}/`

  try {
    const response = await axios.get(endpoint)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    Swal.fire({
      title: 'خطا',
      text: 'خطا در بارگیری داده‌ها',
      icon: 'error'
    })
    return []
  }
}

export default fetchApis
