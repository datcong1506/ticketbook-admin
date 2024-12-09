<template>
  <div class="w-full p-4 bg-white rounded-lg flex justify-center">
    <a-form class="w-[600px]" layout="vertical">
      <a-form-item
        label="Film"
        required
      >
        <a-select
          v-model:value="formSchedule.film"
          placeholder="Please select film"
          allow-clear
        >
          <template v-for="f of films" :key="f._id">
            <a-select-option :value="f._id">
              {{ f.title }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Cinema"
        required
      >
        <a-select
          v-model:value="cinema"
          placeholder="Please select cinema"
          allow-clear
        >
          <template v-for="c of cinemas" :key="c._id">
            <a-select-option :value="c._id">
              {{ c.name }} - {{ c.location }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Room"
        required
      >
        <a-select
          v-model:value="formSchedule.room"
          placeholder="Please select room"
          allow-clear
        >
          <template v-for="r of rooms" :key="r._id">
            <a-select-option :value="r._id">
              {{ r.name }} - {{ r.seats.length }} seats
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Time"
        required
      >
        <a-date-picker
          v-model:value="formSchedule.time"
          format="YYYY-MM-DD HH:mm:ss"
          :disabled-date="disabledDate"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
        />
      </a-form-item>
      <a-form-item
        label="VIP Price"
        required
      >
        <a-input-number v-model:value="formSchedule.vipPrice" :min="0" />
      </a-form-item>
      <a-form-item
        label="Regular Price"
        required
      >
        <a-input-number v-model:value="formSchedule.regularPrice" :min="0" />
      </a-form-item>
      <a-button class="mt-5 w-[100px]" type="primary" @click="createSchedule()">
        Create
      </a-button>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import cinemaApi from '@/api/cinema'
import filmApi from '@/api/film'
import projectionApi from '@/api/projection'
import scheduleApi from '@/api/schedule'
import { notification } from 'ant-design-vue'
import dayjs from 'dayjs'
import { onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formSchedule = ref<any>({
  film: undefined,
  room: undefined,
  time: undefined,
  vipPrice: 0,
  regularPrice: 0,
})

const cinema = ref<string | undefined>(undefined)

const films = ref<any[]>([])
const cinemas = ref<any[]>([])
const rooms = ref<any[]>([])

watch(cinema, async (v) => {
  formSchedule.value.room = undefined
  if (!v) {
    rooms.value = []
    return
  }
  await getRooms()
})

function disabledDate(current: Dayjs) {
  return current && current <= dayjs().startOf('day')
}

async function getRooms() {
  try {
    const res = await projectionApi.getAll<any[]>([cinema.value!])

    rooms.value = res.data
  } catch (error) {
  }
}

async function getFilms() {
  try {
    const res = await filmApi.getAll<any[]>()
    films.value = res.data
  } catch (error) {
  }
}

async function getCinemas() {
  try {
    const res = await cinemaApi.getAll<any[]>()
    cinemas.value = res.data
  } catch (error) {
  }
}

async function createSchedule() {
  const { film, room, time } = formSchedule.value

  if (!film || !room || !time) {
    notification.error({
      duration: 0.5,
      message: 'Please input all field',
    })
    return
  }

  try {
    await scheduleApi.create(formSchedule.value)

    router.push({ name: 'schedule' })
  } catch (error) {

  }
}

onBeforeMount(async () => {
  await getFilms()
  await getCinemas()
})
</script>

<style lang="">

</style>
