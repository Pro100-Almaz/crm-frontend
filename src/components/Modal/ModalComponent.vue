<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div :class="modalClass" class="bg-white rounded-lg p-6 relative" :style="{ width: width + 'px' }">
      <header class="flex justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-lg font-bold">{{ title }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800">&times;</button>
      </header>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="flex justify-end gap-2">
        <button @click="closeModal" type="button" class="bg-gray-500 text-white px-4 py-2 rounded-md">
          Отмена
        </button>
        <button @click="saveModal" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Props {
  title: string;
  width?: number;
  modalClass?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'saveData']);

const width = ref(props.width || 400);

const closeModal = () => emit('close');
const saveModal = () => emit('saveData');
</script>

<style scoped>
.modal-content {
  overflow: auto;
  max-height: calc(100vh - 4rem);
}
</style>
