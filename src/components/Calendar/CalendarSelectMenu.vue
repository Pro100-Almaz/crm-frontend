<script setup lang="ts">
import { ref } from 'vue'
import { useCalendarStore } from '@/stores/calendarStore'
import ChevronDown from './ChevronDown.vue'

const menuList = ['Week', 'Month']

const calendarStore = useCalendarStore()

const showMenu = ref(false)
</script>
<template>
  <div class="relative flex items-center">
    <button
      class="border rounded-md flex items-center px-3 gap-1 py-2 font-medium border-gray-700 hover:bg-slate-300 active:bg-slate-500 duration-500"
      @click="
        () => {
          showMenu = !showMenu
        }
      "
    >
      {{ calendarStore.calendarType }}
      <ChevronDown />
    </button>
    <div class>
      <ul
        class="absolute bg-white top-11 left-0 w-full border border-gray-300 rounded-md flex-col gap-2 shadow-lg"
        v-if="showMenu"
      >
        <button
          class="flex p-1 mx-1"
          v-for="menu in menuList"
          :key="menu"
          @click="
            () => {
              calendarStore.setCalendarType(menu)
              showMenu = false
            }
          "
        >
          {{ menu }}
        </button>
      </ul>
    </div>
  </div>
</template>
