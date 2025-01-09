import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

interface Branch {
  name: string
  abbreviation: string
  address: string
  time_zone: string
  group_id: string
  workdays: string
  holidays: string
  work_hours: string
}

interface BranchData {
  id: string
  name: string
  abbreviation: string
  address: string
  time_zone: string
  group_id: string
  workdays: string
  holidays: string
  work_hours: string
}

interface BranchGroup {
  id: string
  name: string
}

export const useBranchStore = defineStore('branch', () => {
  const branchGroups = ref<BranchGroup[]>([])
  const branchLists = ref<BranchData[]>([])

  const addNewBranch = async (data: Branch) => {
    try {
      const response = await axios.post('https://api.edify.kz/api/v1/branches/', data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      console.log('Branch added successfully:', response.data)
    } catch (err) {
      console.error('Error adding branch:', err)
    }
  }

  const getBranchesList = async () => {
    try {
      const response = await axios.get('https://api.edify.kz/api/v1/branches/branch_groups/')
      if (response.data && response.data.Status === 'success') {
        branchGroups.value = response.data.groups
        console.log('Fetched branch groups:', branchGroups.value)
      } else {
        console.error('Unexpected API response:', response.data)
      }
    } catch (err) {
      console.error('Error fetching branch list:', err)
    }
  }
  const getBranchesListData = async () => {
    try {
      const response = await axios.get('https://api.edify.kz/api/v1/branches/')
      console.log(response)
      branchLists.value = response.data.branches
      console.log('Fetched branch groups:', branchGroups.value)
    } catch (err) {
      console.error('Error fetching branch list:', err)
    }
  }

  return {
    branchGroups,
    branchLists,
    getBranchesListData,
    getBranchesList,
    addNewBranch
  }
})
