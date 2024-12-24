<template>
  <div class="w-full p-4 bg-white rounded-lg">
    <div class="flex justify-end mb-4">
      <a-button type="primary" @click="$router.push({ name: 'create-schedule' })">
        Create schedule
      </a-button>
    </div>
    <a-table bordered :data-source="data" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.title === 'Film'">
          <div class="flex gap-2">
            <img class="w-[100px]" :src="value.thumb" alt="">
            <div>{{ value.title }}</div>
          </div>
        </template>
        <template v-if="column.title === 'Room'">
          {{ value.cinema.name }} - {{ value.cinema.location }}. Room {{ value.name }}
        </template>
        <template v-if="column.title === 'Price'">
          <div>VIP: {{ record.vipPrice }}VND</div>
          <div>Regular: {{ record.regularPrice }}VND</div>
        </template>
        <template v-if="column.title === 'Time'">
          {{ dayjs(value).format('HH:mm DD/MM/YYYY') }}
        </template>
        <template v-if="column.title === 'Action'">
          <div class="flex gap-3">
            <a-button @click="$router.push(`ticket-schedule/${record._id}`)">
              Show ticket
            </a-button>
            <a-button danger @click="onDeleteSchedule(record._id)">
              Delete
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <DeleteConfirm v-model="openDeleteSchedule" @delete="deleteSchedule" />
</template>

<script lang="ts" setup>
import scheduleApi from '@/api/schedule'
import DeleteConfirm from '@/components/common/DeleteConfirm.vue'
import dayjs from 'dayjs'
import { onBeforeMount, ref } from 'vue'

const columns = [
  {
    title: 'Film',
    dataIndex: 'film',
  },
  {
    title: 'Room',
    dataIndex: 'room',
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Price',
  },
  {
    title: 'Action',
  },
]

const data = ref<any[]>([])

async function getSchedule() {
  try {
    const res = await scheduleApi.getAll<any[]>()
    data.value = res.data
  } catch (error) {
    data.value = []
  }
}

const openDeleteSchedule = ref(false)
const deleteId = ref<string | null>(null)
function onDeleteSchedule(id: string) {
  deleteId.value = id
  openDeleteSchedule.value = true
}

async function deleteSchedule() {
  try {
    if (deleteId.value) {
      await scheduleApi.delete(deleteId.value)
      deleteId.value = null
      await getSchedule()
    }
  } catch (_) {
  }
}

onBeforeMount(async () => {
  await getSchedule()
})
</script>

<style>

</style>
