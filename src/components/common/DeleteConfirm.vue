<template>
  <a-modal v-model:open="modelValue" destroy-on-close title="Confirm Delete" :closable="false">
    <div class="text-lg p-4">
      Are you sure delete this item?
    </div>
    <template #footer>
      <div class="flex justify-center items-center gap-4">
        <a-button size="large" @click="onCancel">
          Cancel
        </a-button>
        <a-button danger size="large" @click="onConfirm">
          OK
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  delete: []
}>()

const modelValue = defineModel<boolean>()

function onCancel() {
  modelValue.value = false
}
function onConfirm() {
  modelValue.value = false
  emit('delete')
}
</script>

<style lang="">

</style>
