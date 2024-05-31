import axios from 'axios';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';

const FetchApis = async () => {
    
    const route = useRoute()
    const params = route.fullPath

  try {
    const response = await axios.get(`http://localhost:8000/api${params}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    Swal.fire({
      title: 'خطا',
      text: 'خطا در بارگیری',
      icon: 'error'
    });
    return [];
  }
};

export default FetchApis;
