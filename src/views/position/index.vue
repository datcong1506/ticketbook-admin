<template>
  <div class="w-full p-4 bg-white rounded-lg">
    <div class="flex justify-end mb-4">
      <a-button type="primary" @click="openCreateCinema = true">
        Create cinema
      </a-button>
    </div>
    <a-table bordered :data-source="data" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.title === 'Logo'">
          <div class="w-[100px] h-[100px]">
            <img :src="value" alt="logo">
          </div>
        </template>
        <template v-if="column.title === 'Description'">
          <div class="whitespace-pre-line">
            {{ value }}
          </div>
        </template>
        <template v-if="column.title === 'Action'">
          <div class="flex gap-3">
            <a-button @click="onEditCinema(record._id)">
              Edit
            </a-button>
            <a-button danger @click="onDeleteCinema(record._id)">
              Delete
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <ModalCreateCinema v-model="openCreateCinema" @create-success="fetchData" />
  <DeleteConfirm v-model="openDeleteCinema" @delete="deleteCinema" />
</template>

<script lang="ts" setup>
import cinemaApi from '@/api/cinema'
import ModalCreateCinema from '@/components/position/ModalCreateCinema.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const data = ref<any[]>([])
const openCreateCinema = ref(false)

const columns = [
  {
    title: 'Logo',
    dataIndex: 'logo',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Location',
    dataIndex: 'location',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Action',
  },
]

async function fetchData() {
  try {
    const res = await cinemaApi.getAll<any[]>()
    data.value = res.data
  } catch (error) {
  }
}

onBeforeMount(async () => {
  await fetchData()
})

function onEditCinema(id: string): void {
  router.push(`edit-cinema/${id}`)
}

const openDeleteCinema = ref(false)
const deleteId = ref<string | null>(null)
function onDeleteCinema(id: string): void {
  deleteId.value = id
  openDeleteCinema.value = true
}
async function deleteCinema() {
  try {
    if (deleteId.value) {
      await cinemaApi.delete(deleteId.value)
      deleteId.value = null
      await fetchData()
    }
  } catch (_) {
  }
}
</script>

<style>

</style>
