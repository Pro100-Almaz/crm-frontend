<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'


</script>

<template>
  <div class="relative" ref="target">
    <router-link
      class="flex items-center gap-4"
      to="/"
    >

      <span class="h-12 w-12 rounded-full">
        <img src="@/assets/images/user/user-01.png" alt="User" />
      </span>

    </router-link>

  </div>
</template>
