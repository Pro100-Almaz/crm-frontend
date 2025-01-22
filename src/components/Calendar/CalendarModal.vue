<script setup lang="ts">
import { ref } from 'vue'

import { useCalendarStore } from '@/stores/calendarStore'

interface position {
  x: number
  y: number
}

// draggable

const isDragging = ref(false)
const dragOffset = ref<position>({ x: 0, y: 0 })
const modalPosition = ref<position>({ x: 0, y: 0 })

const startDrag = (event: MouseEvent) => {
  isDragging.value = true
  dragOffset.value = {
    x: event.clientX - modalPosition.value.x,
    y: event.clientY - modalPosition.value.y
  }
}
const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return
  modalPosition.value = {
    x: event.clientX - dragOffset.value.x,
    y: event.clientY - dragOffset.value.y
  }
}
const stopDrag = () => {
  isDragging.value = false
}

window.addEventListener('mousemove', onDrag)
window.addEventListener('mouseup', stopDrag)
//

const calendarStore = useCalendarStore()

const props = defineProps({
  gridDate: String,
  selectedTime: Number
})

const date = ref(new Date(props.gridDate || ''))

const enteredStartTime = ref(props.selectedTime || null)
const enteredEndTime = ref(props.selectedTime || null)

const event = ref({
  title: '',
  description: '',
  start_time: '',
  end_time: '',
  user_id: '1',
  room: 1
})

const submitEvent = async () => {
  const validStartTime = date.value.toString() + 'T' + enteredStartTime.value

  if (Number(enteredEndTime.value) > Number(enteredStartTime.value)) {
    enteredEndTime.value = enteredStartTime.value
  }
  const validEndTime = date.value.toString() + 'T' + enteredEndTime.value

  event.value.start_time = validStartTime
  event.value.end_time = validEndTime
  event.value.room = 1

  calendarStore.isModalOpen = false

  console.log(event.value)

  event.value = {
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    user_id: '1',
    room: 1
  }

  await calendarStore.createEvent(event.value)
}
const closeModal = () => {
  calendarStore.isModalOpen = false
}
</script>

<template>
  <section class="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
    <div
      class="w-100 flex items-center justify-center rounded-md border flex-col shadow-md bg-white text-primary gap-5"
      @click.stop="closeModal"
      :style="{ transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)` }"
    >
      <div class="w-full bg-gray-300 rounded-t-md h-5 cursor-pointer" @mousedown="startDrag">
        <div class="flex justify-end items-start mb-4">
          <button type="button" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#3C50E0"
                d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
              />
            </svg>
          </button>
        </div>
      </div>

      <form class="flex flex-col gap-5 px-4 py-2" @submit.prevent="submitEvent">
        <div class="flex gap-5">
          <div class="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#3C50E0"
                fill-rule="evenodd"
                d="M8 4h8V2h2v2h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V2h2zM5 8v12h14V8zm2 3h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2H7z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Event Name"
            class="bg-inherit border-b max-w-full border-gray-300 text-primary placeholder-gray-300"
            v-model="event.title"
          />
        </div>
        <div class="flex gap-5">
          <div class="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#3C50E0"
                d="M12 21q-1.85 0-3.488-.712T5.65 18.35t-1.937-2.863T3 12q0-1.1.25-2.137t.725-1.95t1.138-1.7T6.6 4.8l6.8 6.8L12 13L6.6 7.6q-.75.9-1.175 2.013T5 12q0 2.9 2.05 4.95T12 19t4.95-2.05T19 12q0-2.675-1.713-4.612T13 5.1V7h-2V3h1q1.85 0 3.488.713T18.35 5.65t1.938 2.863T21 12t-.712 3.488t-1.938 2.862t-2.863 1.938T12 21m-5-8q-.425 0-.712-.288T6 12t.288-.712T7 11t.713.288T8 12t-.288.713T7 13m5 5q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m5-5q-.425 0-.712-.288T16 12t.288-.712T17 11t.713.288T18 12t-.288.713T17 13"
              />
            </svg>
          </div>
          <div class="flex gap-3">
            <input
              type="date"
              class="bg-inherit border rounded-md p-1 max-w-full border-gray-300 placeholder-primary"
              v-model="date"
            />
            <input
              type="time"
              class="bg-inherit border rounded-md p-1 max-w-full border-gray-300 placeholder-primary"
              v-model="enteredStartTime"
            />

            <input
              type="time"
              class="bg-inherit border rounded-md p-1 max-w-full border-gray-300 placeholder-primary"
              v-model="enteredEndTime"
            />
          </div>
        </div>
        <!-- <div class="flex gap-5">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#3C50E0"
                d="M17 9h2V7h-2zm0 4h2v-2h-2zm0 4h2v-2h-2zM1 21V11l7-5l7 5v10h-5v-6H6v6zm16 0V10l-7-5.05V3h13v18z"
              />
            </svg>
          </div>
          <input
            type="text"
            class="bg-inherit border rounded-md p-1 max-w-30 border-gray-300 placeholder-primary"
            v-model="numRoom"
            placeholder="Enter the Room"
          />
        </div> -->

        <div class="flex gap-5">
          <div class="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#3C50E0"
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v5h-2v-1H5v10h7v2zm9 0v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95z"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Description"
            class="bg-inherit border-b max-w-full border-gray-300 placeholder-gray-300 text-primary"
            v-model="event.description"
          />
        </div>
        <div class="flex gap-2 self-end">
          <button type="submit" class="bg-primary text-white rounded-md p-2">Add Event</button>
          <button type="submit" class="bg-white text-primary rounded-md p-2" @click="closeModal">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
