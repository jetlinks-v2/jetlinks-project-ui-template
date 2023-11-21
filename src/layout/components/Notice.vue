<template>
  <div class="notice-container">
    <j-dropdown
      v-model:visible="visible"
      :trigger="['click']"
      @visible-change="visibleChange"
    >
      <j-badge :count="total" :offset="[3, -3]">
        <AIcon type="BellOutlined" style="font-size: 16px" />
      </j-badge>
      <template #overlay>

      </template>
    </j-dropdown>
  </div>
</template>

<script setup lang="ts" name="Notice">
import { ref } from 'vue'
import { useWebSocket } from '@jetlinks-web/hooks'

const visible = ref(false)
const total = ref(0)
const loading = ref(false)

const { send } = useWebSocket({
  onMessage(data) {
    // 消息处理
    console.log(data)
  }
})

const visibleChange = (v: boolean) => {
  visible.value = v
}

send('notification','/notifications')


</script>

<style scoped lang="less">
.notice-container {
  margin-right: 24px;

}
</style>
