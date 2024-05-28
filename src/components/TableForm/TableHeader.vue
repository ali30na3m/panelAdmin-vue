<template>
    <th>{{ props.label }}</th>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps<{
    label: string
  }>()
  </script>
  
  <style scoped>
  </style>
  