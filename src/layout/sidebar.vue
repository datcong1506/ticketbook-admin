<template>
  <div class="w-[250px] min-w-[250px] h-full border-r-[#454545] border-r flex flex-col bg-[rgba(44,44,44,.5)!important]">
    <div class="h-[64px] w-full flex items-center justify-center text-2xl font-bold text-[#21ea7f]">
      Ticket book
    </div>
    <div class="flex-grow flex flex-col gap-1">
      <div v-for="item of menuItems" :key="item.name" class="h-[64px] flex items-center gap-3 pl-6 cursor-pointer item-menu" :class="{ 'item-menu__active': route.name === item.name }" @click="handleRoute(item)">
        <component :is="item.icon" style="width: 24px; height: 24px; fill: white;" />
        <div class="text-[rgba(255,255,255,0.65)] text-sm item-menu__text">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Film from '@assets/film.svg?component'
import Cinema from '@assets/position.svg?component'
import Room from '@assets/room.svg?component'
import Schedule from '@assets/schedule.svg?component'
import Seat from '@assets/seat.svg?component'
import Ticket from '@assets/ticket.svg?component'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = [
  {
    title: 'Cinema',
    icon: Cinema,
    name: 'cinema',
  },
  {
    title: 'Room',
    icon: Room,
    name: 'room',
  },
  {
    title: 'Seat',
    icon: Seat,
    name: 'seat',
  },
  {
    title: 'Film',
    icon: Film,
    name: 'film',
  },
  {
    title: 'Schedule',
    icon: Schedule,
    name: 'schedule',
  },
  {
    title: 'Ticket',
    icon: Ticket,
    name: 'ticket',
  },
]

function handleRoute(item: { name: string }): void {
  router.push({ name: item.name })
}
</script>

<style lang="scss" scoped>
.item-menu:hover, .item-menu__active {
  background-color: rgba(0,0,0,.3)!important;
  .item-menu__text {
    color: white
  }
}
</style>
