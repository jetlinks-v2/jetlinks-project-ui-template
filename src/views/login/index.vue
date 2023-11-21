<template>
  <j-spin :spinning='loading' :delay='300'>
    <div class='container'>
      <div class='left'>
        <img :src='systemInfo?.backgroud || bgImage' alt=''>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer" class="records">
          备案：渝ICP备19017719号-1
        </a>
      </div>
      <div class='right'>
        <Right :logo="systemInfo?.logo" :title="systemInfo?.title" :loading="loading" @submit="submit" />
      </div>
    </div>
  </j-spin>
</template>
<script setup name="Login" lang="ts">
import { useRequest } from '@jetlinks-web/hooks'
import { login, encryptionConfig } from '@/api/login'
import { getImage, setToken, encrypt } from '@jetlinks-web/utils'
// import { systemVersion, settingDetail } from '@/api/system'
import { useUserStore } from '@/store/user'
import { useSystemStore } from '@/store/system'
import { storeToRefs } from 'pinia'
import Right from './right.vue'
import { cloneDeep } from "lodash-es";

const userStore = useUserStore()
const systemStore = useSystemStore()
const { systemInfo } = storeToRefs(systemStore)

// const { data: sysVersion } = useRequest<any, { version: string}>(systemVersion)

const { loading, run } = useRequest(login, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
      setToken(res.result.token)
      userStore.getUserInfo()
      window.location.href = '/'
    }
  }
})

const { data: encryption } = useRequest(encryptionConfig)

const bgImage = getImage('/login/login.png')

const submit = (data: any) => {
  const copyData = cloneDeep(data)

  if (encryption.value?.encrypt?.enabled) {
    const _encrypt = encryption.value?.encrypt
    copyData.password = encrypt(data.password, _encrypt.publicKey)
    copyData.encryptId = _encrypt.id
  }
  run(copyData)
}

systemStore.queryInfo()

</script>

<style scoped lang="less">
.container {
  display: flex;
  height: 100vh;
  background-color: #fff;
  >div {
    height: 100%;
  }

  .left {
    flex: 1;
    img {
      height: 100%;
      width: 100%;
    }
    .records {
      position: absolute;
      top: 96%;
      left: 35%;
      color: rgba(0, 0, 0, 0.35);
      font-size: 14px;
    }
  }

  .right {
    min-width: 400px;
    width: 27%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
