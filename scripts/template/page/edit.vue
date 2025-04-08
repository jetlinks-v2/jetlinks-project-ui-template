<script setup name="Edit">
import { useRequest } from '@jetlinks-web/hooks';
const emits = defineEmits(['cancel', 'ok']);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
// 请求
const { loading, run } = useRequest(() => {}, {
  immediate: false,
  onSuccess: () => {
    emits('ok');
  },
});
// 表单数据
const formData = reactive({
  id: undefined,
  name: undefined,
  describe: undefined,
});
const formRef = ref(); // 表单实例

// 表单校验规则
const rules = {
  id: [
    {
      pattern: /^[a-zA-Z0-9_\-]+$/,
      message: '请输入英文或者数字或者-或者_',
    },
    {
      max: 64,
      message: '最多输入64个字符',
    },
    { required: true, message: '请输入ID' },
  ],
  name: [
    { required: true, message: '请输入名称' },
    {
      max: 64,
      message: '最多输入64个字符',
    },
  ],
};
/**
 * 表单提交
 */
const onOk = async () => {
  formRef.value.validate().then(result => {
    if (result) {
      run(unref(formData));
    }
  });
};

/**
 * 取消
 */
const onCancel = () => {
  emits('cancel');
};

onMounted(() => {
  nextTick(() => {
    Object.keys(formData).forEach(key => {
      formData[key] = props.data[key];
    });
  });
});
</script>

<template>
  <a-modal
    visible
    width="800px"
    :title="data.id ? '编辑' : '新增'"
    :confirmLoading="loading"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-form ref="formRef" :model="formData" :rule="rules" layout="vertical">
      <a-form-item label="ID" name="id" required>
        <a-input v-model:value="formData.id" placeholder="请输入id" />
      </a-form-item>
      <a-form-item label="名称" name="name" required>
        <a-input v-model:value="formData.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="备注" name="describe">
        <a-textarea
          v-model:value="formData.describe"
          showCount
          :maxlength="200"
          placeholder="请输入名称"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped lang="less"></style>
