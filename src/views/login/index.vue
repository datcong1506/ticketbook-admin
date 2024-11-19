<template>
  <div class="absolute w-[375px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col gap-4 bg-[white] overflow-hidden border-[rgb(45,_194,_117)]">
    <div class="h-[112px] bg-[rgb(45,_194,_117)] relative">
      <div class="absolute bottom-0 left-[10%] h-[64px] w-[85%] text-3xl font-bold text-white flex items-center">
        Login
      </div>
    </div>
    <div class="flex flex-col gap-4 px-5 pb-5">
      <a-form>
        <a-form-item :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input placeholder="Please input your username" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password placeholder="Please input your password" />
        </a-form-item>
        <a-form-item>
          <a-button :disabled="false" type="primary">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">

</style>
