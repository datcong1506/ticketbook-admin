<template>
  <div class="w-full p-4 bg-white rounded-lg">
    <div>Film: {{ schedule?.film?.title }}</div>
    <div>Room: {{ schedule?.room?.name }}</div>
    <div>Cinema: {{ schedule?.room?.cinema?.name }} - {{ schedule?.room?.cinema?.location }}</div>
    <div class="mb-5">
      Time: {{ dayjs(schedule?.time).format('HH:mm DD/MM/YYYY') }}
    </div>
    <a-table bordered :data-source="data" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.title === 'User name'">
          {{ record?.user?.name }}
        </template>
        <template v-if="column.title === 'Seat name'">
          {{ record?.seat }}
        </template>
        <template v-if="column.title === 'Time'">
          <div v-if="record?.state === 1">
            Buy at: {{ dayjs(record?.buyAt).format('HH:mm DD/MM/YYYY') }}
          </div>
          <div v-if="record?.state === 4">
            Reject at: {{ dayjs(record?.rejectAt).format('HH:mm DD/MM/YYYY') }}
          </div>
          <div v-if="record?.state === 2">
            Purchased at: {{ dayjs(record?.purchasedAt).format('HH:mm DD/MM/YYYY') }}
          </div>
        </template>
        <template v-if="column.title === 'Action'">
          <div class="flex gap-3">
            <a-button v-if="record?.state === 1" @click="onCheckin(record._id)">
              Check in
            </a-button>
            <div v-if="record?.state === 2">
              Done
            </div>
            <div v-if="record?.state === 4">
              Rejected
            </div>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import adminAPI from '@/api/admin'
import scheduleApi from '@/api/schedule'
import dayjs from 'dayjs'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = ref<any[]>([])
const schedule = ref<any>()
const columns: any[] = [
  {
    title: 'User name',
  },
  {
    title: 'Seat name',
  },
  {
    title: 'Time',
  },
  {
    title: 'Action',
  },
]

async function getTicket() {
  try {
    const res = await adminAPI.getTicket<any[]>(route.params.id as string)
    data.value = res.data
  } catch (error) {
    data.value = []
  }
}

async function getSchedule() {
  try {
    const res = await scheduleApi.getSchedule<any[]>(route.params.id as string)
    schedule.value = res.data
  } catch (error) {
    schedule.value = []
  }
}

async function onCheckin(id: string) {
  try {
    await adminAPI.doneTicket<any[]>(id)
    await getTicket()
  } catch (error) {
  }
}

onBeforeMount(async () => {
  await getTicket()
  await getSchedule()
})
</script>

<style lang="scss">
</style>
