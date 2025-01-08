<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CalendarWeekly from '@/components/CalendarWeekly.vue'
import CalendarMonthly from '@/components/CalendarMonthly.vue'
import CalendarHeader from '@/components/Calendar/CalendarHeader.vue'
import { useCalendarStore } from '@/stores/calendarStore'

const calendarStore = useCalendarStore()

const pageTitle = ref('Calender')
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-7xl">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <CalendarHeader />
      <!-- Breadcrumb End -->
      <!-- <CalendarCard /> -->
      <CalendarWeekly v-if="calendarStore.calendarType === 'Week'" />
      <CalendarMonthly v-if="calendarStore.calendarType === 'Month'" />
    </div>
  </DefaultLayout>
</template>
