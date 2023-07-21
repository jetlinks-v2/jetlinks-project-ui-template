<template>
  <div class="upload">
    <j-upload :drag="drag ? drag : true"
            name="file"
            :headers="headers"
            :accept="accept" 
            :beforeUpload="beforeUpload ? beforeUpload : true"
            :showUploadList="showUploadList ? showUploadList : false"
            @change="change"
            :action="action">
        <div class="upload-div" :style="`width: ${width};`">
            <img id="upload-img" :style="`height: ${height};`" :src="imgSrc" alt="上传图片">
            <div class="upload-mask" :style="`height: ${height};`">点击修改</div>
        </div>
        <div v-for="item in messages" :key="item" class="uploadTip">{{item}}</div>
    </j-upload>
  </div>
</template>

<script setup lang="ts">
interface Props {
  drag?: boolean,
  headers: object,
  accept: string,
  showUploadList?: boolean,
  action: string,
  imgSrc: string,
  messages?: object,
  height?: string,
  width?: string,
  beforeUpload(file: File): boolean,
  change(info: any): void
}
defineProps<Props>()
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