<template>
  <div class="upload">
    <j-upload :drag="uploadInfo.drag"
            name="file"
            :headers="uploadInfo.headers"
            :accept="accept" 
            :beforeUpload="beforeUpload ? beforeUpload : true"
            :showUploadList="uploadInfo.showUploadList"
            @change="change"
            :action="uploadInfo.action">
        <div class="upload-div" :style="`width: ${width};`">
            <img id="upload-img" :style="`height: ${height};`" :src="imgSrc" alt="上传图片">
            <div class="upload-mask" :style="`height: ${height};`">点击修改</div>
        </div>
        <div v-for="item in messages" :key="item" class="uploadTip">{{item}}</div>
    </j-upload>
  </div>
</template>

<script setup lang="ts">
import { UploadInfoType } from '@/views/system/Basis/components/upload/typing'
import { TOKEN_KEY, BASE_API } from '@jetlinks/constants'
import { getToken } from '@jetlinks/utils'
import { message } from 'jetlinks-ui-components'
import { defineProps } from 'vue'


const emit = defineEmits(['update:imgSrc'])

// 传入参数
const props = defineProps({
  uploadType: {
    type: String,
    default: 'logo'
  },
  imgSrc: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    defalut: '160px'
  },
  width: {
    type: String,
    default: '160px'
  }
})

// 上传框接收类型
const accept = computed(() => {
  if (props.uploadType === 'logo' || props.uploadType === 'background') return uploadInfo.imageType
  else if (props.uploadType === 'ico') return uploadInfo.icoType
  else return ''
})

// 上传校验
const beforeUpload = computed(() => {
  if (props.uploadType === 'logo') return uploadInfo.isLogoImage
  else if (props.uploadType === 'ico') return uploadInfo.isIcoImage
  else if (props.uploadType === 'background') return uploadInfo.isBackground
  else return () => {}
})

// 上传事件
const change = computed(() => {
  if (props.uploadType === 'logo') return uploadInfo.changeLogoUpload
  else if (props.uploadType === 'ico') return uploadInfo.changeIcoUpload
  else if (props.uploadType === 'background') return uploadInfo.changeBackgroundUpload
  else return () => {}
})

// 提示文字
const messages = computed(() => {
  if (props.uploadType === 'logo') return uploadInfo.logoTip
  else if (props.uploadType === 'ico') return uploadInfo.icoTip
  else if (props.uploadType === 'background') return uploadInfo.backgroundTip
  else return () => {}
})

// 上传相关信息
const uploadInfo: UploadInfoType = {
  // 上传提示文字
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
  icoType: ['image/x-icon'].toString(),

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
  isIcoType: (file: File) => {
    const isico = file.type.includes("x-icon")
    if(!isico) {
      message.error("请上传ico格式的文件")
    }
    return isico
  },

  // 上传change事件
  changUpload: (info: any, loading: string, image: string, msg: string) => {
    if (info.file.status === 'uploading') {
      uploadInfo[loading] = true
    } else if (info.file.status === 'done') {
      info.file.url = info.file.response?.result
      uploadInfo[loading] = false
      // imgSrc.value = info.file.url
      emit('update:imgSrc', info.file.url)
    } else if (info.file.status === 'error') {
      uploadInfo[loading] = false
      message.error(msg + '上传失败，请稍后再试')
    }
  },

  // logo上传change事件
  changeLogoUpload: (info: any) => uploadInfo.changUpload(info, "logoLoading", "logo", "系统logo"),

  // 浏览器页签上传change事件
  changeIcoUpload: (info: any) => uploadInfo.changUpload(info, "icoLoading", "ico", "浏览器页签"),

  // 背景图片上传change事件
  changeBackgroundUpload: (info: any) => uploadInfo.changUpload(info, "backgroundLoading", "background", "登录背景图"),

  // logo 上传验证
  isLogoImage: (file: File) => {
    return uploadInfo.isImageType(file) && uploadInfo.isImageLess4M(file) 
  },

  // icon 上传验证
  isIcoImage: (file: File) => {
    return uploadInfo.isIcoType(file) && uploadInfo.isImageLess1M(file) 
  },

  // 背景图片上传验证
  isBackground: (file: File) => {
    return uploadInfo.isImageType(file) && uploadInfo.isImageLess4M(file)
  }
}

</script>

<style lang="less" scoped>
.upload {
    flex: 1;
    width: inherit;
    overflow: hidden;
    .upload-div {
      width: 160px;
      background-color: #eeeeee;
        .upload-mask{
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          width: inherit;
          height: 160px;
          color: white;
          font-size: 16px;
          background-color: rgba(0, 0, 0, 0.35);
          display: none;
      }
      &:hover .upload-mask {
          display: flex;
      }
      #upload-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
      }
    }
    .uploadTip {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 1.5715;
    }
}
</style>