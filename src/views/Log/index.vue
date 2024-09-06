<template>
    <j-page-container
        :tabList="list"
        :tabActiveKey="activeKey"
        @tabChange="onTabChange"
    >
        <FullPage>
          <div class="log-body">
            <AccessLog v-if="activeKey === '1'" />
            <SystemLog v-else />
          </div>
        </FullPage>
    </j-page-container>
</template>
<script lang="ts" setup name="LogPage">
import AccessLog from './Access/index.vue';
import SystemLog from './System/index.vue';
import { useRouterParams } from '@jetlinks-web/hooks';

const routerParams = useRouterParams();
const activeKey = ref('1');

const list = [
    {
        key: '1',
        tab: '访问日志',
    },
    {
        key: '2',
        tab: '系统日志',
    },
];

const onTabChange = (e: string) => {
    activeKey.value = e;
};

onMounted(() => {
    if (routerParams.params.value.tab === 'system') {
        activeKey.value = '2';
    }
});
</script>
<style lang="less">
.log-body {
  display: flex;
  flex-direction: column;
  height: 100%;

  .log-table {
    flex: 1 1 0;
    min-height: 0;
  }
}
</style>
