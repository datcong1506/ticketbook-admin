<template>
  <div class="w-full p-4 bg-white rounded-lg">
    <div class="flex justify-between mb-4">
      <a-select
        v-model:value="cinemaSelect"
        style="width: 200px"
        placeholder="Select cinema filter"
        allow-clear
      >
        <template v-for="c of cinemaList" :key="c._id">
          <a-select-option :value="c._id">
            {{ c.name }}
          </a-select-option>
        </template>
      </a-select>
      <a-button type="primary" @click="$router.push({ name: 'create-room' })">
        Create room
      </a-button>
    </div>
    <a-table bordered :data-source="data" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.title === 'Cinema'">
          <div>{{ cinemaList.find(c => c._id === value)?.name }} - {{ cinemaList.find(c => c._id === value)?.location }}</div>
        </template>
        <template v-if="column.title === 'Status'">
          <a-tag v-if="value" color="success">
            Active
          </a-tag>
          <a-tag v-if="!value" color="error">
            Disable
          </a-tag>
        </template>
        <template v-if="column.title === 'Number of seats'">
          {{ value.length }} seats
        </template>
        <template v-if="column.title === 'Action'">
          <div class="flex gap-3">
            <a-button>
              Edit
            </a-button>
            <a-button danger @click="onDeleteRoom(record._id)">
              Delete
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <DeleteConfirm v-model="openDeleteRoom" @delete="deleteCinema" />
</template>

<script lang="ts" setup>
import cinemaApi from '@/api/cinema'
import projectionApi from '@/api/projection'
import DeleteConfirm from '@/components/common/DeleteConfirm.vue'
import { onBeforeMount, ref, watch } from 'vue'

const columns = [
  {
    title: 'Cinema',
    dataIndex: 'cinema',
  },
  {
    title: 'Name room',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'available',
  },
  {
    title: 'Number of seats',
    dataIndex: 'seats',
  },
  {
    title: 'Action',
  },
]

const cinemaList = ref<any[]>([])
const cinemaSelect = ref<string | undefined>(undefined)
const data = ref<any[]>([])

watch(cinemaSelect, async (value) => {
  await fetchData(value ? [value] : [])
})

async function fetchData(ids_cinema?: string[]) {
  try {
    const res = await projectionApi.getAll<any[]>(ids_cinema)
    data.value = res.data
  } catch (error) {
  }
}

async function fetchCinema() {
  try {
    const res = await cinemaApi.getAll<any[]>()
    cinemaList.value = res.data
  } catch (error) {
  }
}

onBeforeMount(async () => {
  await fetchCinema()
  await fetchData()
})

const openDeleteRoom = ref(false)
const deleteId = ref<string | null>(null)
function onDeleteRoom(id: string): void {
  deleteId.value = id
  openDeleteRoom.value = true
}

async function deleteCinema() {
  try {
    if (deleteId.value) {
      await projectionApi.delete(deleteId.value)
      deleteId.value = null
      await fetchData(cinemaSelect.value ? [cinemaSelect.value] : [])
    }
  } catch (_) {
  }
}
</script>

<style lang="scss" scoped>

</style>
