<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import { useBranchStore } from '@/stores/branches'
import TableOne from '@/components/Tables/TableOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ModalComponent from '@/components/Modal/ModalComponent.vue'
const branchStore = useBranchStore()
const branchesList = ref([
  { id: '30c5b91d-d96e-4d36-bc25-388a58ff99c3', name: 'Основной' },
  { id: 'e572fda8-b32a-4147-a8ed-dd13c54ab2a3', name: 'Almaz test' },
  { id: 'a06b65c4-2827-42a8-bd31-81ce60de2754', name: 'Almaz test2' }
])

const tabs = ref(['Сотрудники', 'Филиалы'])
const activeTab = ref('Сотрудники')
const isBranchModalOpen = ref(false)
const branchName = ref('')
const branchAddress = ref('')
const selectedBranch = ref('')

onMounted(async () => {
  await branchStore.getBranchesList()
  await branchStore.getBranchesListData()
  if (branchStore.branchGroups.length !== 0) {
    branchesList.value = branchStore.branchGroups
  }
})

const openBranchModal = () => {
  isBranchModalOpen.value = true
}

const closeBranchModal = () => {
  isBranchModalOpen.value = false
}

const saveNewBranch = async () => {
  const sendData = {
    name: branchName.value,
    abbreviation: 'Основной филиал',
    address: branchAddress.value,
    time_zone: 'UTC +5:00',
    group_id: selectedBranch.value,
    workdays: 'Monday,Tuesday,Wednesday,Thursday,Friday',
    holidays: 'Saturday,Sunday',
    work_hours: '9:00-18:00'
  }
  try {
    await branchStore.addNewBranch(sendData);
    console.log('Sign-in successful');
    await branchStore.getBranchesListData();
    isBranchModalOpen.value = false;
  } catch (error) {
    console.error('Sign-in failed', error)
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
            <div class="overflow-x-auto my-3">
              <table
                class="min-w-full table-auto border-collapse border border-gray-200 text-left text-sm text-gray-600"
              >
                <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th class="border border-gray-200 px-4 py-2">ID</th>
                    <th class="border border-gray-200 px-4 py-2">Название</th>
                    <th class="border border-gray-200 px-4 py-2">Аббревиатура</th>
                    <th class="border border-gray-200 px-4 py-2">Адрес</th>
                    <th class="border border-gray-200 px-4 py-2">Часовой пояс</th>
                    <th class="border border-gray-200 px-4 py-2">Рабочие дни</th>
                    <th class="border border-gray-200 px-4 py-2">Выходные дни</th>
                    <th class="border border-gray-200 px-4 py-2">Рабочие часы</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(branch, index) in branchStore.branchLists"
                    :key="index"
                    class="hover:bg-gray-50"
                  >
                    <td class="border border-gray-200 px-4 py-2">{{ index }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ branch.name }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ branch.abbreviation }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ branch.address }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ branch.time_zone }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ branch.workdays }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ branch.holidays }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ branch.work_hours }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ModalComponent
      v-if="isBranchModalOpen"
      :title="'Добавить филиал'"
      :width="700"
      @close="closeBranchModal"
      @saveData="saveNewBranch"
    >
      <form @submit="saveNewBranch">
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
          <label for="branchAddress" class="block text-sm font-medium text-gray-700">Адрес</label>
          <input
            type="text"
            id="branchAddress"
            class="w-full p-2 border border-gray-300 rounded-md"
            v-model="branchAddress"
          />
        </div>
        <div class="mb-4">
          <label for="selectedBranch" class="block text-sm font-medium text-gray-700"
            >Выбрать филиал</label
          >
          <select
            id="selectedBranch"
            class="w-full p-2 border border-gray-300 rounded-md"
            v-model="selectedBranch"
          >
            <option v-for="branch in branchesList" :key="branch.id" :value="branch.id">
              {{ branch.name }}
            </option>
          </select>
        </div>
      </form>
    </ModalComponent>
  </DefaultLayout>
</template>
