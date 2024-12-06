<template>
  <div class="w-full p-4 bg-white rounded-lg">
    <div class="flex justify-end mb-4">
      <a-button type="primary" @click="$router.push({ name: 'create-film' })">
        Create film
      </a-button>
    </div>
    <a-table :data-source="data" :columns="columns" bordered :pagination="false">
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.title === 'Thumbnail'">
          <div>
            <img :src="value">
          </div>
        </template>
        <template v-if="column.title === 'Duration'">
          <div>
            {{ value / 60 }} minutes
          </div>
        </template>
        <template v-if="column.title === 'Release'">
          <div>
            {{ moment(value).format('DD/MM/YYYY') }}
          </div>
        </template>
        <template v-if="column.title === 'Actors'">
          <div v-for="a, index in value" :key="a + index">
            {{ a }}, {{ index === value.length - 1 ? '...' : '' }}
          </div>
        </template>
        <template v-if="column.title === 'Action'">
          <div class="flex gap-3">
            <a-button>Schedule film</a-button>
            <a-button>
              Edit
            </a-button>
            <a-button danger @click="onDeleteFilm(record._id)">
              Delete
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <DeleteConfirm v-model="openDeleteFilm" @delete="deleteFilm" />
</template>

<script lang="ts" setup>
import filmApi from '@/api/film'
import DeleteConfirm from '@/components/common/DeleteConfirm.vue'
import moment from 'moment'
import { onBeforeMount, ref } from 'vue'

const columns = [
  {
    title: 'Film title',
    dataIndex: 'title',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
  },
  {
    title: 'Description',
    dataIndex: 'shortDescription',
    width: 500,
  },
  {
    title: 'Release',
    dataIndex: 'releaseDate',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumb',
    width: 200,
  },
  {
    title: 'Actors',
    dataIndex: 'actors',
  },
  {
    title: 'Action',
  },
]

const data = ref<any[]>([])

async function fetchData() {
  try {
    const res = await filmApi.getAll<any[]>()
    data.value = res.data
  } catch (error) {
  }
}

onBeforeMount(async () => {
  await fetchData()
})

const openDeleteFilm = ref(false)
const deleteId = ref<string | null>(null)

function onDeleteFilm(id: string): void {
  deleteId.value = id
  openDeleteFilm.value = true
}

async function deleteFilm() {
  try {
    if (deleteId.value) {
      await filmApi.delete(deleteId.value)
      deleteId.value = null
      await fetchData()
    }
  } catch (_) {
  }
}
</script>

<style>

</style>
