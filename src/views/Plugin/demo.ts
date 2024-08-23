export default `<template>
<a-form-item label="端点url" :name="['configuration', 'endpoint']">
  <a-input
      placeholder="请输入端点url"
      v-model:value="formData.configuration.endpoint"
  />
</a-form-item>
<a-form-item  label="安全策略"  :name="['configuration', 'securityPolicy']" >
    <a-select
    style="width: 100%"
    allowClear
    show-search
    v-model:value="formData.configuration.securityPolicy"
    :options="optionsMap['security-policies']"
    placeholder="请选择安全策略"
    :filter-option="filterOption"
    />
</a-form-item>
<a-form-item  label="安全模式"  :name="['configuration', 'securityMode']" >
   <a-select
   style="width: 100%"
   v-model:value="formData.configuration.securityMode"
   :options="optionsMap['security-modes']"
   placeholder="请选择安全模式" 
   allowClear  
   show-search
   :filter-option="filterOption"
   />
</a-form-item>
<a-form-item label="权限认证" :name="['configuration', 'authType']"> 
     <j-card-select    
     placeholder="请输入Modbus主机IP"    
     v-model:value="formData.configuration.authType"    
     :options="optionsMap['auth-types']"    
     :column="2"  
     />
 </a-form-item>
 </template>
 <script setup>
     import { inject, ref } from 'vue'
     import { request } from '@jetlinks-web/core'
     
     const formData = inject('plugin-form', {configuration: {}})    
     const optionsMap = ref({'auth-types': [], 'security-modes': [], 'security-policies': [],  })    
     const getOptionsList = () => {      
         const requestArr = Object.keys(optionsMap.value).map(key => request.get('/data-collect/opc/' + key))      
         Promise.all(requestArr).then((resp) => {        
             resp.forEach((item, index) => {
                 const arr = item.result.map(a => ({ label: a?.text || a, value: a?.value || a}))         
                 if (index === 0) {              
                     optionsMap.value['auth-types'] = arr          
                 } else if (index === 1) {            
                     optionsMap.value['security-modes'] = arr          
                 } else {            
                     optionsMap.value['security-policies'] = arr         
                 }        
             })
         })    
     }    
     getOptionsList()    
<\/script>
<style><\/style>`

const detail = `<template>
<a-descriptions bordered :column="3">
    <a-descriptions-item label="详情字段1">{{ detail.value1 }}</a-descriptions-item>
    <a-descriptions-item label="详情字段2">{{ detail.value2 }}</a-descriptions-item>
    <a-descriptions-item label="详情字段3">{{ detail.value3 }}</a-descriptions-item>
</a-descriptions>
</template>
<script setup>
    import { reactive } from 'vue'
    const detail = reactive({
        value1: 'value1',
        value2: 'value2',
        value3: 'value3',
    })
<\/script>
<style>

<\/style>`

const form = `<template>
<a-form-item label="Modbus主机IP" :name="['configuration', 'host']">
          <a-input
              placeholder="请输入Modbus主机IP"
              v-model:value="formData.configuration.host"
            />
        </a-form-item>
        <a-form-item label="字段名称" :name="['configuration', 'port']">
          <a-input-number
              style="width: 100%"
              placeholder="请输入端口"
              v-model:value="formData.configuration.port"
              :min="0"
              :max="65535"
            />
        </a-form-item>
</template>
<script setup>
    import { inject } from 'vue'
    const formData = inject('plugin-form', {configuration: {}})
<\/script>
<style>

<\/style>`

const table = `<template>
    <j-pro-table :columns="columns" :dataSource="dataSource"></j-pro-table>
</template>
<script setup>

<\/script>
`

const defaultModule = `<template>
    
</template>
<script setup>

<\/script>
`

export const module_table = {
    code: `<j-pro-table :columns="columns" :dataSource="dataSource" />`,
    script: `const columns = [
    { dataIndex: 'key1', title: '字段1' }, 
    { dataIndex: 'key2', title: '字段2' }
    ]
    const dataSource = ref([{ key1: '测试key11', key2: '测试key21'}, { key1: '测试key12', key2: '测试key22'}])
    `
}

export const module_search = {
    code: `<j-search
        :columns="columns"
      />`
}

export const codeView = `<template>
    <a-form layout="vertical">
       <a-form-item label="通道名称" name="name">
        <a-skeleton-input style="width: 100%" />
      </a-form-item>
      <a-form-item label="通讯协议" name="provider">
        <a-select style="width: 100%" :options="options" @select="onSelect" />
      </a-form-item>
      <a-form-item label="自定插件位置" name="provider">
        <a-skeleton-input style="width: 100%" />
      </a-form-item>
      <a-form-item label="说明" name="provider">
        <a-skeleton-input style="width: 100%; height: 120px" />
      </a-form-item>
</a-form>
</template>
<script setup>
import { ref, inject } from 'vue'

const content = inject('plugin-content')
const options = ref([{ label: 'OPC_UA', value: 'OPC_UA'}, { label: 'MODBUS_TCP', value: 'MODBUS_TCP'}, { label: 'COLLECTOR_GATEWAY', value: 'COLLECTOR_GATEWAY' },{ label: 'S7', value: 'snap7' }])

const onSelect = (e) => {
    content.record.observe = e
}

<\/script>
`
export const insertContentMap = {
    defaultModule, detail, form, table, module_table, module_search
}
