<template>
  <j-page-container>
    <FullPage>
      <div style="height: 100%;">
        <div style="overflow-y: auto; height: 100%; padding: 24px;">
          <a-form
              layout="vertical"
              ref="formRef"
              :rules="formRules"
              :model="formData"
          >
            <div class="form-container">
              <div class="form-left">
                <a-form-item label="系统名称" name="title">
                  <a-input
                      v-model:value="formData.title"
                      placeholder="请输入系统名称"
                  />
                </a-form-item>
                <a-form-item label="主题色" name="headerTheme">
                  <a-select v-model:value="formData.headerTheme" :options="headerThemeAreas">
                  </a-select>
                </a-form-item>
                <!-- 高德地图API Key输入框 <AIcon type="QuestionCircleOutlined" /> -->
                <a-form-item name="apiKey">
                  <template #label>
                    <a-space>
                      <span>高德API Key</span>
                      <a-tooltip title="配置后平台可调用高德地图GIS服务">
                        <AIcon type="QuestionCircleOutlined"/>
                      </a-tooltip>
                    </a-space>
                  </template>
                  <a-input v-model:value="formData.apiKey" placeholder="请输入高德API Key"></a-input>
                </a-form-item>
                <a-form-item name="webKey">
                  <template #label>
                    <a-space>
                      <span>高德Web Key</span>
                      <a-tooltip title="配置后平台可调用高德地图的地理数据服务">
                        <AIcon type="QuestionCircleOutlined"/>
                      </a-tooltip>
                    </a-space>
                  </template>
                  <a-input v-model:value="formData.apiWebKey" placeholder="请输入高德Web Key"></a-input>
                </a-form-item>
                <!-- base-path输入框 -->
                <a-form-item name="base-path">
                  <template #label>
                    <a-space>
                      <span>base-path</span>
                      <a-tooltip>
                        <template #title>
                          <div style="word-break: break-all">
                            <div>系统后台访问的url。</div>
                            <div>
                              格式：{http/https}:
                              //{前端所在服务器IP地址}:{前端暴露的服务端口}/api
                            </div>
                          </div>
                        </template>
                        <AIcon type="QuestionCircleOutlined"/>
                      </a-tooltip>
                    </a-space>
                  </template>
                  <a-input v-model:value="formData['base-path']" placeholder="请输入 base-path"></a-input>
                </a-form-item>
                <!-- 系统logo 和 浏览器标签 -->
                <a-row :gutter="24">
                  <!-- 系统logo -->
                  <a-col :span="12">
                    <a-form-item label="系统logo">
                      <Upload uploadType="logo" v-model:img-src="formData.logo"/>
                    </a-form-item>
                  </a-col>
                  <!-- 浏览器页签icon -->
                  <a-col :span="12">
                    <a-form-item label="浏览器页签">
                      <Upload uploadType="ico" v-model:img-src="formData.ico"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 保存按钮 -->
                <a-form-item>
                  <j-permission-button @click="submit" type="primary" html-type="submit" hasPermission="system/Basis:update">
                    保存
                  </j-permission-button>
                </a-form-item>
              </div>
              <!-- 表单右侧部分 -->
              <div class="form-right">
                <div class="form-right-background">
                  <a-form-item label="登录背景图" name="background">
                    <Upload uploadType="background" v-model:img-src="formData.background" height="400px" width="550px"/>
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
        </div>
      </div>
    </FullPage>
  </j-page-container>
</template>

<script setup name="Basis" lang="ts">
import {ref, reactive} from 'vue'
import {formDataType} from '@/views/system/Basis/typing'
import {useRequest} from '@jetlinks-web/hooks';
import {save_api} from '@/api/system/basis';
import {useSystemStore} from '@/store/system';
import Upload from '@/views/system/Basis/components/upload/upload.vue'
import {onlyMessage} from '@jetlinks-web/utils';
import {omit} from "lodash-es";

const system = useSystemStore()
// 表单数据
const formData = reactive<formDataType>({
  title: "",  // 系统名称
  headerTheme: "light",  // 主题色
  apiKey: "",  // 高德API Key
  apiWebKey: "", // 高德web key
  'base-path': `${window.location.origin}/api`,  // base-path
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
      message: '请输入系统名称',
      trigger: 'blur'
    },
    {
      max: 64,
      message: '最多可输入64个字符'
    }
  ],
  // 主题色验证规则
  headerTheme: [
    {
      required: true,
    }
  ],
  'base-path': [
    {
      required: true,
      message: "base-path为必填项",
      trigger: "blur"
    }
  ]
}

// 主题色下拉框选项
const headerThemeAreas = ref([
  {label: '白色', value: 'light'},
  {label: '黑色', value: 'dark'}
])


// 修改系统信息
const getDetails = async () => {
  await system.queryInfo()
  Object.assign(formData, {
    title: system.layout?.title,
    headerTheme: system.theme,
    logo: system.layout?.logo || '/images/login/logo.png',
    ico: system.systemInfo?.ico || '/favicon.ico',
    background: system.systemInfo?.front?.background || '/images/login/login.png',
    apiKey: system.systemInfo?.amap?.apiKey,
    apiWebKey: system.systemInfo?.amap?.apiWebKey,
    'base-path': system.systemInfo?.paths?.['base-path'] || `${window.location.origin}/api`,
  })
}

// 回显数据
onMounted(() => {
  getDetails()
})

// 保存请求
const {run} = useRequest(save_api, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
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
        properties: omit(formData, ['apiKey', 'apiWebKey', 'base-path'])
      },
      {
        scope: 'amap',
        properties: {
          apiKey: formData.apiKey,
          apiWebKey: formData.apiWebKey
        },
      },
      {
        scope: 'paths',
        properties: {
          'base-path': formData['base-path'],
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
  overflow-y: auto;

  .form-left {
    height: inherit;
    width: 50%;
  }

  .form-right {
    padding-left: 12px;
    width: 50%;

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
