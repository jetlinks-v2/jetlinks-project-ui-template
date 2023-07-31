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
            <img v-if="!loading" id="upload-img" :style="`height: ${height};`" :src="imgSrc" alt="上传图片">
            <div v-if="loading">
              <AIcon type="LoadingOutlined" />
            </div>
            <div v-else class="upload-mask" :style="`height: ${height};`">点击修改</div>
        </div>
        <div v-for="item in messages" :key="item" class="uploadTip">{{item}}</div>
    </j-upload>
  </div>
</template>

<script setup lang="ts">
import { UploadInfoType } from '@/views/system/Basis/components/upload/typing'
import { TOKEN_KEY, BASE_API } from '@jetlinks/constants'
import { getToken } from '@jetlinks/utils'
import { onlyMessage } from '@jetlinks/utils'
import { defineProps, ref } from 'vue'
import { FileStatic } from '@/api/comm.ts'


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
  switch (props.uploadType) {
    case 'logo':
    case 'background':
      return uploadInfo.imageType;
    case 'ico':
      return uploadInfo.icoType;
    default:
      return '';
  }
})

// 上传校验
const beforeUpload = computed(() => {
  switch (props.uploadType) {
    case 'logo':
      return uploadInfo.isLogoImage;
    case 'ico':
      return uploadInfo.isIcoImage;
    case 'background':
      return uploadInfo.isBackground;
    default:
      return () =>  {};
  }
})

// 上传事件
const change = computed(() => {
  switch (props.uploadType) {
    case 'logo':
      return uploadInfo.changeLogoUpload;
    case 'ico':
      return uploadInfo.changeIcoUpload;
    case 'background':
      return uploadInfo.changeBackgroundUpload;
    default:
      return () =>  {};
  }
})

// 提示文字
const messages = computed(() => {
  switch (props.uploadType) {
    case 'logo':
      return uploadInfo.logoTip;
    case 'ico':
      return uploadInfo.icoTip;
    case 'background':
      return uploadInfo.backgroundTip;
    default:
      return () =>  {};
  }
})

// 上传状态
const loading = ref<Boolean>(false)

// 上传相关信息
const uploadInfo: UploadInfoType = {
  // 上传提示文字
  logoTip: ['推荐尺寸200*200', '支持jpg,png,jfif,pjp,pjpeg,jpeg'],
  icoTip: ['推荐尺寸64*64', '支持ico格式'],
  backgroundTip: ['支持4M以内的图片: 支持jpg,png,jfif,pjp,pjpeg,jpeg', '建议尺寸1400x1080'],
  // 上传的地址
  action: `${BASE_API}${FileStatic}`,
  headers: { [TOKEN_KEY]: getToken() },
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
      onlyMessage('支持4M以内的图片','error')
    }
    return isLess
  },

  //验证图片大小是否小于1M
  isImageLess1M: (file: File) => {
    const isLess = 1.0 *  file.size / 1024 / 1024 < 1
    if (!isLess) {
      onlyMessage("支持1M以内的图片","error")
    }
    return isLess
  },

  // 验证是否是图片类型
  isImageType: (file: File) => {
    const isImage =uploadInfo.imageType.split(',')
        .map((m: string) => m.split('.')[1])
        .filter((typeStr) => file.type.includes(typeStr)).length > 0
    if(!isImage) {
      onlyMessage("请上传jpg png格式的图片",'error')
    }
    return isImage
  },

  // 验证是否时ico类型
  isIcoType: (file: File) => {
    const isico = file.type.includes("x-icon")
    if(!isico) {
      onlyMessage("请上传ico格式的文件",'error')
    }
    return isico
  },

  // 上传change事件
  changUpload: (info: any, msg: string) => {
    console.log("status",  info.file.status)
    if (info.file.status === 'uploading') {
      loading.value = true
    } else if (info.file.status === 'done') {
      info.file.url = info.file.response?.result
      loading.value = false
      // imgSrc.value = info.file.url
      emit('update:imgSrc', info.file.url)
    } else if (info.file.status === 'error') {
      loading.value = false
      onlyMessage(msg + '上传失败，请稍后再试', 'error')
    }
  },

  // logo上传change事件
  changeLogoUpload: (info: any) => {uploadInfo.changUpload(info, "系统logo")},

  // 浏览器页签上传change事件
  changeIcoUpload: (info: any) => {uploadInfo.changUpload(info, "浏览器页签")},

  // 背景图片上传change事件
  changeBackgroundUpload: (info: any) => {uploadInfo.changUpload(info, "登录背景图")},

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