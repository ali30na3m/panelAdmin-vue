<template>
  <div class="fixed top-0 right-0 bottom-0 py-3 px-3 bg-pinkSecondary text-white">
    <h2 class="">به پنل ادمین خوش آمدید</h2>
    <span class="block h-[1px] bg-white my-3"></span>
    <div class="flex flex-col gap-2 text-right">
      <router-link
        v-for="router in filteredRoutes"
        :key="router.name"
        :to="router.path"
        class="flex items-center gap-2 p-2 px-1 rounded-lg hover:bg-purpleSecondary"
        active-class="active-link"
      >
        {{ router.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routes } from '@/router/index';
import { computed } from 'vue';

const filteredRoutes = computed(() => {
  return routes.filter(route => route.meta.isSideBar);
});

</script>

<style scoped>
.active-link {
  background-color: #391588;
}
</style>
