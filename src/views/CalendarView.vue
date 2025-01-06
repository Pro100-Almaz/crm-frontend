<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CalendarWeekly from '@/components/CalendarWeekly.vue'
import CalendarMonthly from '@/components/CalendarMonthly.vue'
const pageTitle = ref('Calender')

const today = new Date()
const weekStart = new Date(today)
weekStart.setDate(today.getDate() - today.getDay())
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-7xl">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <!-- <CalendarCard /> -->
      <!-- <CalendarWeekly /> -->
      <CalendarMonthly />
    </div>
  </DefaultLayout>
</template>
