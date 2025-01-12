import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'


interface BranchGroup {
  name: string;
}

export const useBranchGroupStore = defineStore('branchgroup', () => {

  const addNewBranchGroup = async ( groupName: string) => {
    try {
      const response = await axios.post('https://api.edify.kz/api/v1/branches/branch_groups/', {}, {
        params:{ name: groupName},
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      console.log('Branch added successfully:', response.data)
    } catch (err) {
      console.error('Error adding branch:', err)
    }
  }

  return {
    addNewBranchGroup
  }
})
