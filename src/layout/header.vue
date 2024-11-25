<template>
  <div class="w-full h-[64px] bg-[rgba(79,79,79,0.5)] border-b border-b-[#616161] flex justify-between items-center p-2">
    <div class="font-bold text-2xl text-white">
      {{ route.meta.title }}
    </div>
    <a-dropdown placement="bottomRight">
      <div class="cursor-pointer flex items-center gap-2 px-1">
        <div class="text-sm text-white">
          Admin
        </div>
        <Down style="width: 10px; height: 10px;fill: white;" />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <div class="flex h-[36px] items-center gap-3">
              <User style="width: 20px; height: 20px;fill: black;" />
              Profile
            </div>
          </a-menu-item>
          <a-menu-item @click="handleLogout()">
            <div class="flex h-[36px] items-center gap-3">
              <Logout style="width: 15px; height: 15px;fill: black;" />
              Logout
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import useAuth from '@/hooks/useAuth'
import Down from '@assets/down.svg?component'
import Logout from '@assets/logout.svg?component'
import User from '@assets/user.svg?component'
import { useRoute, useRouter } from 'vue-router'

const { logout } = useAuth()
const router = useRouter()
const route = useRoute()

function handleLogout(): void {
  logout()
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped>

</style>
