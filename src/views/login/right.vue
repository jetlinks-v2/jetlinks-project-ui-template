<template>
    <div class="content">
        <div class="top">
            <div class="header">
                <img
                    alt="logo"
                    class="logo"
                    :src="logo || logoImage"
                />
                <p class="desc">{{ title }}</p>
            </div>
            <div class="main">
                <j-form layout="vertical" :model="formData" :rules="rules" @finish="submit">
                    <j-form-item label="账号" name="username">
                        <j-input v-model:value="formData.username" placeholder="请输入账号" :maxlength="64" autocomplete="off" />
                    </j-form-item>
                    <j-form-item label="密码" name="password">
                        <j-input-password v-model:value="formData.password" placeholder="请输入密码" :maxlength="64" autocomplete="off" />
                    </j-form-item>
                    <j-form-item v-if="showCode" label="验证码" name="verifyCode">
                        <j-input
                            v-model:value="formData.verifyCode"
                            autocomplete="off"
                            :maxlength="64"
                            placeholder="请输入验证码"
                        >
                            <template #addonAfter>
                                <img
                                    :src="codeUrl"
                                    @click="getCode"
                                />
                            </template>
                        </j-input>
                    </j-form-item>
                    <j-form-item>
                        <Remember
                            v-model:value="formData.remember"
                            v-model:expires="formData.expires"
                        />
                    </j-form-item>
                    <j-form-item>
                        <j-button
                            :loading="loading"
                            type="primary"
                            html-type="submit"
                            class="login-form-button"
                            block
                        >
                            登录
                        </j-button>
                    </j-form-item>
                </j-form>
            </div>
        </div>
    </div>
</template>
<script setup name="LoginRight" lang="ts">
import Remember from './remember.vue'
import { getImage } from '@jetlinks/utils'

const logoImage = getImage('/login/logo.png')

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    codeUrl: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
})

const emit = defineEmits(['submit'])

const formData = reactive({
  username: '',
  password: '',
  expires: 3600000,
  remember: false,
  verifyCode: undefined,
  verifyKey: undefined,
})

const rules = {
  username: [
    {
      validator(_: any, value: string) {
        if (!value) {
          return Promise.reject('请输入账号!')
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  password: [
    {
      validator(_: any, value: string) {
        if (!value) {
          return Promise.reject('请输入密码!')
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  verifyCode: [
    {
      validator(_: any, value: string) {
        if (!value) {
          return Promise.reject('请输入验证码!')
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ]
}

const showCode = computed(() => {
    return !!props.codeUrl
})

const submit = () => {
    emit('submit', formData)
}

const getCode = () => {

}

</script>
<style lang="less" scoped>
.content {
    padding: 0 70px;

    .top {
        padding-top: 30%;

        .herader {
            height: 44px;
            line-height: 44px;
            text-align: center;
        }
    }

    .logo {
        display: block;
        height: 44px;
        margin: 0 auto;
        vertical-align: top;
    }

  .desc {
    margin-top: 24px;
    margin-bottom: 40px;
    color: #000000b3;
    font-weight: 600;
    font-size: 22px;
    text-align: center;
  }
}
</style>
