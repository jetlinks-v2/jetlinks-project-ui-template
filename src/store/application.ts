import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useApplication = defineStore('application', () => {
  const apps = ref([])

  const queryApplication = () => {


  }


  const findAppById = (appId:string) => apps.value.find((item: any) => item.id === appId)

  return {
    apps,
    queryApplication,
    findAppById
  }
})
