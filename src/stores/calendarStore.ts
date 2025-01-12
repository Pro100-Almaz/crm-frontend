// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const calendarType: Ref<String> = ref('Week')

  const today = new Date()

  const selectedDate: Ref<Date> = ref(new Date())

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

  const weekStart = selectedDate.value.getDate() - selectedDate.value.getDay()

  const setCalendarType = (type: String) => {
    calendarType.value = type
  }

  const backToToday = () => {
    selectedDate.value = today
  }

  const incrementDate = () => {
    const currentDate = new Date(selectedDate.value)
    if (calendarType.value === 'Week') {
      currentDate.setDate(currentDate.getDate() + 7)
    } else if (calendarType.value === 'Month') {
      currentDate.setMonth(currentDate.getMonth() + 1)
    }
    selectedDate.value = currentDate
  }

  const decrementDate = () => {
    const currentDate = new Date(selectedDate.value)
    if (calendarType.value === 'Week') {
      currentDate.setDate(currentDate.getDate() - 7)
    } else if (calendarType.value === 'Month') {
      currentDate.setMonth(currentDate.getMonth() - 1)
    }
    selectedDate.value = currentDate
  }

  return {
    calendarType,
    setCalendarType,
    selectedDate,
    incrementDate,
    decrementDate,
    months,
    weekStart,
    backToToday
  }
})
