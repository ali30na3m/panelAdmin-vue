<template>
  <div>
    <Sidebar />
    <TopBar />
    <div>
      <router-view class="mt-20 mr-44 px-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import Sidebar from '@/components/SideBar.vue';


</script>

<style>

</style>
