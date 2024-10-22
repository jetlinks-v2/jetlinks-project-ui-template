<template>
    <div class="plugin-warp">
      <div class="plugin-header">
        <a-space :size="24">
          <a-button type="primary" @click="openDirectory">打开文件夹</a-button>
          <a-button type="link" @click="andtvJump">antdv(3.x) 官网</a-button>
          <a-button type="primary" @click="onSubmit" :loading="loading">保存</a-button>
        </a-space>
      </div>
      <div class="plugin-container">

        <div class="plugin-render-body">
          <div class="tabs">
            <a-radio-group v-model:value="fileData.codeActive" >
              <a-radio-button :value="item.name" v-for="item in fileData.context">{{ item.name }}</a-radio-button>
            </a-radio-group>
            <a-button type="primary" @click="addCodeItem">新增</a-button>
          </div>
          <div style="height: 90%; overflow: auto">
            <a-form :model="formModel" layout="vertical" ref="formRef">
              <RenderComponents :value="renderValue" :propsValue="{ data: { deviceType: 'S200'} }" />
            </a-form>
          </div>
          <div>
            <a-button @click="validate">校验</a-button>
          </div>
        </div>
        <div class="plugin-editor">
          <Editor
            ref="editorRef"
            v-model:value="renderValue"
            @change="codeChange"
          />
          <div :class="{ 'plugin-example': true, 'show': visible }">
            <div class="plugin-example-body">
              <div class="plugin-example-content">
                <div>模版</div>
                <a-space>
                  <a-button @click="updateCode('defaultModule')">初始化</a-button>
                  <a-button @click="updateCode('detail')">详情</a-button>
                  <a-button @click="updateCode('form')">表单</a-button>
                  <a-button @click="updateCode('table')">表格</a-button>
                </a-space>
                <div>组件</div>
                <a-space>
                  <a-button @click="insertCode('module_search')">查询</a-button>
                  <a-button @click="insertCode('module_table')">表格</a-button>
                </a-space>
                <div>协议</div>
                <div class="directory-tree">
                  <div v-for="item in directoryList" :class="{ 'directory-file': true, 'active': item.name === fileData.active}" @click="() => showCode(item)">
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="plugin-example-btn" @click="visible = !visible">
                <AIcon type="UnorderedListOutlined" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup name="Plugin">
import Editor from './editor.vue'
import { h } from 'vue'
import demoText, {insertContentMap} from './demo'
import {findMatches} from "@/views/Plugin/utils";
import { throttle } from 'lodash-es'
import { Modal, AutoComplete } from 'ant-design-vue'

const renderValue  = ref(demoText)

const visible = ref(false)
const loading = ref(false)
const editorRef = ref()
const activeKey = ref()

const formModel = reactive({})
const directoryList = ref([])

const addData = reactive({
  name: undefined
})

const fileData = reactive({
  active: '',
  context: [],
  codeActive: ''
})
const formRef = ref()

provide('plugin-form', formModel)

const columns = [
  { title: '插件名称', dataIndex: 'name', width: 120},
  { title: '插件code', dataIndex: 'code'},
  { title: 'observe', dataIndex: 'observe', width: 110},
  { title: '类型', dataIndex: 'isPage', width: 60},
  { title: '操作', dataIndex: 'action', width: 120}
]

const renderOption = [
  {
    value: 'channelRender',
    label: 'channelRender(通道)'
  },
  {
    value: 'collectorRender',
    label: 'collectorRender(采集器)'
  },
  {
    value: 'pointRender',
    label: 'pointRender(点位)'
  },
  {
    value: 'collectorDetailRender',
    label: 'collectorDetailRender(采集器详情)'
  },
]

const dataSource = ref([])

const validate = () =>{
  formRef.value.validateFields()
}
const insertCode = (key) => {
  const { code, script} = insertContentMap[key]
  const editor = editorRef.value.getInstance()

  if (code) {
    editorRef.value.insertValue(code)
  }
  if (script) {
    const matches = findMatches(editor, ['ref(', 'reactive(', 'import', '<\script setup>'])

    if (matches.length) {
      editorRef.value.insertValue(script, {
        column: 4,
        lineNumber: matches[0].range.endLineNumber + 1
      })
    }
  }

  renderValue.value =  editor.getModel()
}

