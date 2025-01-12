<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendarStore'

const calendarStore = useCalendarStore()

const today = computed(() => calendarStore.selectedDate)
const monthDays = computed(() => {
  const firstDayOfMonth = new Date(today.value.getFullYear(), today.value.getMonth(), 1)
  const lastDayOfMonth = new Date(today.value.getFullYear(), today.value.getMonth() + 1, 0)

  const startDay = new Date(firstDayOfMonth)
  startDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay())

  const endDay = new Date(lastDayOfMonth)
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()))

  const days = []
  for (let date = new Date(startDay); date <= endDay; date.setDate(date.getDate() + 1)) {
    days.push(new Date(date))
  }
  return days
})

const events = [
  { id: 1, name: 'dinner', start: new Date(today.value.getFullYear(), 0, 30) },
  { id: 2, name: 'lunch', start: new Date(today.value.getFullYear(), 0, 7) },
  { id: 3, name: 'lunch', start: new Date(2025, 0, 13) }
]

const isToday = (date: Date) => {
  const now = new Date()
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}

const getEventsForDate = (date: Date) => {
  return events.filter((event) => date.toDateString() === new Date(event.start).toDateString())
}
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
        class="p-2 border border-gray-300 h-40"
        :class="{ 'bg-blue-100': isToday(day) }"
      >
        <!-- Date -->
        <div
          class="text-xs font-bold"
          :class="{ 'text-red-500': day.getMonth() !== today.getMonth() }"
        >
          {{ day.getDate() }}
        </div>

        <!-- Events -->
        <div
          v-for="event in getEventsForDate(day)"
          :key="event.id"
          class="bg-red-500 text-white h-5 text-xs px-2 py-1 mt-1 rounded truncate"
        >
          {{ event.name }}
        </div>
      </div>
    </div>
  </div>
</template>
