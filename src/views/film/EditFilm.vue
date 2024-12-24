<template>
  <div class="w-full p-4 bg-white rounded-lg flex justify-center">
    <a-form class="w-[600px]" layout="vertical">
      <a-form-item
        label="Title film"
        required
      >
        <a-input v-model:value="formFilm.title" placeholder="Please input title film" />
      </a-form-item>

      <a-form-item
        label="Genre"
        required
      >
        <a-select
          v-model:value="formFilm.genre"
          placeholder="Select film genre"
          allow-clear
          mode="multiple"
        >
          <template v-for="c of genreList" :key="c">
            <a-select-option :value="c">
              {{ c }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>

      <a-form-item label="Description" required>
        <a-textarea v-model:value="formFilm.shortDescription" placeholder="Please input description film" :auto-size="{ minRows: 4, maxRows: 10 }" />
      </a-form-item>

      <div class="flex gap-8">
        <div class="w-1/2">
          <a-form-item label="Duration" required>
            <div class="flex gap-2 items-center">
              <a-input-number v-model:value="time.hours" :min="0" :max="10" />
              <div class="flex items-center">
                hours
              </div>
              <a-input-number v-model:value="time.minutes" :min="0" :max="59" />
              <div class="flex items-center">
                minutes
              </div>
              <a-input-number v-model:value="time.seconds" :min="0" :max="59" />
              <div class="flex items-center">
                seconds
              </div>
            </div>
          </a-form-item>
        </div>
        <div class="flex-grow">
          <a-form-item label="Release date" required>
            <a-date-picker v-model:value="formFilm.releaseDate" class="w-full" placeholder="Please select release date film" />
          </a-form-item>
        </div>
      </div>

      <a-form-item label="Actors" required>
        <template v-for="_a, index of formFilm.actors" :key="`${index}`">
          <div class="flex flex-row gap-2 mb-4">
            <div class="flex-1 flex flex-row gap-4">
              <a-input v-model:value="formFilm.actors[index]" placeholder="Please input name actor" />
            </div>
            <div class="icon">
              <component :is="index === formFilm.actors.length - 1 ? AddIcon : CloseIcon" style="width: 32px; height: 32px;" @click="index === formFilm.actors.length - 1 ? onAddActor() : onDeleteActor(index)" />
            </div>
          </div>
        </template>
      </a-form-item>

      <a-form-item label="Thumbnail (recommend 1280x720)" required>
        <a-radio-group v-model:value="typeThumb" class="mb-4">
          <a-radio value="url">
            URL
          </a-radio>
          <a-radio value="upload">
            Upload
          </a-radio>
        </a-radio-group>
        <a-input v-if="typeThumb === 'url'" v-model:value="formFilm.thumb" placeholder="Please input thumbnail url film" />
        <div v-if="typeThumb === 'upload'" class="w-[592px] h-[333px]">
          <FileInput v-model:file="formFilm.thumb" />
        </div>
      </a-form-item>

      <a-form-item label="Trailer url">
        <a-input v-model:value="formFilm.trailer" placeholder="Please input trailer film" />
      </a-form-item>

      <a-button class="mt-5 w-[100px]" type="primary" @click="updateFilm()">
        Update
      </a-button>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { TFormFilm } from '@/api/film'
import filmApi from '@/api/film'
import FileInput from '@/components/common/FileInput.vue'
import AddIcon from '@assets/add.svg?component'
import CloseIcon from '@assets/close.svg?component'
import { notification } from 'ant-design-vue'
import dayjs from 'dayjs'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const genreList = ['Hành động', 'Kinh dị', 'Viễn tưởng', 'Lãng mạn', 'Hài hước', 'Phiêu lưu', 'Thần thoại', 'Hoạt hình', 'Tài liệu', 'Kịch tính', 'Chiến tranh', 'Thể thao', 'Nhạc kịch']
const router = useRouter()
const route = useRoute()
const formFilm = ref<TFormFilm>({
  title: '',
  genre: undefined,
  shortDescription: '',
  actors: [''],
  duration: 0,
  releaseDate: undefined,
  thumb: '',
  trailer: '',
})
const typeThumb = ref('url')

const time = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
})

watch(typeThumb, () => {
  formFilm.value.thumb = ''
})

watch(time.value, ({ hours, minutes, seconds }) => {
  formFilm.value.duration = hours * 60 * 60 + minutes * 60 + seconds
})

function onAddActor() {
  formFilm.value.actors.push('')
}

function onDeleteActor(index: number) {
  formFilm.value.actors.splice(index, 1)
}

async function getFilm() {
  try {
    const res = await filmApi.getOne<any>(route.params.id as string)
    formFilm.value = {
      title: res.data.title,
      genre: res.data.genre,
      shortDescription: res.data.shortDescription,
      actors: res.data.actors,
      duration: res.data.duration,
      releaseDate: dayjs(res.data.releaseDate),
      thumb: res.data.thumb,
      trailer: res.data.trailer,
    }

    time.value.hours = Math.floor(res.data.duration / 3600)
    time.value.minutes = Math.floor((res.data.duration - time.value.hours * 3600) / 60)
    time.value.seconds = res.data.duration - time.value.hours * 3600 - time.value.minutes * 60
  } catch (_) {
  }
}

onBeforeMount(async () => {
  await getFilm()
})

async function updateFilm() {
  const { title, genre, shortDescription, actors, duration, releaseDate, thumb } = formFilm.value

  if (!title || !genre || actors.some(a => !a) || !duration || !shortDescription || !releaseDate || !thumb) {
    notification.error({
      duration: 0.5,
      message: 'Please input all field',
    })
    return
  }

  try {
    await filmApi.updateOne(route.params.id as string, {
      ...formFilm.value,
    })

    router.push({ name: 'film' })
  } catch (error) {
  }
}
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

  .logo-field {
    width: 160px;
  }
  </style>
