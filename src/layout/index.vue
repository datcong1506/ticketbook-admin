<template>
  <div class="w-full h-full flex">
    <Sidebar />
    <div class="flex flex-grow flex-col">
      <Header />
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from './header.vue'
import Sidebar from './sidebar.vue'
</script>

<style scoped lang="scss"></style>
