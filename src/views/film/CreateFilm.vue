<template>
  <div class="w-full p-4 bg-white rounded-lg flex justify-center">
    <a-form class="w-[600px]" layout="vertical">
      <a-form-item
        label="Title film"
        name="title"
      >
        <a-input v-model:value="formFilm.title" />
      </a-form-item>

      <a-form-item
        label="Genre"
        name="genre"
      >
        <a-select
          v-model:value="formFilm.genre"
          placeholder="Select film genre"
          allow-clear
        >
          <template v-for="c of genreList" :key="c">
            <a-select-option :value="c">
              {{ c }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const genreList = ['Hành động', 'Kinh dị', 'Viễn tưởng', 'Lãng mạn', 'Hài hước', 'Phiêu lưu', 'Thần thoại', 'Hoạt hình', 'Tài liệu', 'Kịch tính', 'Chiến tranh', 'Thể thao', 'Nhạc kịch']
const formFilm = ref({
  title: '',
  genre: undefined,
  shortDescription: '',
  actors: [],
  duration: 0,
  releaseDate: undefined,
  thumb: '',
  trailer: '',
})
</script>

<style lang="">

</style>
