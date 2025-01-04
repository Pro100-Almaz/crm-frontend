import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useLogInStore = defineStore("login", () => {
    const jwt = ref<string | null>(null); 

  return {
    jwt,
    async login(data: FormData | Record<string, any>) {
        try{
            const response = axios.post('https://api.edify.kz/api/v1/login/access-token', data);
            jwt.value = (await response).data.access_token;
            if (jwt.value) {
                sessionStorage.setItem("token", jwt.value);
            }
            console.log(jwt)
        }catch(err){
            console.log(err)
        }
    },
  };
});
