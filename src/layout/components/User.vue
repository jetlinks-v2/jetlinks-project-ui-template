<template>
  <j-dropdown placement="bottomRight">
    <div class="user-info">
      <j-avatar :size="28" src="" />
      <span class="name">{{ userName }}</span>
    </div>
    <template #overlay>
      <j-menu @click="click">
        <j-menu-item key="userCenter">
          <AIcon type="UserOutlined" style="margin-right: 8px;" />
          <span>个人中心</span>
        </j-menu-item>
        <j-menu-item key="logout">
          <AIcon type="LogoutOutlined" style="margin-right: 8px;" />
          <span>退出登录</span>
        </j-menu-item>
      </j-menu>
    </template>
  </j-dropdown>
</template>

<script setup lang="ts" name="HeaderUser">
import { computed } from "vue";
import { jumpLogin, useRouter } from '@jetlinks/router'
import { useUserStore } from '@/store/user'
import { logout } from '@/api/login'

const userStore = useUserStore()
const router = useRouter()
const click = (e: {key: string}) => {
  switch (e.key) {
    case 'userCenter':
      router.push('/account/center')
      return;
    case 'logout':
      logout().then((resp) => {
        if (resp.success) {
          jumpLogin()
        }
      })
      return;
    default:
        return
  }
}

const userName = computed(() => {
  return userStore.userInfo.name
})

</script>

<style scoped lang="less">
.user-info {
  cursor: pointer;

  .name {
    padding: 0 12px;
  }
}
</style>
