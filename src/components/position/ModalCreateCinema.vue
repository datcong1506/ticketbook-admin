<template>
  <a-modal v-model:open="modelValue" title="Create Cinema">
    <div class="w-full pb-6 pt-4">
      <a-form layout="vertical">
        <a-form-item label="Name Cinema" required>
          <a-input />
        </a-form-item>
        <a-form-item label="Location" required>
          <a-input />
        </a-form-item>
      </a-form>
    </div>
    <template #footer>
      <div class="flex justify-center items-center">
        <a-button type="primary" @click="onCreateClick()">
          OK
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
const modelValue = defineModel<boolean>()

function onCreateClick() {
  modelValue.value = false
}
</script>

<style lang="">

</style>
