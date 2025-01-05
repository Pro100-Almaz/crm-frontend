<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableOne from '@/components/Tables/TableOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import axios from 'axios'

const pageTitle = ref('Calender')
const tabs = ref(['Сотрудники', 'Филиалы'])
const activeTab = ref('Сотрудники')
const isBranchModalOpen = ref(false)
const branchName = ref('');
const branchAddress = ref('');
const openBranchModal = () => {
  isBranchModalOpen.value = true
}

const closeBranchModal = () => {
  isBranchModalOpen.value = false
}

const saveNewBranch = (event: Event) => {
  event.preventDefault();  
  const sendData = {
    name: branchName.value,
    abbreviation: 'Основной филиал',
    address: branchAddress.value,
    time_zone: 'UTC +5:00',
    group_id: 'd46d277b-98e7-434a-bea8-05dd1c684804',
    workdays: 'Monday,Tuesday,Wednesday,Thursday,Friday',
    holidays: 'Saturday,Sunday',
    work_hours: '9:00-18:00',
  }
  try{
    const response = axios.post('https://75be-95-56-108-94.ngrok-free.app/api/v1/branches', sendData,       
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

    console.log(response);
  }catch(error){
    console.log(error)
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-7xl">
      <div
        class="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div class="flex border-b border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="flex-1 text-center py-2 px-4 text-md font-medium border-b-2"
            :class="{
              'text-blue-600 border-blue-600 dark:text-white': activeTab === tab,
              'text-gray-600 border-transparent hover:text-gray-900': activeTab !== tab
            }"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="p-4 border border-gray-200 rounded-b">
          <div v-if="activeTab === 'Сотрудники'" class="text-gray-700">
            <TableOne />
          </div>
          <div v-if="activeTab === 'Филиалы'" class="text-gray-700">
            <header class="flex gap-4 justify-end">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md">Добавить сеть</button>
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md" @click="openBranchModal">
                Добавить филиал
              </button>
            </header>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="isBranchModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-6 w-1/3">
        <h2 class="text-lg font-bold mb-4">Добавить филиал</h2>
        <form>
          <div class="mb-4">
            <label for="branchName" class="block text-sm font-medium text-gray-700"
              >Название филиала</label
            >
            <input
              type="text"
              id="branchName"
              class="w-full p-2 border border-gray-300 rounded-md"
              v-model="branchName"
            />
          </div>
          <div class="mb-4">
            <label for="branchName" class="block text-sm font-medium text-gray-700">Адрес</label>
            <input
              type="text"
              id="branchName"
              class="w-full p-2 border border-gray-300 rounded-md"
              v-model="branchAddress"
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeBranchModal"
              class="bg-gray-500 text-white px-4 py-2 r ounded-md"
            >
              Отмена
            </button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md" @click="saveNewBranch">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>
