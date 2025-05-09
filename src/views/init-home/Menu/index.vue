<template>
    <div class="menu-style">
        <div class="menu-img">
            <img :src="getImage('/init-home/menu.png')" />
        </div>
        <div class="menu-info">
            <b>{{ $t('Menu.index.459633-0', [menusData.count]) }}</b>
            <div>{{ $t('Menu.index.459633-2') }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getImage } from '@jetlinks-web/utils'
import { USER_CENTER_MENU_DATA } from '../data/baseMenu'
import BaseMenuData, { mergeMenuData, handleMenuOptions } from '../data'
import { updateMenus, getSystemPermission } from '@/api/initHome';
import { useApplication } from '@/store'
import {BASE_API} from "@jetlinks-web/constants";

const app = useApplication()
/**
 * 获取菜单数据
 */
const menusData = reactive<{ count: number; current: any[]}>({
    count: 0,
    current: [],
});

/**
 * 过滤菜单
 */
const filterMenu = (
  permissions: string[],
  menus: any[],
) => {
  return menus.filter((item) => {
    let isShow = false;
    if (item.showPage && item.showPage.length) {
      isShow = item.showPage.every((pItem: any) => {
        return permissions.includes(pItem);
      });
    }
    if (item.children) {
      item.children = filterMenu(permissions, item.children);
    }

    return isShow || !!item.children?.length;
  });
};


/**
 * 获取当前系统权限信息
 */
const getSystemPermissionData = async (BaseMenu: any[]) => {
  const resp = await getSystemPermission();
  if (resp.success) {
    const newTree = filterMenu(
      resp.result.map((item: any) => JSON.parse(item).id),
      BaseMenu,
    );
    const _count = menuCount(newTree);
    menusData.current = newTree;
    menusData.count = _count;
  }
  console.log(menusData.current)
};

const getCloudMenu = async () => {
  let bseMenus = BaseMenuData();

  if (app.appList.length > 0) {
    const appItems = app.appList.filter(item => !item.path.startsWith('http'))

    for (const item of appItems) {
      let _path = item.path.startsWith('/') ? item.path : '/' + item.path
      const url = `${window.location.protocol}//${document.location.host}${BASE_API}${_path}/baseMenu.json`
      const resp = await fetch(url)
      if (resp.ok) {
        const res = await resp.json()
        bseMenus = mergeMenuData(bseMenus, handleMenuOptions(res, item))
      }
    }
  }

  getSystemPermissionData(bseMenus)
}

/**
 * 计算菜单数量
 */
const menuCount = (menus: any[]): number => {
    return menus.reduce((pre, next) => {
        let _count = 1;
        if (next.children?.length) {
            _count = menuCount(next.children);
        }
        return pre + _count;
    }, 0);
};
/**
 * 添加options show用于控制菜单是否显示函数
 */
const dealMenu = (data:any) =>{
    data.forEach((item:any)=>{
        item.options = Object.assign({
          show: true
        }, item?.options || {})
        if(item.children){
            dealMenu(item.children)
        }
    })
}
/**
 * 初始化菜单
 */
const initMenu = async () => {
    return new Promise(async (resolve) => {
      //  用户中心
        dealMenu(menusData.current)
        const res = await updateMenus([...menusData.current, USER_CENTER_MENU_DATA]);
        resolve(res.success)
    });
};

onMounted(()=>{
  getCloudMenu()
})

defineExpose({
    updateMenu: initMenu,
});
</script>
<style lang="less" scoped>
.menu-style {
    display: flex;
    align-items: center;
    .menu-img {
        margin-right: 16px;
    }
}
</style>
