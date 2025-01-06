<script setup lang="ts">
const today = new Date()
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

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)

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
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 30)
  },
  {
    id: 2,
    name: 'Lunch',
    start: new Date(oneDay.getFullYear(), oneDay.getMonth(), oneDay.getDate(), 12, 0),
    end: new Date(oneDay.getFullYear(), oneDay.getMonth(), oneDay.getDate(), 13, 0)
  },
  {
    id: 3,
    name: 'Dinner',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0)
  }
)
</script>

<template>
  <div class="weekly-calendar w-full border-2 rounded-md mx-auto">
    <div class="grid grid-cols-8 border-b border-gray-300 bg-primary rounded-t-md">
      <div></div>
      <div
        v-for="day in weekDays"
        :key="day.date.toISOString()"
        class="text-center font-bold p-1 text-white"
        :class="{ 'bg-blue-100 text-blue-900': isToday(day.date) }"
      >
        <div>{{ day.day }}</div>
        <div>{{ day.date.getDate() }}</div>
      </div>
    </div>

    <div class="grid grid-cols-8">
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
