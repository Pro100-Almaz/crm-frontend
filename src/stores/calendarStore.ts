import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useSidebarStore = defineStore('calendar', () => {
  const calendarType: Ref<String> = ref('week')

  const renderedDate = ref(new Date())

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

  const selectedType = (type: String) => {
    calendarType.value = type
  }

  return { calendarType, selectedType, renderedDate }
})
