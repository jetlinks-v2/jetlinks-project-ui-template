// 是否不是community版本
import {getToken} from "@jetlinks-web/utils";
import { useSystemStore } from '@/store'

export const isNoCommunity = !(localStorage.getItem('version_code') === 'community');

export const openEdgeUrl = (id: string) => {
  const systemStore = useSystemStore()

  window.open(`/ui/edge/cloud/default/index.html/#/login?token=${getToken()}&thingId=${id}&deviceId=${id}&terminal=cloud-pc&thingType=device`)
}
