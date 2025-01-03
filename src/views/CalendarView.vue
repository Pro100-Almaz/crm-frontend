<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CalendarCard from '@/components/Calendar/CalendarCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CalendarWeekly from '@/components/CalendarWeekly.vue'

const pageTitle = ref('Calender')
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-7xl">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <!-- <CalendarCard /> -->
      <CalendarWeekly />
    </div>
  </DefaultLayout>
</template>
