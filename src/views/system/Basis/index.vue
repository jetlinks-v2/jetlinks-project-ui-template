<template>
  <page-container>
    <FullPage>
      <div class="basis-container">
        <j-form
          layout="vertical"
          ref="formRef"
          :rules="rulesFrom"
          :model="formValue"
        >
          <j-row :span="24" :gutter="24">
            <j-col :span="10">
              <j-form-item label="系统名称" name="title">
                <j-input
                  v-model:value="formValue.title"
                  placeholder="请输入系统名称"
                />
              </j-form-item>
              <j-form-item label="主题色" name="headerTheme">
                <j-select v-model:value="formValue.headerTheme">
                  <j-select-option value="light"> 白色 </j-select-option>
                  <j-select-option value="dark"> 黑色 </j-select-option>
                </j-select>
              </j-form-item>
              <j-form-item>
                <template #label>
                  <span>高德API Key</span>
                  <j-tooltip title="配置后平台可调用高德地图GIS服务">
                    <img
                      class="img-style"
                      :src="getImage('/init-home/mark.png')"
                    />
                  </j-tooltip>
                </template>
                <j-input
                  v-model:value="formValue.apiKey"
                  placeholder="请输入高德API Key"
                />
              </j-form-item>
              <j-form-item name="base-path">
                <template #label>
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

                    <img
                      class="img-style"
                      :src="getImage('/init-home/mark.png')"
                    />
                  </j-tooltip>
                </template>
                <j-input
                  v-model:value="formValue.basePath"
                  placeholder="{http/https}: //{前端所在服务器IP地址}:{前端暴露的服务端口}/api"
                />
              </j-form-item>
              <j-row :gutter="24" :span="24">
                <j-col>
                  <j-form-item label="系统logo">
                    <div class="upload-image-warp-logo">
                      <div class="upload-image-border-logo">
                        <j-upload
                          name="file"
                          :action="action"
                          :headers="headers"
                          :showUploadList="false"
                          :beforeUpload="uploader.beforeLogoUpload"
                          @change="uploader.handleChangeLogo"
                          :accept="uploader.imageTypes"
                        >
                          <div class="upload-image-content-logo">
                            <div class="loading-logo" v-if="logoLoading">
                              <AIcon type="LoadingOutlined" />
                            </div>
                            <div
                              class="upload-image"
                              style="height: 100%"
                              v-if="formValue.logo"
                              :style="
                                formValue.logo
                                  ? `background-image: url(${formValue.logo});`
                                  : ''
                              "
                            ></div>
                            <div
                              v-if="formValue.logo"
                              class="upload-image-mask"
                            >
                              点击修改
                            </div>
                            <div v-else>
                              <AIcon
                                :type="
                                  logoLoading
                                    ? 'LoadingOutlined'
                                    : 'PlusOutlined'
                                "
                              />
                            </div>
                          </div>
                        </j-upload>
                        <div v-if="logoLoading">
                          <div class="upload-loading-mask">
                            <AIcon type="LoadingOutlined" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="upload-tips">推荐尺寸200*200</div>
                    <div class="upload-tips">
                      支持jpg,png,jfif,pjp,pjpeg,jpeg
                    </div>
                  </j-form-item>
                </j-col>
                <j-col>
                  <j-form-item>
                    <template #label>
                      <span>浏览器页签</span>
                      <j-tooltip title="浏览器tab页中显示的图片元素">
                        <img
                          class="img-style"
                          :src="getImage('/init-home/mark.png')"
                        />
                      </j-tooltip>
                    </template>
                    <div class="upload-image-warp-logo">
                      <div class="upload-image-border-logo">
                        <j-upload
                          name="file"
                          :action="action"
                          :headers="headers"
                          :showUploadList="false"
                          :beforeUpload="uploader.beforeIconUpload"
                          @change="uploader.changeIconUpload"
                          :accept="uploader.iconTypes"
                        >
                          <div class="upload-image-content-logo">
                            <div v-if="iconLoading" class="loading-icon">
                              <AIcon type="LoadingOutlined" />
                            </div>
                            <div
                              class="upload-image-icon"
                              v-if="formValue.ico"
                              :style="
                                formValue.ico
                                  ? `background-image: url(${formValue.ico});`
                                  : ''
                              "
                            ></div>
                            <div v-if="formValue.ico" class="upload-image-mask">
                              点击修改
                            </div>
                            <div v-else>
                              <div>
                                <AIcon type="PlusOutlined" />
                              </div>
                            </div>
                          </div>
                        </j-upload>
                      </div>
                    </div>

                    <div class="upload-tips">推荐尺寸64*64</div>
                    <div class="upload-tips">支持ico格式</div>
                  </j-form-item>
                </j-col>
              </j-row>
            </j-col>
            <j-col :span="14">
              <j-form-item label="登录背景图">
                <div class="upload-image-warp-back">
                  <div class="upload-image-border-back">
                    <j-upload
                      name="file"
                      :action="action"
                      :headers="headers"
                      :beforeUpload="uploader.beforeLogoUpload"
                      :showUploadList="false"
                      @change="uploader.changeBackUpload"
                      :accept="uploader.imageTypes"
                    >
                      <div class="upload-image-content-back">
                        <div v-if="backLoading" class="loading-back">
                          <AIcon type="LoadingOutlined" />
                        </div>
                        <div
                          class="upload-image"
                          v-if="formValue.background"
                          :style="
                            formValue.background
                              ? `background-image: url(${formValue.background});`
                              : ''
                          "
                        ></div>
                        <div
                          v-if="formValue.background"
                          class="upload-image-mask"
                        >
                          点击修改
                        </div>
                        <div v-else>
                          <div>
                            <AIcon type="PlusOutlined" />
                          </div>
                        </div>
                      </div>
                    </j-upload>
                  </div>
                </div>
                <div class="upload-tips">
                  支持4M以内的图片: 支持jpg,png,jfif,pjp,pjpeg,jpeg
                </div>
                <div class="upload-tips">建议尺寸1400x1080</div>
              </j-form-item>
            </j-col>
          </j-row>
        </j-form>

        <PermissionButton
          type="primary"
          @click="clickSave"
          hasPermission="system/Basis:update"
          :loading="loading || logoLoading || iconLoading || backLoading"
        >
          保存
        </PermissionButton>
      </div>
    </FullPage>
  </page-container>
