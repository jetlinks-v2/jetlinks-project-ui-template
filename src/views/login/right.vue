<template>
  <div class="content">
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" :src="logo || logoImage" />
        <p class="desc">{{ title }}</p>
      </div>
      <div class="main">
        <a-form
          layout="vertical"
          :model="formData"
          :rules="rules"
          @finish="submit"
        >
          <a-form-item label="账号" name="username">
            <a-input
              v-model:value="formData.username"
              placeholder="请输入账号"
              :maxlength="64"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password
              v-model:value="formData.password"
              placeholder="请输入密码"
              :maxlength="64"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item v-if="showCode" label="验证码" name="verifyCode">
            <a-input
              v-model:value="formData.verifyCode"
              autocomplete="off"
              :maxlength="64"
              placeholder="请输入验证码"
            >
              <template #addonAfter>
                <img :src="url.base64" @click="getCode" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <Remember
              v-model:value="formData.remember"
              v-model:expires="formData.expires"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              :loading="loading"
              type="primary"
              html-type="submit"
              class="login-form-button"
              block
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup name="LoginRight" lang="ts">
import Remember from "./remember.vue";
import { getImage } from "@jetlinks-web/utils";
import { useRequest } from "@jetlinks-web/hooks";
import { captchaConfig, codeUrl } from "@/api/login";
import { rules } from "./util";

const logoImage = getImage("/login/logo.png");

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  logo: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["submit"]);

const formData = reactive({
  username: "",
  password: "",
  expires: 3600000,
  remember: false,
  verifyCode: undefined,
  verifyKey: undefined,
});

const { data: url, run: getCode } = useRequest(codeUrl, {
  immediate: false,
  onSuccess(resp) {
    if (resp.result?.key) {
      formData.verifyKey = resp.result?.key
    }
  },
});

useRequest(captchaConfig, {
  onSuccess(resp) {
    if (resp.result?.enabled) {
      getCode();
    }
  },
});

const showCode = computed(() => {
  return !!url?.value?.base64;
});

const submit = () => {
  emit("submit", formData);
};
</script>
<style lang="less" scoped>
.content {
  padding: 0 70px;

  .top {
    padding-top: 30%;

    .header {
      text-align: center;

      .desc {
        margin-top: 24px;
        margin-bottom: 40px;
        color: #000000b3;
        font-weight: 600;
        font-size: 22px;
        text-align: center;
      }
    }
  }

  .logo {
    display: block;
    height: 44px;
    margin: 0 auto;
    vertical-align: top;
  }
}
</style>
