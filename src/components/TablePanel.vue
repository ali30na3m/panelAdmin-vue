<template>
  <table>
    <thead>
      <tr>
        <TableHeader
          class="px-14"
          v-for="(header, index) in headers"
          :key="index"
          :label="header"
        />
      </tr>
    </thead>
    <tbody>
      <slot name="default" />
    </tbody>
  </table>
</template>

<script  lang="ts" setup>
import TableHeader from '@/components/TableForm/TableHeader.vue'

defineProps<{
  headers: string[]
}>()
</script>

<style>
</style>