</template>

<script setup lang="ts" name="Basis">
import { formValueType, uploaderType } from './typing'
import { message } from 'jetlinks-ui-components'
import { TOKEN_KEY, BASE_API } from '@jetlinks/constants'
import { getImage, getToken } from '@jetlinks/utils'
import { useSystemStore } from '@/store/system'
import { save_api } from '@/api/basis';
import { useRequest } from '@jetlinks/hooks'

const action = `${BASE_API}/file/static`;
const headers = { [TOKEN_KEY]: getToken() }

const formValue = reactive<formValueType>({
  title: '',
  headerTheme: 'light',
  apiKey: '',
  basePath: `${window.location.origin}/api`,
  logo: '',
  ico: '',
  background: '',
})

const formRef = ref()

const rulesFrom = {
  title: [
    {
      required: true,
      message: '名称必填',
    },
    {
      max: 64,
      message: '最多可输入64个字符',
    },
  ],
  headerTheme: [
    {
      required: true,
      message: '请选择主题色',
      trigger: 'blur',
    },
  ],
  basePath: [
    {
      required: true,
      message: '请输入base-path',
      trigger: 'blur',
    },
  ],
}

const logoLoading = ref<boolean>(false) // logo加载状态
const backLoading = ref<boolean>(false) // 背景图加载状态
const iconLoading = ref<boolean>(false) // 页签加载状态

const uploader: uploaderType = {
  imageTypes: ['.jpg', '.png', '.jfif', '.pjp', '.pjpeg', '.jpeg'],
  iconTypes: ['image/x-icon'],
  // logo格式校验
  beforeLogoUpload: (file: File) => {
    const typeBool =
      uploader.imageTypes
        .map((m: string) => m.split('.')[1])
        .filter((typeStr) => file.type.includes(typeStr)).length > 0
    const sizeBool = file.size / 1024 / 1024 < 4
    if (!typeBool) {
      message.error(`请上传.jpg.png.jfif.pjp.pjpeg.jpeg格式的图片`)
    } else if (!sizeBool) {
      message.error(`图片大小必须小于4M`)
    }
    return typeBool && sizeBool
  },
  // 浏览器页签格式校验
  beforeIconUpload: (file) => {
    const typeBool = file.type.includes('x-icon')
    const sizeBool = file.size / 1024 / 1024 < 1
    if (!typeBool) {
      message.error(`请上传ico格式的图片`)
    } else if (!sizeBool) {
      message.error(`图片大小必须小于${1}M`)
    }
    return typeBool && sizeBool
  },

  // logo上传改变事件
  handleChangeLogo: (info) => {
    if (info.file.status === 'uploading') {
      logoLoading.value = true
    } else if (info.file.status === 'done') {
      info.file.url = info.file.response?.result
      logoLoading.value = false
      formValue.logo = info.file.response?.result
    } else if (info.file.status === 'error') {
      logoLoading.value = false
      message.error('系统logo上传失败，请稍后再试')
    }
  },
  // 背景上传改变事件
  changeBackUpload: (info) => {
    if (info.file.status === 'uploading') {
      backLoading.value = true
    } else if (info.file.status === 'done') {
      info.file.url = info.file.response?.result
      backLoading.value = false
      formValue.background = info.file.response?.result
    } else if (info.file.status === 'error') {
      logoLoading.value = false
      message.error('背景图上传失败，请稍后再试')
    }
  },
  // 浏览器页签上传改变事件
  changeIconUpload: (info) => {
    if (info.file.status === 'uploading') {
      iconLoading.value = true
    } else if (info.file.status === 'done') {
      info.file.url = info.file.response?.result
      iconLoading.value = false
      formValue.ico = info.file.response?.result
    } else if (info.file.status === 'error') {
      logoLoading.value = false
      message.error('浏览器页签上传失败，请稍后再试')
    }
  },
}

