<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendarStore'

const calendarStore = useCalendarStore()

const weekStart = computed(() => {
  const currentDate = new Date(calendarStore.selectedDate)
  const dayOffset = currentDate.getDay()
  return new Date(currentDate.setDate(currentDate.getDate() - dayOffset))
})

const events = [
  {
    id: 1,
    name: 'Meeting',
    start: new Date(2025, 0, 14, 8, 0, 0, 0),
    end: new Date(2025, 0, 14, 9, 0, 0, 0)
  },
  {
    id: 2,
    name: 'Dinner',
    start: new Date(new Date().setHours(19, 0, 0, 0)),
    end: new Date(new Date().setHours(20, 0, 0, 0))
  },
  {
    id: 3,
    name: 'Workout',
    start: new Date(2025, 0, 13, 8, 0, 0, 0),
    end: new Date(2025, 0, 13, 9, 0, 0, 0)
  }
]

const weekDays = computed(() =>
  Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart.value)
    date.setDate(weekStart.value.getDate() + i)

    return {
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
      date: date,
      events: events.filter((event) => date.toDateString() === new Date(event.start).toDateString())
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

      <div
        v-for="day in weekDays"
        :key="day.date.toISOString()"
        class="border-l border-gray-300 relative"
      >
        <div
          v-for="hour in Array.from({ length: 24 }, (_, i) => i)"
          :key="hour"
          class="h-16 border-b border-gray-300"
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
    </div>
  </div>
</template>
