import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import router from "@/router";

export const useLogInStore = defineStore("login", () => {
    const jwt = ref<string | null>(null); 

  return {
    jwt,
    async login(data: FormData | Record<string, any>) {
        try{
            const response = axios.post('https://api.edify.kz/api/v1/login/access-token', data);
            jwt.value = (await response).data.access_token;
            // jwt.value = "1234"
            if (jwt.value) {
                sessionStorage.setItem("token", jwt.value);
            }
            router.push('/');
        }catch(err){
            console.log(err)
        }
    },
  };
});
