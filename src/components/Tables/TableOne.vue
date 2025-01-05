<script setup lang="ts">
import { ref } from 'vue'

const brandData = ref([
  {
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
    state: 'Active',
    phibe: 'N/A',
    email: 'contact@google.com',
    leadStatus: 'Hot',
    owner: 'John Doe',
    createdDate: '2024-01-01',
  },
  {
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
    state: 'Active',
    phibe: 'N/A',
    email: 'contact@twitter.com',
    leadStatus: 'Warm',
    owner: 'Jane Smith',
    createdDate: '2024-01-05',
  },
  {
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
    state: 'Inactive',
    phibe: 'N/A',
    email: 'support@github.com',
    leadStatus: 'Cold',
    owner: 'Alice Johnson',
    createdDate: '2024-01-10',
  },
  {
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
    state: 'Active',
    phibe: 'N/A',
    email: 'info@vimeo.com',
    leadStatus: 'Warm',
    owner: 'Bob Lee',
    createdDate: '2024-01-15',
  },
  {
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
    state: 'Active',
    phibe: 'N/A',
    email: 'contact@facebook.com',
    leadStatus: 'Hot',
    owner: 'Charlie Brown',
    createdDate: '2024-01-20',
  },
])
</script>

<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex flex-col">
      <!-- Header -->
      <div class="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
        <div class="p-2.5 xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base dark:text-white">Name</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base dark:text-white">Visitors</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base dark:text-white">Revenues</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base dark:text-white">Sales</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base dark:text-white">Conversion</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base dark:text-white">State</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base dark:text-white">Owner</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base dark:text-white">Created Date</h5>
        </div>
      </div>

      <!-- Rows -->
      <div
        v-for="(brand, key) in brandData"
        :key="key"
        :class="`grid grid-cols-8 ${
          key === brandData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`"
      >
        <div class="p-2.5 xl:p-5">
          <p class="text-black dark:text-white">{{ brand.name || 'N/A' }}</p>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <p class="text-black dark:text-white">{{ brand.visitors || 'N/A' }}K</p>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <p class="text-meta-3">${{ brand.revenues || 'N/A' }}</p>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <p class="text-black dark:text-white">{{ brand.sales || 'N/A' }}</p>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <p class="text-meta-5">{{ brand.conversion || 'N/A' }}%</p>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <p class="text-black dark:text-white">{{ brand.state || 'N/A' }}</p>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <p class="text-black dark:text-white">{{ brand.owner || 'N/A' }}</p>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <p class="text-black dark:text-white">{{ brand.createdDate || 'N/A' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
