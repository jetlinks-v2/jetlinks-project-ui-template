<template>
  <j-pro-layout
    v-bind="config"
    v-model:openKeys="state.openKeys"
    v-model:collapsed="state.collapsed"
    @openKeys="openKeys"
    @select="select"
    :selectedKeys="state.selectedKeys"
    :breadcrumb="{ routes: breadcrumb }"
    :pure="state.pure"
  >
    <template #breadcrumbRender="slotProps">
      <a v-if="slotProps.route.index !== 0 && !slotProps.route.isLast" @click="() => jumpPage(slotProps.route)" >
        {{ slotProps.route.breadcrumbName }}
      </a>
      <span v-else style='cursor: default' >{{ slotProps.route.breadcrumbName }}</span>
    </template>

    <template #rightContentRender>
      <div class="right-content">
        <User />
      </div>
    </template>

      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="components || Component" />
        </keep-alive>
      </router-view>
  </j-pro-layout>
</template>

<script setup name="BasicLayoutPage" lang="ts">
import { useRouter, useRoute } from '@jetlinks/router'
import { reactive, computed, watchEffect } from 'vue'
import { User } from './components'
import { useSystemStore } from '@/store/system'
import { useMenuStore } from '@/store/menu'


type StateType = {
  collapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
  pure: boolean;
};

const router = useRouter();
const route = useRoute();
const systemStore = useSystemStore()
const menuStore = useMenuStore()

const components = computed(() => {
  const componentName = route.matched[route.matched.length - 1]?.components?.default?.name
  if (componentName !== 'BasicLayoutPage') {
    return route.matched[route.matched.length - 1]?.components?.default
  }
  return undefined
})


const config = reactive({
  theme: systemStore.theme,
  siderWidth: systemStore.layout.siderWidth,
  logo: systemStore.layout.logo,
  title: systemStore.layout.title,
  menuData: menuStore.siderMenus,
  layout: systemStore.layout.layout,
  splitMenus: systemStore.layout.layout === 'mix'
})

const state = reactive<StateType>({
  pure: false,
  collapsed: false, // default value
  openKeys: [],
  selectedKeys: [],
});

const openKeys = (keys: any) => {
  console.log(keys)
}

const select = (keys: any) => {
  console.log(keys)
}

/**
 * 面包屑
 */
const breadcrumb = computed(() =>
  {
    const paths = router.currentRoute.value.matched
    return paths.map((item, index) => {
      return {
        index,
        isLast: index === (paths.length -1),
        path: item.path,
        breadcrumbName: (item.meta as any).title || '',
      }
    })
  }
);

/**
 * 路由跳转
 */
const jumpPage = (route: { path: string}) => {
  router.push(route.path)
}

/**
 * 处理菜单选中，展开状态
 */
watchEffect(() => {
  if (router.currentRoute) {
    const paths = router.currentRoute.value.matched
    state.selectedKeys = paths.map(item => item.path)
    state.openKeys = paths.map(item => item.path)
    console.log(paths) //
  }
})

</script>

<style scoped>

</style>