const getDetails = async () => {
  const system = useSystemStore()
  await system.queryInfo()
  Object.assign(formValue, {
    title: system.layout?.title,
    headerTheme: system.theme,
    logo: system.layout?.logo || '/logo.png',
    ico: system.systemInfo?.ico || '/favicon.ico',
    background: system.systemInfo?.background || '/images/login.png',
    apiKey: system.systemInfo?.apiKey,
    basePath: system.systemInfo?.basePath,
  })
}

const { loading, run } = useRequest(save_api, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
        message.success('保存成功')
        getDetails()
    }
  }
})

const clickSave = () => {
  formRef.value.validate().then(() => {
    const params = [
      {
        scope: 'front',
        properties: {
          ...formValue,
          apiKey: '',
          'basePath': '',
        },
      },
      {
        scope: 'amap',
        properties: {
          apiKey: formValue.apiKey,
        },
      },
      {
        scope: 'paths',
        properties: {
          'basePath': formValue.basePath,
        },
      },
    ]
    run(params)
  })
}

onMounted(() => {
  getDetails()
})
</script>

<style lang="less" scoped>
.basis-container {
  padding: 24px;
  background-color: #fff;
  .img-style {
    width: 16px;
    height: 16px;
    margin-left: 5px;
  }
  .upload-image-warp-logo {
    display: flex;
    justify-content: flex-start;
    .upload-image-border-logo {
      position: relative;
      overflow: hidden;
      border: 1px dashed #d9d9d9;
      transition: all 0.3s;
      width: 160px;
      height: 150px;
      &:hover {
        border: 1px dashed #1890ff;
        display: flex;
      }
      .upload-image-content-logo {
        align-items: center;
        justify-content: center;
        position: relative;
        display: flex;
        flex-direction: column;
        width: 160px;
        height: 150px;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.06);
        cursor: pointer;
        .loading-logo {
          position: absolute;
          top: 50%;
        }
        .loading-icon {
          position: absolute;
        }

        .upload-image-icon {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: inherit;
        }
        .upload-image-mask {
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          display: none;
          width: 100%;
          height: 100%;
          color: #fff;
          font-size: 16px;
          background-color: rgba(0, 0, 0, 0.35);
        }
        &:hover .upload-image-mask {
          display: flex;
        }
      }
    }
  }
  .upload-image-warp-back {
    display: flex;
    justify-content: flex-start;
    .upload-image-border-back {
      position: relative;
      overflow: hidden;
      border: 1px dashed #d9d9d9;
      transition: all 0.3s;
      width: 570px;
      height: 415px;
      &:hover {
        border: 1px dashed #1890ff;
        display: flex;
      }
      .upload-image-content-back {
        align-items: center;
        justify-content: center;
        position: relative;
        display: flex;
        flex-direction: column;
        width: 570px;
        height: 415px;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.06);
        cursor: pointer;
        .loading-back {
          position: absolute;
        }
        .upload-image-mask {
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          display: none;
          width: 100%;
          height: 100%;
          color: #fff;
          font-size: 16px;
          background-color: rgba(0, 0, 0, 0.35);
        }
        &:hover .upload-image-mask {
          display: flex;
        }
      }
    }
  }
  .upload-image {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
  }
  .upload-tips {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.5715;
  }

  .anticon {
    font-size: 28px;
  }
}
</style>
