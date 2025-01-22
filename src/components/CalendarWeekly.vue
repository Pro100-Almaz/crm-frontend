<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'

import { useCalendarStore } from '@/stores/calendarStore'
import CalendarModal from './Calendar/CalendarModal.vue'

interface Event {
  id: number
  name: string
  start: Date
  end: Date
}

const calendarStore = useCalendarStore()

const gridDate = ref('')
const gridTime = ref('')

const weekStart = computed(() => {
  const currentDate = new Date(calendarStore.selectedDate.setHours(0, 0))
  const dayOffset = currentDate.getDay()

  return new Date(currentDate.setDate(currentDate.getDate() - dayOffset))
})

const events = ref<Event[]>([])

const weekDays = computed(() =>
  Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart.value)
    date.setDate(weekStart.value.getDate() + i)

    return {
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
      date: date,
      events: events.value.filter(
        (event) => date.toDateString() === new Date(event.start).toDateString()
      )
    }
  })
)

const isToday = (date: Date) => {
  const now = new Date()
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}

const getEventStyle = (event: any) => {
  const startHour = event.start.getHours()
  const startMinutes = event.start.getMinutes()
  const durationHours = (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)

  return {
    top: `${startHour * 4 + (startMinutes / 60) * 4}rem`,
    height: `${durationHours * 4}rem`,
    left: '0rem',
    right: '0.5rem'
  }
}

const clickOnGrid = (day: Date, hour: string) => {
  calendarStore.isModalOpen = true
  gridDate.value = day.toString()
  gridTime.value = hour
}

onMounted(async () => {
  const fetchedEvents = await calendarStore.fetchEvents()
  if (fetchedEvents !== null) {
    events.value = fetchedEvents
  } else {
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
  <div class="weekly-calendar w-full border-2 rounded-md mx-auto">
    <div
      class="grid grid-cols-8 border-b border-gray-300 bg-primary text-white text-center font-bold"
    >
      <div></div>
      <div
        v-for="day in weekDays"
        :key="day.date.toISOString()"
        class="p-2"
        :class="{ 'bg-blue-100 text-blue-900': isToday(day.date) }"
      >
        <div>{{ day.day }}</div>
        <div>{{ day.date.getDate() }}</div>
      </div>
    </div>

    <div class="grid grid-cols-8">
      <div>
        <div
          v-for="hour in Array.from({ length: 24 }, (_, i) => `${i}:00`)"
          :key="hour"
          class="h-16 border-b border-gray-300 text-center text-sm flex items-center justify-center"
        >
          {{ hour }}
        </div>
      </div>

      <div v-for="day in weekDays" :key="day.date.toISOString()" class="border-l border-gray-300">
        <div
          v-for="hour in Array.from({ length: 24 }, (_, i) => i)"
          :key="hour"
          class="h-16 border-b border-gray-300"
          @click="clickOnGrid(day.date, String(hour))"
        ></div>

        <div
          v-for="event in day.events"
          :key="event.id"
          class="absolute bg-red-500 text-white text-xs px-2 py-1 rounded"
          :style="getEventStyle(event)"
        >
          {{ event.name }}
        </div>
      </div>
      <CalendarModal v-if="calendarStore.isModalOpen" :date="gridDate" :time="gridTime" />
    </div>
  </div>
</template>
