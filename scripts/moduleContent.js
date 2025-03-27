const generateImportContent = (hasSearch, hasTable) => {
    const keys = []
    let content = '';

    if (hasSearch) {
        keys.push('useSearch')
    }
    if (hasTable) {
        keys.push('getColumns')
    }

    if (keys.length > 0) {
        content += `import { ${keys.join(', ')} } from './data' \n`; 
    }

    if (hasTable) {
        content += `import EditModal from './edit.vue' \n`;
    }

    return content;
}

const generateDataVueContent = (hasSearch, hasTable, pageId) => {
  let content = `const authkey = '${pageId}'; // 权限标识\n`;

  if (hasSearch) {
    content += `const { params } = useSearch(); // pro-search相关配置\n`; 
  }

  if (hasTable) {
    content += `const columns = getColumns(); // pro-table需要的表头\n`;
    content += `const tableRef = ref(); // pro-table实例\n`;
    content += `const visible = ref(false); // 新增弹窗是否显示\n`;
    content += `const editData = ref(); // 编辑的数据\n`;
  }

  return content
}

const generateEventContent = () => {
  let content = `
/**
* 新增按钮点击事件
*/
const onAdd = () => {
  visible.value = true
}
/**
* 删除按钮点击事件
*/
const onDelete = (record) => {
  // TODO 请求删除接口，删除成功后刷新表格数据
  tableRef.value?.reload()
}
/**
* 按钮点击事件
*/
const onEdit = (record) => {
  editData.value = record
  visible.value = true
}
  
/**
* 查看按钮点击事件
*/
const onView = (record) => {
    
}
  
/**
* 编辑弹窗取消事件
*/
const onEditCancle = () => {
  visible.value = false
}
  
/**
* 编辑弹窗确认事件
*/
const onEditOk = () => {
  // TODO 提交编辑表单,成功后刷新表格数据
  onEditCancle()
  tableRef.value?.reload()
}
  
/**
* 
* @param {Object} record 单行数据
* @param {String} type 
*/
const getActions = (record, type = 'table') => {
  return [
    {
      key: 'update',
      text: '编辑',
      tooltip: {
        title: '编辑',
      },
      icon: 'EditOutlined',
      onClick: () => onEdit(record),
    },
    {
      key: 'delete',
      text: '删除',
      icon: 'DeleteOutlined',
      tooltip: {
        title: '删除',
      },
      popConfirm: {
        title: '确定删除？',
        onConfirm: () => onDelete(record),
      },
    },
  ]
}  
`;

    return content
}

const generateTemplateContent = (hasSearch, hasTable) => {
    let content = `
<template>
  <j-page-container>
    <FullPage>`;

    if (hasSearch) {
        content += `
      <!-- 搜索 -->
      <pro-search />`;
    }

    if (hasTable) {
        content += `
      <!-- 表格 -->
      <j-pro-table
        ref="tableRef"
        mode="TABLE"
        :params="params"
        :columns="columns"
        :defaultParams="{
          sorts: [
            { name: 'createTime', order: 'desc' },
          ],
        }"
      >
        <!-- 表格顶部左侧插槽 -->
        <template #headerLeftRender>
          <!-- 新增按钮 -->
          <j-permission-button type="primary" @click="onAdd" :hasPermission="\`\${authkey}:add\`">
            <template #icon>
              <AIcon type="PlusOutlined" />
            </template>
            新增
          </j-permission-button>
        </template>
        <!-- 操作 -->
        <template #action="{record, index}">
          <a-space>
            <template v-for="item in getActions(record)" :key="item.key">
              <j-permission-button
                type="link"
                v-bind="item"
                :hasPermission="item.hasAuth !== false ? \`\${authkey}:\${item.key}\` : true"
                :danger="item.danger || item.key === 'delete'"
                @click="item.onClick(record, index)"
              >
                <template #icon>
                  <AIcon :type="itema.icon" />
                </template>
              </j-permission-button>
            </template>
          </a-space>
        </template>
      </j-pro-table>`
    }
    
    content += `
    </FullPage>
  </j-page-container>`

    if (hasTable) {
        content += `<!-- 编辑弹窗 -->
  <EditModal
    v-if="visible"
    :editData="editData"
    @ok="onEditOk"
    @cancel="onEditCancle"
  />`;
}

    content += `
</template>
`;
    return content;
}

const generateIndexVueContent = (hasSearch, hasTable, pageId) => {
    let scriptContent = `<script setup> \n`
    scriptContent += generateImportContent(hasSearch, hasTable); // 插件导入
    scriptContent += generateDataVueContent(hasSearch, hasTable, pageId); // 数据定义
    scriptContent += generateEventContent(); // 事件定义
    scriptContent += `</script> \n`;

    let templateContent =  generateTemplateContent(hasSearch, hasTable); // 模版内容

    let styleContent = `
<style scoped lang="less"></style>
`;

    return scriptContent + templateContent + styleContent;
};

const createMenu = (code, name, index ) =>{
  const buttons = [
    {
      id: 'view',
      name: '查看',
      en: 'view',
    },
    {
      id: 'add',
      name: '新增',
      en: 'Add',
    },
    {
      id: 'update',
      name: '编辑',
      en: 'Edit',
    },
    {
      id: 'delete',
      name: '删除',
      en: 'Delete',
    },
  ]
    return {
        "code": code,
        "name": name,
        "url": `/${code}`,
        "owner": "iot",
        "i18nMessages": {
          "name": {
            "zh_CN": name,
            "en_US": "",
            "en": ""
          }
        },
        "icon": "icon-wulianwang",
        "sortIndex": index,
        "permissions": [],
        "showPage": [],
        "buttons": buttons.map(item => {
          return {
            "id": item.id,
            "name": item.name,
            "i18nMessages": {
              "name": {
                "zh_CN": item.name,
                "en_US": item.en,
                "en": item.en
              }
            },
            "permissions": []
          }
        }),
        "accessSupport": {
          "text": "不支持",
          "value": "unsupported"
        },
        "supportDataAccess": false
    };
}

module.exports = {
    generateIndexVueContent,
    createMenu
}