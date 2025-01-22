// import { useStorage } from '@vueuse/core'
interface Event {
  title: string
  description: string
  start_time: string
  end_time: string
  user_id: string
  room: number
}

import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, type Ref, computed } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const isModalOpen: Ref<Boolean> = ref(false)

  const calendarType: Ref<String> = ref('Week')

  const today = new Date()

  const selectedDate: Ref<Date> = ref(new Date(new Date().setHours(0, 0, 0)))

  // week

  const weekStart = computed(() => {
    const currentDate = new Date(selectedDate.value.setHours(0, 0, 0))
    const dayOffset = currentDate.getDay()
    return new Date(currentDate.setDate(currentDate.getDate() - dayOffset))
  })

  const weekEnd = computed(() => {
    const date = new Date(weekStart.value.setHours(23, 59, 59))
    return new Date(date.setDate(weekStart.value.getDate() + 6))
  })

  // week

  // month

  const startDay = computed(() => {
    const firstDayOfMonth = new Date(
      selectedDate.value.getFullYear(),
      selectedDate.value.getMonth(),
      1
    )
    const date = new Date(firstDayOfMonth.setHours(0, 0, 0))
    return new Date(date.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay()))
  })

  const endDay = computed(() => {
    const lastDayOfMonth = new Date(
      selectedDate.value.getFullYear(),
      selectedDate.value.getMonth() + 1,
      0
    )
    const date = new Date(lastDayOfMonth.setHours(23, 59, 59))
    return new Date(date.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())))
  })

  // month

  const setCalendarType = (type: String) => {
    calendarType.value = type
    isModalOpen.value = false
  }

  const backToToday = () => {
    selectedDate.value = today
  }

  const incrementDate = () => {
    if (calendarType.value === 'Week') {
      selectedDate.value = new Date(selectedDate.value.setDate(selectedDate.value.getDate() + 7))
    } else if (calendarType.value === 'Month') {
      selectedDate.value = new Date(
        selectedDate.value.getFullYear(), // Keep the year unchanged
        selectedDate.value.getMonth() + 1, // Increment the month
        selectedDate.value.getDate()
      )
    }
  }

  const decrementDate = () => {
    if (calendarType.value === 'Week') {
      selectedDate.value = new Date(selectedDate.value.setDate(selectedDate.value.getDate() - 7))
    } else if (calendarType.value === 'Month') {
      selectedDate.value = new Date(selectedDate.value.setMonth(selectedDate.value.getMonth() - 1))
    }
  }

  const fetchEvents = async () => {
    let validateStartDate = ''

    let validateEndDate = ''

    if (calendarType.value === 'Week') {
      validateStartDate = new Date(weekStart.value.setHours(weekStart.value.getHours() + 5))
        .toISOString()
        .split('.')[0]
      validateEndDate = new Date(weekEnd.value.setHours(weekEnd.value.getHours() + 5))
        .toISOString()
        .split('.')[0]
    } else if (calendarType.value === 'Month') {
      validateStartDate = new Date(startDay.value.setHours(startDay.value.getHours() + 5))
        .toISOString()
        .split('.')[0]
      validateEndDate = new Date(endDay.value.setHours(endDay.value.getHours() + 5))
        .toISOString()
        .split('.')[0]
    }

    const apiURL = `https://api.edify.kz/api/v1/calendar/events/?skip=0&limit=100&start_date=${validateStartDate}&end_date=${validateEndDate}&sort_by=start_time`
    try {
      const token = sessionStorage.getItem('token')

      const response = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data
      console.log(data)
      return data
    } catch (err: any) {
      console.log(err.response.data)
    }
  }
  const createEvent = async (event: Event) => {
    const apiURL = `https://api.edify.kz/api/v1/calendar/events/`
    try {
      const token = sessionStorage.getItem('token')

      const response = await axios.post(apiURL, event, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data
      console.log(data)
      return data
    } catch (err: any) {
      console.log(err.response.data)
    }
  }

  return {
    calendarType,
    setCalendarType,
    fetchEvents,
    selectedDate,
    incrementDate,
    decrementDate,
    weekStart,
    backToToday,
    weekEnd,
    isModalOpen,
    startDay,
    endDay,
    createEvent
  }
})
