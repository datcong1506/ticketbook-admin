<template>
  <div class="w-full p-4 bg-white rounded-lg flex justify-center">
    <a-form class="w-[600px]" layout="vertical" :model="formRoom">
      <a-form-item
        label="Cinema"
        name="cinemaId"
      >
        <a-select
          v-model:value="formRoom.cinemaId"
          placeholder="Select own cinema"
          allow-clear
        >
          <template v-for="c of cinemaList" :key="c._id">
            <a-select-option :value="c._id">
              {{ c.name }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item label="Enable">
        <a-switch v-model:checked="formRoom.available" disabled />
      </a-form-item>
      <a-form-item
        label="Name room"
        name="name"
      >
        <a-input v-model:value="formRoom.name" />
      </a-form-item>
      <div class="flex flex-col gap-2">
        <div>List seat</div>
        <div class="flex flex-col">
          <template v-for="s, index of formRoom.seats" :key="s.key">
            <div class="flex flex-row gap-2 mb-4">
              <div class="flex-1 flex flex-row gap-4">
                <div class="w-1/2">
                  <a-input v-model:value="s.name" placeholder="Please input name seat" />
                </div>
                <div class="flex-1">
                  <a-select v-model:value="s.type" class="w-full" placeholder="Please select type seat">
                    <a-select-option value="VIP">
                      VIP
                    </a-select-option>
                    <a-select-option value="Regular">
                      Regular
                    </a-select-option>
                  </a-select>
                </div>
              </div>
              <div class="icon">
                <component :is="index === formRoom.seats.length - 1 ? AddIcon : CloseIcon" style="width: 32px; height: 32px;" @click="index === formRoom.seats.length - 1 ? onAddSeat() : onDeleteSeat(index)" />
              </div>
            </div>
          </template>
        </div>
        <a-button class="mt-5 w-[100px]" type="primary" @click="createRoom()">
          Create
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import cinemaApi from '@/api/cinema'
import projectionApi from '@/api/projection'
import AddIcon from '@assets/add.svg?component'
import CloseIcon from '@assets/close.svg?component'
import { notification } from 'ant-design-vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

let key = 0
const cinemaList = ref<any[]>([])
const formRoom = ref({
  cinemaId: '',
  name: '',
  seats: [{ key: -1, name: '', type: 'VIP' }],
  available: true,
})

function onAddSeat() {
  formRoom.value.seats = [...formRoom.value.seats, { name: '', type: 'VIP', key: key++ }]
}

function onDeleteSeat(index: number) {
  formRoom.value.seats.splice(index, 1)
}

async function fetchCinema() {
  try {
    const res = await cinemaApi.getAll<any[]>()
    cinemaList.value = res.data
  } catch (error) {
  }
}

async function createRoom() {
  const { cinemaId, name, seats, available } = formRoom.value

  if (!cinemaId || !name || seats.some(s => !s.name || !s.type)) {
    notification.error({
      duration: 0.5,
      message: 'Please input all field',
    })
    return
  }

  try {
    await projectionApi.create({
      cinemaId,
      name,
      available,
      seats: seats.map((i) => {
        return { name: i.name, type: i.type }
      }),
    })

    router.push({ name: 'room' })
  } catch (error) {
  }
}

onBeforeMount(async () => {
  await fetchCinema()
})
</script>

<style lang="scss" scoped>
.icon {
    cursor: pointer;
    border-radius: 100%;
    overflow: hidden;
}
.icon:hover {
    background-color: rgb(168, 167, 167);
    svg {
        stroke: white;
    }
}
</style>
