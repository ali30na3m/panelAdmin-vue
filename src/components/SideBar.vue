<template>
  <div class="fixed top-0 right-0 bottom-0 py-3 px-3 bg-pinkSecondary text-white">
    <h2 class="">به پنل ادمین خوش آمدید</h2>
    <span class="block h-[1px] bg-white my-3"></span>
    <div
      class="flex flex-col gap-2 text-right child:flex child:items-center child:gap-2 child:p-2 child:px-1 child:rounded-lg child: hover:child:bg-purpleSecondary"
    >
      <router-link to="/" active-class="active-link">
        <HomeOutlined />
        خانه
      </router-link>
      <router-link to="/products" active-class="active-link">
        <HomeOutlined />
        محصولات
      </router-link>
      <router-link to="/comments" active-class="active-link">
        <HomeOutlined />
        کامنت‌ها
      </router-link>
      <router-link to="/users" active-class="active-link">
        <HomeOutlined />
        کاربران
      </router-link>
      <router-link to="/orders" active-class="active-link">
        <HomeOutlined />
        سفارشات
      </router-link>
      <router-link to="/offs" active-class="active-link">
        <HomeOutlined />
        تخفیفات
      </router-link>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { HomeOutlined } from '@ant-design/icons-vue'
</script>
  
  <style scoped>
.active-link {
  background-color: #391588;
}
</style>
  