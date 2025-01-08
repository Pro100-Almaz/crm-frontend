import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const calendarType: Ref<String> = ref('Week')

  const selectedDate = ref(new Date())

  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 }, // 29 in leap years
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 }
  ]

  const today = new Date()

  const weekStart = new Date(today)

  weekStart.setDate(today.getDate() - today.getDay())

  const setCalendarType = (type: String) => {
    calendarType.value = type
  }

  const incrementDate = () => {
    if (calendarType.value === 'Week') {
      selectedDate.value.setDate(selectedDate.value.getDate() + 7)
    } else if (calendarType.value === 'Month') {
      selectedDate.value.setMonth(selectedDate.value.getMonth() + 1)
    }
  }

  return { calendarType, setCalendarType, selectedDate, incrementDate }
})
