import { defineComponent } from "vue";
import { Modal } from 'jetlinks-ui-components'
import { VueCropper } from 'vue-cropper';
import { useRequest } from '@jetlinks/hooks'
import { getDetails_api } from '@/api/basis'
import 'vue-cropper/dist/index.css'

const CropperModalProps = {
  title: {
    type: String
  },
  img: {
    type: String
  },
  width: {
    type: Number,
    default: 400
  },
  bodyStyle: {
    type: Object,
    default: () => ({})
  },
  fixedBox: {
    type: Boolean,
    default: true
  },
  autoCrop: {
    type: Boolean,
    default: true
  },
  autoCropWidth: {
    type: Number,
    default: 200
  },
  autoCropHeight: {
    type: Number,
    default: 200
  },
  outputSize: {
    type: Number,
    default: 1
  },
  outputType: {
    type: String,
    default: 'jpeg'
  },
}


const CropperModal = defineComponent({
  name: 'CropperModal',
  props: CropperModalProps,
  emits: ['cancel', 'ok'],
  setup( props, { emit }) {

    const { title, width, bodyStyle, ...cropper } = props

    const { loading, run } = useRequest(getDetails_api, {
      immediate: true
    })

    const cropperRef = ref()
    const imgUrl = ref()

    const onCancel = () => {
      emit('cancel')
    }

    const onOk = () => {
      cropperRef.value.getCropBlob( async (data: Blob) => {
        const formData = new FormData()
        formData.append('file', data, new Date().getTime() + '.jpg')
        imgUrl.value = data
        loading.value = true
        // 上传文件
        run(formData)
      })
    }

    return () => {

      return (
        <Modal
          visible
          title={title}
          width={width}
          confirmLoading={loading}
          onCancel={onCancel}
          onOk={onOk}
        >
          <div
            style={{
              height: '300px',
              width: '100%',
              ...(bodyStyle || {})
            }}
          >
            <VueCropper ref={cropperRef} {...cropper}/>
          </div>
        </Modal>
      )
    }
  }
})

export default CropperModal
