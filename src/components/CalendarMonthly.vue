<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useCalendarStore } from '@/stores/calendarStore'
import CalendarModal from './Calendar/CalendarModal.vue'

interface Event {
  id: number
  name: string
  start: Date
  end: Date
}

const calendarStore = useCalendarStore()

const gridDate = ref(new Date())

const monthDays = computed(() => {
  const days = []
  for (
    let date = new Date(calendarStore.startDay);
    date <= calendarStore.endDay;
    date.setDate(date.getDate() + 1)
  ) {
    days.push(new Date(date))
  }
  return days
})

const events = ref<Event[]>([])

const isToday = (date: Date) => {
  const now = new Date()
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}

const getEventsForDate = (date: Date) => {
  return events.value.filter(
    (event) => date.toDateString() === new Date(event.start).toDateString()
  )
}

const clickOnGrid = (date: Date) => {
  gridDate.value = date
  calendarStore.isModalOpen = true
}

const clickOnEvent = (date: Date) => {
  gridDate.value = date
  calendarStore.isModalOpen = true
}

onMounted(async () => {
  const fetchedEvents = await calendarStore.fetchEvents()
  if (fetchedEvents) {
    events.value = fetchedEvents
  } else {
    events.value = []
    console.log('No events found')
  }
})
watch(
  () => calendarStore.selectedDate,
  async () => {
    const fetchedEvents = await calendarStore.fetchEvents()
    if (fetchedEvents !== null) {
      events.value = fetchedEvents
    } else {
      console.log('No events found')
    }
  }
)
</script>

<template>
  <div class="monthly-calendar w-full border-2 rounded-md mx-auto">
    <!-- Header -->

    <div
      class="grid grid-cols-7 border-b h-18 border-gray-300 bg-primary rounded-t-md text-white text-center content-center font-bold"
    >
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>

    <!-- Days Grid -->
    <div class="grid grid-cols-7">
      <div
        v-for="day in monthDays"
        :key="day.toISOString()"
        class="p-2 border border-gray-300 h-40 cursor-pointer"
        :class="{ 'bg-blue-100': isToday(day) }"
        @click="clickOnGrid(day)"
      >
        <!-- Date -->
        <div class="text-xs font-bold">
          {{ day.getDate() }}
        </div>

        <!-- Events -->
        <div
          v-for="event in getEventsForDate(day)"
          :key="event.id"
          class="bg-red-500 text-white h-5 text-xs px-2 py-1 mt-1 rounded truncate"
          @click="clickOnEvent(day)"
        >
          {{ event.name }}
        </div>
      </div>
      <CalendarModal v-if="calendarStore.isModalOpen" :day="gridDate" />
    </div>
  </div>
</template>
