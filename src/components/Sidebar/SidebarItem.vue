<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useRoute } from 'vue-router'

const sidebarStore = useSidebarStore()

const props = defineProps(['label', 'route'])
const currentPage = useRoute().name

interface SidebarItem {
  label: string
}

const handleItemClick = () => {
  const pageName = sidebarStore.page === props.label ? '' : props.label
  sidebarStore.page = pageName
}
</script>

<template>
  <li>
    <router-link
      :to="route"
      class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
      @click.prevent="handleItemClick"
      :class="{
        'bg-graydark dark:bg-meta-4': sidebarStore.page === label
      }"
    >
    <slot></slot>
      {{ label }}
    </router-link>
  </li>
</template>
