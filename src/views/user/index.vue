<template>
  <div class="w-full p-4 bg-white rounded-lg">
    <div class="flex justify-end mb-4">
      <a-button type="primary" @click="$router.push({ name: 'create-user' })">
        Create user
      </a-button>
    </div>
    <a-table bordered :data-source="data" :columns="columns" :pagination="false">
      <!-- <template #bodyCell="{ column, value, record }" /> -->
    </a-table>
  </div>
</template>

<script setup lang="ts">
import adminAPI from '@/api/admin'
import { onBeforeMount, ref } from 'vue'

const data = ref<any>([])
const columns: any[] = [
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
]

async function getUser() {
  try {
    const res = await adminAPI.getAllUser<any[]>()
    data.value = res.data
  } catch (error) {
    data.value = []
  }
}

onBeforeMount(async () => {
  await getUser()
})
</script>

<style lang="scss">
</style>
