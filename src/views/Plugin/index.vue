<template>
    <div class="plugin-warp">
      <div class="plugin-header">
        <a-space :size="24">
          <a-button type="link" @click="andtvJump">antdv(3.x) 官网</a-button>
          <a-button type="primary" @click="saveVisible = true">保存</a-button>
        </a-space>
      </div>
      <div class="plugin-container">

        <div class="plugin-render-body">
          <div style="height: 60%; overflow: auto">
            <RenderComponents :value="renderValue" />
          </div>
          <div style="height: 300px; padding: 4px">
            <a-table
              size="small"
              :columns="columns"
              :data-source="dataSource"
              :scroll="{y: 220}"
              :pagination="false"
            >
              <template #bodyCell="{ column, record}">
                <template v-if="column.dataIndex === 'name'">
                  {{ record.name || '-'}}
                </template>
                <template v-if="column.dataIndex === 'isPage'">
                  {{ record.page?.isPage ? '页面' : '组件' }}
                </template>
                <template v-if="column.dataIndex === 'action'">
                  <a-button type="link" style="padding: 4px 6px" @click="onUpdatePlugin(record)">编辑</a-button>
                  <a-button type="link" style="padding: 4px 6px" danger @click="onDelete(record)">删除</a-button>
                </template>
              </template>
            </a-table>
          </div>
        </div>
        <div class="plugin-editor">
          <Editor
            ref="editorRef"
            v-model:value="renderValue"
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
              </div>
              <div class="plugin-example-btn" @click="visible = !visible">
                <AIcon type="UnorderedListOutlined" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Save
      v-if="saveVisible"
      :editorValue="renderValue"
      @cancel="saveVisible = false"
      @ok="submit"
    />
</template>

<script setup>
import Editor from './editor.vue'
import Save from './save.vue'
import demoText, {insertContentMap} from './demo'
import {findMatches} from "@/views/Plugin/utils";
import {deleteSearchHistory, getSearchHistory} from "@/api/comm";
import {onlyMessage} from "@jetlinks-web/utils";

const renderValue  = ref(demoText)

const visible = ref(false)
const saveVisible = ref(false)
const editorRef = ref()

const columns = [
  { title: '插件名称', dataIndex: 'name', width: 120},
  { title: '插件code', dataIndex: 'code'},
  { title: 'observe', dataIndex: 'observe', width: 110},
  { title: '类型', dataIndex: 'isPage', width: 60},
  { title: '操作', dataIndex: 'action', width: 120}
]

const dataSource = ref([])
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

const submit = () => {
  init()
  saveVisible.value = false
}

const init = () => {
  getSearchHistory('web-plugin').then(resp => {
    if (resp.success) {
      dataSource.value = resp.result.map(item => {
        const content = JSON.parse(item.content)
        return {
          ...content,
          key: item.key,
          id: item.id
        }
      })
    }
  })
}

const onUpdatePlugin = (record) => {
  editorRef.value.updateValue(record.render)
  renderValue.value = record.render
}

const onDelete = (record) => {
  deleteSearchHistory('web-plugin', record.key).then(resp => {
    if (resp.success) {
      onlyMessage('操作成功')
      init()
    }
  })
}

init()

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
}
</style>
