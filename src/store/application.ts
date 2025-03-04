import { defineStore } from 'pinia'
import { ref } from 'vue'
import {uiList} from "@/api/application";

export const useApplication = defineStore('application', () => {
  const appList = ref<Record<string, string>[]>([])

  const queryApplication = async () => {
    const resp = await uiList()
    if (resp.success) {
      appList.value = resp.result
      // appList.value = [{
      //   id: 'device-manager',
      //   path: 'http://localhost:9101/'
      // }]
    }
  }


  const findAppById = (appId:string) => appList.value.find((item: any) => item.id === appId)

  return {
    appList,
    queryApplication,
    findAppById
  }
})
