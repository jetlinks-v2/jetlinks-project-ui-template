<template>
  <a-modal
    visible
    title="新增"
    :width="1000"
    :confirm-loading="loading"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div class="plugin-save">
      <a-form
        layout="vertical"
        :model="saveData"
        ref="formRef"
      >
        <a-form-item label="插件名称" name="name">
          <a-input v-model:value="saveData.name" placeholder="请输入插件名称" />
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="3">
            <a-form-item label="是否为页面" >
              <a-switch v-model:checked="saveData.page.isPage"/>
            </a-form-item>
          </a-col>
          <a-col :span="6" v-if="saveData.page.isPage">
            <a-form-item label="页面code">
              <a-input v-model:value="saveData.page.code" placeholder="请输入页面code" />
            </a-form-item>
          </a-col>
          <a-col :span="6" v-if="saveData.page.isPage">
            <a-form-item label="页面url">
              <a-input v-model:value="saveData.page.url" placeholder="请输入页面url" />
            </a-form-item>
          </a-col>
          <a-col :span="6" v-if="saveData.page.isPage">
            <a-form-item label="页面名称">
              <a-input v-model:value="saveData.page.name" placeholder="请输入页面名称" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="插件位置">
          <a-form-item-rest >
            <div class="plugin-save-body">
              <div class="plugin-save-tree" style="width: 300px">
                <a-tree
                  :tree-data="treeData"
                  :fieldNames="{ title: 'name', key: 'code', children: 'children' }"
                  @select="onSelect"
                >
                  <template #icon="{ key, icon }">
                    <AIcon :type="icon" />
                  </template>
                </a-tree>
              </div>
              <div class="plugin-save-skeleton">
                <RenderComponents v-if="pageRenderValue" :value="pageRenderValue" />
              </div>
            </div>
          </a-form-item-rest>
        </a-form-item>
      </a-form>

    </div>
  </a-modal>
</template>

<script setup>
import {codeView} from "./demo";
import {deleteSearchHistory, saveSearchHistory} from "@/api/comm";

const props = defineProps({
  editorValue: {
    type: String,
    default: undefined
  }
})

const emits = defineEmits(['ok', 'cancel'])
const pageRenderValue  = ref()
const loading = ref(false)

const saveData = reactive({
  observe: undefined,
  code: undefined,
  name: undefined,
  page: {
    isPage: false,
    code: undefined,
    url: undefined,
    name: undefined,
  }
})

provide('plugin-content', {
  record: saveData
})

const treeData = ref([
  {
    code: 'iot',
    name: '物联网',
    icon: 'icon-wulianwang',
    children: [
      {
        code: 'link/DataCollect',
        name: '数据采集',
        icon: 'icon-analytics',
        children: [{
          code: 'DataCollect/Channel',
          name: '通道管理',
          icon: 'icon-rizhifuwu',
          children: [{
            code: 'DataCollect/Channel:add',
            name: '新增表单',
            codeView: codeView
          }]
        }]
      }
    ]
  }
])

const onSelect = (e, node) => {
    const record = node.node
    saveData.code = record.code

    if (node.node.codeView) {
      pageRenderValue.value = record.codeView
    }
}

const onOk = async () => {
  loading.value = true

  await saveSearchHistory({
    content: JSON.stringify({
      ...toRaw(saveData),
      render: props.editorValue
    })
  },'web-plugin').catch(err => {

  }).finally(() => {
    loading.value = false
  })
  emits('ok')
}

const onCancel = () => {
  emits('cancel')
}

</script>

<style scoped lang="less">
.plugin-save {
  height: 600px;

  .plugin-save-body {
    display: flex;
  }

  .plugin-save-skeleton {
    flex: 1 1 0;
  }
}
</style>
