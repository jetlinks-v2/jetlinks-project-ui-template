<template>
  <page-container>
    <j-form :model="formData" layout="vertical" :rules="formRules" ref="formRef">
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
            <!-- 高德地图API Key输入框 -->
            <j-form-item label="高德地图API Key" name="apiKey">
              <j-input v-model:value="formData.apiKey" placeholder="请输入高德API Key"></j-input>
            </j-form-item>
            <!-- base-path输入框 -->
            <j-form-item label="base-path" name="basePath">
              <j-input v-model:value="formData.basePath" placeholder="{http/https}: //{前端所在服务器IP地址}:{前端暴露的服务端口}/api"></j-input>
            </j-form-item>
            <!-- 系统logo 和 浏览器标签 -->
            <div class="form-left-div">
              <!-- 系统logo -->
              <div class="form-left-logo">
                <j-form-item label="系统logo">
                  <Upload :drag="uploadInfo.drag" 
                            :headers="uploadInfo.headers"
                            :accept="uploadInfo.imageType" 
                            :beforeUpload="uploadInfo.isLogoImage"
                            :showUploadList="uploadInfo.showUploadList"
                            :change="uploadInfo.changeLogoUpload"
                            :action="uploadInfo.action" 
                            :imgSrc="`${formData.logo}`"
                            :messages="uploadInfo.logoTip"/>
                </j-form-item>
              </div>
              <!-- 浏览器页签icon -->
              <div class="form-left-ico">
                <j-form-item label="浏览器页签">
                  <Upload :drag="uploadInfo.drag" 
                            :headers="uploadInfo.headers"
                            :accept="uploadInfo.icoTyep" 
                            :beforeUpload="uploadInfo.isicoImage"
                            :showUploadList="uploadInfo.showUploadList"
                            :change="uploadInfo.changeicoUpload"
                            :action="uploadInfo.action" 
                            :imgSrc="`${formData.ico}`"
                            :messages="uploadInfo.icoTip"/>
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
              <j-form-item label="登录背景图" name="background" :beforeUpload="uploadInfo.isImageLess4M">
                <Upload :drag="uploadInfo.drag" 
                            :headers="uploadInfo.headers"
                            :accept="uploadInfo.imageType" 
                            :beforeUpload="uploadInfo.isbackground"
                            :showUploadList="uploadInfo.showUploadList"
                            :change="uploadInfo.changebackgroundUpload"
                            :action="uploadInfo.action" 
                            :imgSrc="`${formData.background}`"
                            :messages="uploadInfo.backgroundTip"
                            :height="`400px`"
                            :width="`550px`"/>
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
import { formDataType, uploadInfoType } from './typing'
import { useRequest } from '@jetlinks/hooks';
import { save_api } from '@/api/basis';
import { message } from 'jetlinks-ui-components'
import { useSystemStore } from '@/store';
import { TOKEN_KEY, BASE_API } from '@jetlinks/constants'
import { getImage, getToken } from '@jetlinks/utils'
import Upload from './components/upload.vue'


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
  ]
}

// 主题色下拉框选项
const headerThemeAreas = ref([
  { label: '白色', value: 'light' },
  { label: '黑色', value: 'dark' }
])

// 上传相关信息
const uploadInfo: uploadInfoType = {
  logoTip: ['推荐尺寸200*200', '支持jpg,png,jfif,pjp,pjpeg,jpeg'],
  icoTip: ['推荐尺寸64*64', '支持ico格式'],
  backgroundTip: ['支持4M以内的图片: 支持jpg,png,jfif,pjp,pjpeg,jpeg', '建议尺寸1400x1080'],
  // 上传的地址
  action: `${BASE_API}/file/static`,
  headers: { [TOKEN_KEY]: getToken() },
  // 上传的状态
  logoLoading: false,
  icoLoading: false,
  backgroundLoading: false,
  // 是否展示uplaodList
  showUploadList: false,
  // 是否支持拖拽
  drag: true,
  // 上传接受的类型
  imageType: ['.jpg', '.png', '.jfif', '.pjp', '.pjpeg', '.jpeg'].toString(),
  icoTyep: ['image/x-icon'].toString(),

  //验证图片是否小于4M
  isImageLess4M: (file: File) => {
    const isLess = 1.0 * file.size / 1024 / 1024 < 4
    if (!isLess) {
      message.error("支持4M以内的图片")
    }
    return isLess
  },

  //验证图片大小是否小于1M
  isImageLess1M: (file: File) => {
    const isLess = 1.0 *  file.size / 1024 / 1024 < 1
    if (!isLess) {
      message.error("支持1M以内的图片")
    }
    return isLess
  },

  // 验证是否是图片类型
  isImageType: (file: File) => {
    const isImage =uploadInfo.imageType.split(',')
        .map((m: string) => m.split('.')[1])
        .filter((typeStr) => file.type.includes(typeStr)).length > 0
    if(!isImage) {
      message.error("请上传jpg png格式的图片")
    }
    return isImage
  },

  // 验证是否时ico类型
  isicoType: (file: File) => {
    const isico = file.type.includes("x-icon")
    if(!isico) {
      message.error("请上传ico格式的文件")
    }
    return isico
  },

  // 上传change事件
  changUpload: (info: any, loading: string, image: string, msg: string) => {
    if (info.file.status === 'uploading') {
      formData[loading] = true
    } else if (info.file.status === 'done') {
      info.file.url = info.file.response?.result
      formData[loading] = false
      formData[image] = info.file.url
    } else if (info.file.status === 'error') {
      formData[loading] = false
      message.error(msg + '上传失败，请稍后再试')
    }
  },

  // logo上传change事件
  changeLogoUpload: (info: any) => uploadInfo.changUpload(info, "logoLoading", "logo", "系统logo"),

  // 浏览器页签上传change事件
  changeicoUpload: (info: any) => uploadInfo.changUpload(info, "icoLoading", "ico", "浏览器页签"),

  // 背景图片上传change事件
  changebackgroundUpload: (info: any) => uploadInfo.changUpload(info, "backgroundLoading", "background", "登录背景图"),

  // logo 上传验证
  isLogoImage: (file: File) => {
    return uploadInfo.isImageType(file) && uploadInfo.isImageLess4M(file) 
  },

  // icon 上传验证
  isicoImage: (file: File) => {
    return uploadInfo.isicoType(file) && uploadInfo.isImageLess1M(file) 
  },

  // 背景图片上传验证
  isbackground: (file: File) => {
    return uploadInfo.isImageType(file) && uploadInfo.isImageLess4M(file)
  }
}

// 修改系统信息
const getDetails = async () => {
  const system = useSystemStore()
  await system.queryInfo()
  Object.assign(formData, {
    title: system.layout?.title,
    headerTheme: system.theme,
    logo: system.layout?.logo || '/logo.png',
    ico: system.systemInfo?.ico || '/favicon.ico',
    background: system.systemInfo?.background || '/images/login.png',
    apiKey: system.systemInfo?.apiKey,
    basePath: system.systemInfo?.basePath,
  })
}

// 保存请求
const { loading, run} = useRequest(save_api, {
  immediate: false,
  onSuccess(res) {
    if(res.success) {
      message.success('保存成功')
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
@import "basis.less";
</style>