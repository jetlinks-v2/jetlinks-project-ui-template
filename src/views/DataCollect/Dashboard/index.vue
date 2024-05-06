<template>
    <j-page-container>
        <a-row :gutter="24">
            <a-col :span="8" v-for="item in StatusData" :key="item[0].type">
                <TopCard
                    :title="item[0].label"
                    :img="
                        getImage(`/DataCollect/dashboard/${item[0].type}.png`)
                    "
                    :footer="item"
                    :value="item[0].total"
                />
            </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 24px;">
            <a-col :span="24">
                <Card />
            </a-col>
        </a-row>
    </j-page-container>
</template>

<script setup lang="ts">
import TopCard from './components/TopCard.vue';
import Card from './components/Card.vue';
import { getImage } from '@jetlinks-web/utils';
import { queryCount } from '@/api/data-collect/dashboard';
import { defaultParams, statusData } from './tool';
import { useMenuStore } from '@/store/menu';

const menuPermission = useMenuStore().hasMenu;

const StatusData = ref(statusData);
const getNumberData = () => {
    StatusData.value.forEach(async (item: any) => {
        if(menuPermission(item[0]?.permission)) {
            const res = await queryCount(item[0].type, {});
            const resp = await queryCount(item[0].type, defaultParams);
            item[0].total = res?.result;
            item[0].value = resp?.result;
        }
    });
};
onMounted(() => {
    getNumberData();
});
</script>

<style lang="less" scoped></style>