const updateCode = (code) => {
  const _value = insertContentMap[code]
  editorRef.value.updateValue(_value)
  renderValue.value = _value
}

const andtvJump = () => {
  window.open('https://3x.antdv.com/components/form-cn/#Form-')
}

const handleArrayToObj = () => {
  return fileData.context.reduce((prev, next) => {
    const { name, value } = next
    prev[name] = value
    return prev
  }, {})
}
const onSubmit = async () => {
  const fileHandle = directoryList.value.find(item => item.name === fileData.active)
  loading.value = true
  const writable = await fileHandle.createWritable() // 对待修改文件开启写入流
  const obj = handleArrayToObj()
  const text = JSON.stringify(obj)
  await writable.write(text) // 开始写入
  await writable.close() // 关闭写入流
  loading.value = false
}

const handleDirectory = async (handle) => {
  if (handle.kind === 'file' && handle.name.includes('.json')) {
    return handle
  }
  handle.children = []

  const iter = await handle.entries(); // 获取文件夹中的所有文件

  for await (const info of iter) {
    const subHandle = await handleDirectory(info[1])
    handle.children.push(subHandle)
  }

  return handle
}

const showCode = async (handle) => {
  const file = await handle.getFile()
  const text = await file.text()

  fileData.active = handle.name
  try {
    const json = JSON.parse(text)
    fileData.context = Object.keys(json).map(key => {
      return {
        name: key,
        value: json[key]
      }
    })
    fileData.codeActive = fileData.context[0]?.name
  } catch (e) {
    console.error(e)
  }
}

const codeChange = throttle((code) => {
  const item = fileData.context.find(item => item.name === fileData.codeActive)
  if (item) {
    item.value = code
  }
}, 100)

const openDirectory = async () => {
  try {
    const directory = await showDirectoryPicker()

    const root = await handleDirectory(directory)

    directoryList.value = root.children

  } catch (e) {
    console.error(e)
  }
}

const addCodeItem = () => {
  Modal.confirm({
    content: h(AutoComplete, { placeholder: '请输入名称', style: { width: '100%' }, options: renderOption, onChange: (e) => {
        addData.name = e
      }}),
    icon: null,
    okText: '确定',
    onOk() {
      fileData.context.push({
        name: addData.name,
        value: `<template>

    </template>
    <script>

    <\/script>
    `
      })
      fileData.codeActive = addData.name
    },
    onCancel() {

    }
  })
}

watch(() => fileData.codeActive, () => {
  const item = fileData.context.find(item => item.name === fileData.codeActive)
  editorRef.value.updateValue(item.value)
  renderValue.value = item.value
})

</script>

<style scoped lang="less">
.plugin-warp {
  height: 100vh;
  overflow: hidden;
}

.plugin-header {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  box-shadow: 0 1px 16px 0 rgba(38, 50, 55, 0.05);
  flex-direction: row-reverse;
}

.plugin-container {
  display: flex;
  height: calc(100% - 56px);

  .tabs {
    margin-bottom: 12px;
  }
}

.plugin-render-body {
  width: 40%;
  padding: 24px;
}

.plugin-editor {
  flex: 1 1 auto;
  min-width: 0;
  position: relative;

  .plugin-example {
    position: absolute;
    top: 0;
    right: 0;
    width: 500px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 12px rgba(0,0,0, .2);
    transform: translateX(100%);
    transition: transform .3s;
    z-index: 9999;

    &.show {
      transform: translateX(0);
    }

    .plugin-example-body {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 12px;

      .plugin-example-content {
        height: 100%;
      }

      .plugin-example-btn {
        position: absolute;
        left: 10px;
        top: 50%;
        background-color: #fff;
        padding: 8px;
        font-size: 20px;
        border-radius: 6px 0 0 6px;
        transform: translateX(-100%);
      }
    }
  }

  .directory-file {
    font-size: 16px;
    padding: 16px;
    border-radius: 6px;
    border: 1px solid #9d9ea1;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    &.active {
      border-color: @primary-color;
      color: @primary-color;
    }
  }
}
</style>
