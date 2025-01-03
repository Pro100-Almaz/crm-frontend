<script setup lang="ts">
import { ref, computed } from 'vue'

const today = new Date('December 20, 1995 03:24:00')
const oneDay = new Date('December 21, 1995 03:24:00')
const weekStart = new Date(today)
weekStart.setDate(today.getDate() - today.getDay())

const weekDays = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(weekStart)
  date.setDate(weekStart.getDate() + i)
  return {
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
    date: date,
    events: [] as Array<{ id: number; name: string; start: Date; end: Date }>
  }
})

const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`)

const isToday = (date: Date) => {
  const now = new Date()
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}

const getEventStyle = (event: any) => {
  const startHour = new Date(event.start).getHours()
  const startMinutes = new Date(event.start).getMinutes()
  const durationHours =
    (new Date(event.end).getTime() - new Date(event.start).getTime()) / (1000 * 60 * 60)

  return {
    top: `${startHour * 4 + (startMinutes / 60) * 4}rem`,
    height: `${durationHours * 4}rem`,
    left: '0rem',
    right: '0.5rem'
  }
}

weekDays[2].events.push(
  {
    id: 1,
    name: 'Meeting',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15 - 8, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17 - 8, 30)
  },
  {
    id: 2,
    name: 'Lunch',
    start: new Date(oneDay.getFullYear(), oneDay.getMonth(), oneDay.getDate(), 12 - 8, 0),
    end: new Date(oneDay.getFullYear(), oneDay.getMonth(), oneDay.getDate(), 13 - 8, 0)
  },
  {
    id: 3,
    name: 'Dinner',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19 - 8, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20 - 8, 0)
  }
)
</script>

<template>
  <div class="weekly-calendar max-w-5xl mx-auto p-4">
    <button
      @click="
        () => {
          console.log(oneDay.getFullYear(), oneDay.getMonth() + 1, oneDay.getDate())
        }
      "
    >
      hi
    </button>
    <div class="grid grid-cols-8 border-t-2 border-x-2 border-gray-300">
      <div></div>
      <div
        v-for="day in weekDays"
        :key="day.date.toISOString()"
        class="text-center font-bold p-1"
        :class="{ 'bg-blue-100 text-blue-800': isToday(day.date) }"
      >
        <div>{{ day.day }}</div>
        <div>{{ day.date.getDate() }}</div>
      </div>
    </div>

    <div class="grid grid-cols-8 border-2 border-gray-300">
      <div>
        <div
          v-for="hour in hours"
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
        <div v-for="hour in hours" :key="hour" class="h-16 border-b border-gray-300"></div>

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
