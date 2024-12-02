<template>
  <div
    class="file-input--wrapper"
  >
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      :multiple="false"
      :accept="acceptType"
    >
    <template v-if="!file">
      <div
        style="border: 1px #7f7f7f dashed; border-radius: 8px"
        class="file-input--items drop-zone w-full"
        :class="{ drag: isDrag }"
        @click="clickInputFile"
        @dragleave.prevent="dragLeaveInputFile"
        @dragover.prevent="dragOverInputFile"
        @drop.prevent="dropInputFile"
      >
        <UploadFile
          alt="uploadFileIcon"
          @mousedown.prevent
        />
      </div>
    </template>
    <template v-else>
      <div
        class="file-input--items w-full"
        style="border: 1px #7f7f7f solid; border-radius: 8px"
        @click="clickInputFile"
      >
        <img :src="file">
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import UploadFile from '@assets/upload-file.svg?component'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  regexAccept: {
    type: RegExp,
    default: /^.*$/gm,
  },
  acceptType: {
    type: String,
    default: '.bmp,.gif,.jpeg,.svg,.tiff,.png,.jpg',
  },
  maxSizeFile: {
    type: Number,
    default: 524_288_000, // 500MB
  },
})

const file = defineModel('file', { type: String, default: '' })
const fileInput = ref<HTMLInputElement>()
const isDrag = ref<boolean>(false)

onMounted(() => {
  if (fileInput.value) {
    fileInput.value.addEventListener('change', eventChangeFile)
  }
})

onBeforeUnmount(() => {
  if (fileInput.value) {
    fileInput.value.removeEventListener('change', eventChangeFile)
  }
})

function changeFileInput(fileList?: FileList) {
  let fileInputList: File[]
  if (fileList) {
    fileInputList = [...fileList]
  } else {
    fileInputList = fileInput.value!.files ? [...fileInput.value!.files] : []
  }
  const fileAccept: File[] = []
  const fileAcceptExtension: File[] = []
  const fileNotAcceptExtension: File[] = []
  const fileNotAcceptSize: File[] = []
  for (const file of fileInputList) {
    const regex = new RegExp(props.regexAccept)
    if (!regex.test(file.name)) {
      fileNotAcceptExtension.push(file)
    } else {
      fileAcceptExtension.push(file)
    }
  }
  for (const file of fileAcceptExtension) {
    if (file?.size && file.size < props.maxSizeFile) {
      fileAccept.push(file)
    } else {
      fileNotAcceptSize.push(file)
    }
  }

  if (fileAccept.length) {
    const fileSelect = fileAccept[0]
    const reader = new FileReader()
    reader.onload = () => {
      file.value = reader.result as string
    }
    reader.readAsDataURL(fileSelect)
  }
  fileInput.value!.files = null
}

function eventChangeFile() {
  changeFileInput()
}

function clickInputFile() {
  fileInput.value?.focus()
  fileInput.value?.click()
}

function dragLeaveInputFile() {
  isDrag.value = false
}

function dragOverInputFile() {
  isDrag.value = true
}

function dropInputFile(e: DragEvent) {
  const fileInputList = e.dataTransfer?.files
  if (fileInputList?.length) {
    changeFileInput(fileInputList)
  }
  isDrag.value = false
}
</script>

  <style scoped lang="scss">
  .file-input--wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    &.error {
      .drop-zone {
        border: 1px red dashed !important;
      }
    }
    .drag {
      border-color: #23758b;
      background-color: rgba(0, 0, 0, 0.1);
    }
    .file-input--items {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
  }
  </style>
