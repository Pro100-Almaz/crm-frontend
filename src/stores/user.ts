import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'


interface UserData {
  email: string,
  is_active: boolean,
  is_superuser: boolean,
  full_name: string,
  password: string
}

interface UserInfoData {
  email: string,
  is_active: boolean,
  is_superuser: boolean,
  full_name: string,
  id: string
} 

export const useUserDataStore = defineStore('userdata', () => {
  const userData = ref<UserInfoData[]>([]);

  const addNewUser = async ( data: UserData) => {

    console.log(sessionStorage.getItem('token'))

    try {
      const response = await axios.post('https://api.edify.kz/api/v1/users/', data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
      })
      console.log('Branch added successfully:', response.data)
    } catch (err) {
      console.error('Error adding branch:', err)
    }
  }
  const getUserData = async () => {

    try {
      const response = await axios.get('https://api.edify.kz/api/v1/users/', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
      })
      userData.value = response.data.data;
      console.log('Branch added successfully:', response.data)
    } catch (err) {
      console.error('Error adding branch:', err)
    }
  }

  return {
    addNewUser,
    getUserData,
    userData
  }
})
