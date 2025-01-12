<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import { useBranchStore } from '@/stores/branches'
import { useBranchGroupStore } from '@/stores/branchGroups'
import { useUserDataStore } from '@/stores/user'
import TableOne from '@/components/Tables/TableOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ModalComponent from '@/components/Modal/ModalComponent.vue'
const userStore = useUserDataStore();
const branchStore = useBranchStore();
const branchGroupsStore = useBranchGroupStore();
const branchesList = ref([
  { id: '30c5b91d-d96e-4d36-bc25-388a58ff99c3', name: 'Основной' },
  { id: 'e572fda8-b32a-4147-a8ed-dd13c54ab2a3', name: 'Almaz test' },
  { id: 'a06b65c4-2827-42a8-bd31-81ce60de2754', name: 'Almaz test2' }
])

const tabs = ref(['Сотрудники', 'Филиалы'])
const activeTab = ref('Сотрудники')
const isBranchModalOpen = ref(false);
const isBranchGroupModalOpen = ref(false);
const isAddUserModalOpen = ref(false);
const branchName = ref('');
const branchGroupName = ref('');
const branchAddress = ref('');
const selectedBranch = ref('');
const email = ref('');
const full_name = ref('');
const password = ref('');

onMounted(async () => {
  await branchStore.getBranchesList()
  await branchStore.getBranchesListData()
  if (branchStore.branchGroups.length !== 0) {
    branchesList.value = branchStore.branchGroups
  }
  await userStore.getUserData();

})

const openBranchModal = () => {
  isBranchModalOpen.value = true;
}

const openBranchGroupModal = () => {
  isBranchGroupModalOpen.value = true;
}
const closeBranchGroupModal = () => {
  isBranchGroupModalOpen.value = false;
}

const closeBranchModal = () => {
  isBranchModalOpen.value = false;
}

const openAddUserModal = () => {
  isAddUserModalOpen.value = true;
}
const closeAddUserModal = () => {
  isAddUserModalOpen.value = false;
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
    console.log('Branch added');
    await branchStore.getBranchesListData();
    isBranchModalOpen.value = false;
  } catch (error) {
    console.error('Branch failed', error)
  }
}
const saveNewBranchGroup = async () => {
  try {
    await branchGroupsStore.addNewBranchGroup(branchGroupName.value);
    console.log('Branch Group added');
    isBranchGroupModalOpen.value = false;
  } catch (error) {
    console.error('Branch Group failed', error)
  }
}
const saveNewUser = async () => {
  const sendData = {
    email: email.value,
    is_active: true,
    is_superuser: false,
    full_name: full_name.value,
    password: password.value
  }
  try {
    await userStore.addNewUser(sendData);
    console.log('Branch Group added');
    isAddUserModalOpen.value = false;
    await userStore.getUserData();
  } catch (error) {
    console.error('Branch Group failed', error);
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-7xl">
      <div
        class="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="flex border-b border-gray-200">
          <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
            class="flex-1 text-center py-2 px-4 text-md font-medium border-b-2" :class="{
              'text-blue-600 border-blue-600 dark:text-white': activeTab === tab,
              'text-gray-600 border-transparent hover:text-gray-900': activeTab !== tab
            }">
            {{ tab }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="p-4 border border-gray-200 rounded-b">
          <div v-if="activeTab === 'Сотрудники'" class="text-gray-700">
            <div class="w-full flex justify-end mb-3">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md" @click="openAddUserModal">Добавить
                сотрудника</button>
            </div>
            <div class="overflow-x-auto my-3">
              <table
                class="min-w-full table-auto border-collapse border border-gray-200 text-left text-sm text-gray-600">
                <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th class="border border-gray-200 px-4 py-2">ID</th>
                    <th class="border border-gray-200 px-4 py-2">Почта</th>
                    <th class="border border-gray-200 px-4 py-2">Полное имя</th>
                    <th class="border border-gray-200 px-4 py-2">Активен</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in userStore.userData" :key="index" class="hover:bg-gray-50">
                    <td class="border border-gray-200 px-4 py-2">{{ index + 1 }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ user.email }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ user.full_name }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ user.is_active }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="activeTab === 'Филиалы'" class="text-gray-700">
            <header class="flex gap-4 justify-end">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md" @click="openBranchGroupModal">Добавить
                сеть</button>
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md" @click="openBranchModal">
                Добавить филиал
              </button>
            </header>
            <div class="overflow-x-auto my-3">
              <table
                class="min-w-full table-auto border-collapse border border-gray-200 text-left text-sm text-gray-600">
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
                  <tr v-for="(branch, index) in branchStore.branchLists" :key="index" class="hover:bg-gray-50">
                    <td class="border border-gray-200 px-4 py-2">{{ index + 1 }}</td>
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
    <ModalComponent v-if="isBranchModalOpen" :title="'Добавить филиал'" :width="700" @close="closeBranchModal"
      @saveData="saveNewBranch">
      <form @submit="saveNewBranch">
        <div class="mb-4">
          <label for="branchName" class="block text-sm font-medium text-gray-700">Название филиала</label>
          <input type="text" id="branchName" class="w-full p-2 border border-gray-300 rounded-md"
            v-model="branchName" />
        </div>
        <div class="mb-4">
          <label for="branchAddress" class="block text-sm font-medium text-gray-700">Адрес</label>
          <input type="text" id="branchAddress" class="w-full p-2 border border-gray-300 rounded-md"
            v-model="branchAddress" />
        </div>
        <div class="mb-4">
          <label for="selectedBranch" class="block text-sm font-medium text-gray-700">Выбрать сеть</label>
          <select id="selectedBranch" class="w-full p-2 border border-gray-300 rounded-md" v-model="selectedBranch">
            <option v-for="branch in branchesList" :key="branch.id" :value="branch.id">
              {{ branch.name }}
            </option>
          </select>
        </div>
      </form>
    </ModalComponent>
    <ModalComponent v-if="isBranchGroupModalOpen" :title="'Добавить сеть'" :width="700" @close="closeBranchGroupModal"
      @saveData="saveNewBranchGroup">
      <form @submit="saveNewBranchGroup">
        <div class="mb-4">
          <label for="branchGroupName" class="block text-sm font-medium text-gray-700">Название сети</label>
          <input type="text" id="branchGroupName" class="w-full p-2 border border-gray-300 rounded-md"
            v-model="branchGroupName" />
        </div>
      </form>
    </ModalComponent>
    <ModalComponent v-if="isAddUserModalOpen" :title="'Добавить сотрудника'" :width="700" @close="closeAddUserModal"
      @saveData="saveNewUser">
      <form @submit="saveNewUser">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Почта</label>
          <input type="text" id="email" class="w-full p-2 border border-gray-300 rounded-md" v-model="email" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Полное имя</label>
          <input type="text" id="email" class="w-full p-2 border border-gray-300 rounded-md" v-model="full_name" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Пороль</label>
          <input type="text" id="email" class="w-full p-2 border border-gray-300 rounded-md" v-model="password" />
          <p v-if="password.length < 8">Минимум 8 символов</p>
        </div>
      </form>
    </ModalComponent>
  </DefaultLayout>
</template>
