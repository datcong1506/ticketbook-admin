<template>
  <div class="w-full p-4 bg-white rounded-lg">
    <div class="flex justify-end mb-4">
      <a-button type="primary" @click="$router.push({ name: 'create-schedule' })">
        Create schedule
      </a-button>
    </div>
    <a-table bordered :pagination="false" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style>

</style>
