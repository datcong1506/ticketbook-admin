<template>
  <router-view :key="fullPath" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const fullPath = computed(() => route.fullPath)
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
