<script setup lang="ts">
import ChevronLeft from './Chevron-left.vue'
import ChevronRight from './ChevronRight.vue'
import CalendarSelectMenu from './CalendarSelectMenu.vue'

import { useCalendarStore } from '@/stores/calendarStore'

const calendarStore = useCalendarStore()
</script>
<template>
  <section class="mb-5 flex w-full justify-between items-center">
    <div class="flex gap-5 items-center">
      <button
        class="border rounded-md px-4 py-2 border-gray-700 hover:bg-primary transition delay-100 hover:text-white font-medium"
        @click="calendarStore.backToToday"
      >
        Today
      </button>
      <h3 class="font-bold text-2xl">
        {{ calendarStore.selectedDate.getFullYear() }}
        {{ calendarStore.selectedDate.toLocaleDateString('en-US', { month: 'long' }) }}
      </h3>
    </div>
    <div class="flex gap-5">
      <CalendarSelectMenu />
      <div class="flex items-center text-2xl font-medium">
        <button class="hover:bg-gray-300 rounded-full p-1" @click="calendarStore.decrementDate">
          <ChevronLeft /></button
        ><button class="hover:bg-gray-300 rounded-full p-1" @click="calendarStore.incrementDate">
          <ChevronRight />
        </button>
      </div>
      <!-- <button>selection</button> -->
    </div>
  </section>
</template>
