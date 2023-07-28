<template>
  <page-container>
<<<<<<< HEAD
    <j-form :model="formData" layout="vertical" :rules="formRules" ref="formRef"  :confirmLoading="loading>
=======
    <j-form :model="formData" layout="vertical" :rules="formRules" ref="formRef" :confirmLoading="loading>
>>>>>>> 2138ceab8cef9cf9c541d6021de2268149a639c3
      <FullPage>
        <!-- 基本配置表单 -->
        <j-row class="form-container">
          <!-- 表单左侧部分 -->
          <j-col :span="10" class="form-left">
            <!-- 系统名称输入框 -->
            <j-form-item label="系统名称" name="title">
              <j-input v-model:value="formData.title" placeholder="请输入系统名称"></j-input>
            </j-form-item>
            <!-- 主题色输入框 -->
            <j-form-item label="主题色" name="headerTheme">
              <j-select v-model:value="formData.headerTheme" :options="headerThemeAreas">
                </j-select>
            </j-form-item>
            <!-- 高德地图API Key输入框 <AIcon type="QuestionCircleOutlined" /> -->
            <j-form-item name="apiKey">
              <template #label>
                <j-space>
                  <span>高德API Key</span>
                  <j-tooltip title="配置后平台可调用高德地图GIS服务">
                    <AIcon type="QuestionCircleOutlined" />
                  </j-tooltip>
                </j-space>
              </template>
              <j-input v-model:value="formData.apiKey" placeholder="请输入高德API Key"></j-input>
            </j-form-item>
            <!-- base-path输入框 -->
            <j-form-item name="basePath">
              <template #label>
                <j-space>
                  <span>base-path</span>
                  <j-tooltip>
                    <template #title>
                      <div style="word-break: break-all">
                        <div>系统后台访问的url。</div>
                        <div>
                          格式：{http/https}:
                          //{前端所在服务器IP地址}:{前端暴露的服务端口}/api
                        </div>
                      </div>
                    </template>
                    <AIcon type="QuestionCircleOutlined" />
                  </j-tooltip>
                </j-space>
              </template>
              <j-input v-model:value="formData.basePath" placeholder="请输入 base-path"></j-input>
            </j-form-item>
            <!-- 系统logo 和 浏览器标签 -->
            <div class="form-left-div">
              <!-- 系统logo -->
              <div class="form-left-logo">
                <j-form-item label="系统logo">
                  <Upload uploadType="logo" v-model:img-src="formData.logo"/>
                </j-form-item>
              </div>
              <!-- 浏览器页签icon -->
              <div class="form-left-ico">
                <j-form-item label="浏览器页签">
                  <Upload uploadType="ico" v-model:img-src="formData.ico"/>
                </j-form-item>
              </div>
            </div>
            <!-- 保存按钮 -->
            <j-for-item>
              <PermissionButton @click="submit" type="primary" html-type="submit" hasPermission="system/Basis:update">保存</PermissionButton>
            </j-for-item>
          </j-col>
          <!-- 表单右侧部分 -->
          <j-col :span="14" class="form-right">
            <div class="form-right-background">
              <j-form-item label="登录背景图" name="background">
                <Upload uploadType="background" v-model:img-src="formData.background" height="400px" width="550px"/>
              </j-form-item>
            </div>
          </j-col>
        </j-row>
      </FullPage>
    </j-form>
  </page-container>
</template>
<script setup name="Basis" lang="ts">
import { ref, reactive } from 'vue'
import { formDataType } from '@/views/system/Basis/typing'
import { useRequest } from '@jetlinks/hooks';
import { save_api } from '@/api/basis';
import { useSystemStore } from '@/store';
import Upload from '@/views/system/Basis/components/upload/upload.vue'
import { onlyMessage } from '@jetlinks/utils';


// 表单数据
const formData = reactive<formDataType>({
  title: "",  // 系统名称
  headerTheme: "light",  // 主题色
  apiKey: "",  // 高德API Key
  basePath: `${window.location.origin}/api`,  // base-path
  logo: "/images/login/logo.png",  // 系统logo
  ico: "/favicon.ico",  // 浏览器页签
  background: "/images/login/login.png"  // 登录背景图
})

const formRef = ref()

// 表单验证规则
const formRules = {
  // 系统名称输入框验证规则
  title: [ 
    {
      required: true,
      message: '系统名称为必填项',
      trigger: 'blur'
    },
    {
      max: 64,
      message: '最多可输入64位'
    }
  ],
  // 主题色验证规则
  headerTheme: [
    {
      required: true,
    }
  ],
  basePath: [
    {
      required: true,
      message: "base-path为必填项",
      trigger: "blur"
    }
  ]
}

// 主题色下拉框选项
const headerThemeAreas = ref([
  { label: '白色', value: 'light' },
  { label: '黑色', value: 'dark' }
])

// 修改系统信息
const getDetails = async () => {
  const system = useSystemStore()
  await system.queryInfo()
  Object.assign(formData, {
    title: system.layout?.title,
    headerTheme: system.theme,
    logo: system.layout?.logo || '/images/login/logo.png',
    ico: system.systemInfo?.ico || '/favicon.ico',
    background: system.systemInfo?.background || '/images/login/login.png',
    apiKey: system.systemInfo?.apiKey,
    basePath: system.systemInfo?.basePath,
  })
}

// 保存请求
const { loading, run} = useRequest(save_api, {
  immediate: false,
  onSuccess(res) {
    if(res.success) {
      onlyMessage('保存成功', 'success')
      getDetails()
    }
  }
})

// 提交表单
const submit = () => {
  formRef.value.validate().then(() => {
    const params = [
      {
        scope: 'front',
        properties: {
          ...formData,
          apiKey: '',
          'basePath': '',
        },
      },
      {
        scope: 'amap',
        properties: {
          apiKey: formData.apiKey,
        },
      },
      {
        scope: 'paths',
        properties: {
          'basePath': formData.basePath,
        },
      },
    ]
    run(params)
  })
}

</script>
<style lang="less" scoped>
.form-container {
    display: flex;
    padding: 24px;
    height: 100%;
    .form-left {
      height: inherit;
      padding-right: 12px;
      .form-left-div {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        .form-left-logo {
            margin-right: 40px;
        }
      }
    }
    .form-right {
      flex: 1;
      padding-left: 12px;
      overflow: hidden;
      .form-right-bgImage {
        width: 100%;
        .bgImage-div {
            width: 550px;
            height: 400px;
        }
      }
    }
  }
</style>
