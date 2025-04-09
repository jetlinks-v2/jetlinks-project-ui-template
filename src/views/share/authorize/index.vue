<template>
  <div class="login-container">
    <div
      v-if="!isExpired"
      class="login-card"
    >
      <div class="login-header">
        <h1>授权认证</h1>
      </div>

      <a-form
        v-if="config.authType === 'password'"
        :model="formState"
        name="login"
        @finish="handleSubmit"
        class="login-form"
      >
        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
            size="large"
          >
            <template #prefix>
              <AIcon
                type="LockOutlined"
                class="prefix-icon"
              />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          v-if="showVerificationCode"
          name="verifyCode"
          :rules="[{ required: true, message: '请输入验证码!' }]"
        >
          <a-input
            v-model:value="formState.verifyCode"
            placeholder="请输入验证码"
            size="large"
          >
            <template #prefix>
              <AIcon
                type="SafetyOutlined"
                class="prefix-icon"
              />
            </template>
            <template #addonAfter>
              <img
                :src="verificationCodeUrl"
                @click="refreshVerificationCode"
                alt="验证码"
                class="verification-image"
              />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            size="large"
            :loading="isLoading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <div
        v-else-if="config.authType === 'none'"
        class="auto-login-message"
      >
        <a-spin
          :spinning="isLoading"
          tip="正在自动授权，请稍候..."
        >
          <a-result
            status="info"
            title="自动授权中"
            sub-title="系统正在为您处理授权，无需输入凭证"
          >
            <template #extra>
              <a-button
                type="primary"
                :loading="isLoading"
              >
                处理中
              </a-button>
            </template>
          </a-result>
        </a-spin>
      </div>

      <div
        v-else
        class="loading-container"
      >
        <a-spin tip="加载中..."></a-spin>
      </div>
    </div>

    <div
      v-else
      class="login-card"
    >
      <a-result
        status="error"
        title="链接已过期"
        sub-title="请重新获取授权链接"
      />
    </div>
  </div>
</template>

<script setup>
import { getTokenConfig, getTokenRedirect } from '@/api/comm'
import { codeUrl } from '@/api/login'
import { setPersonalToken } from '@visualization/utils'
import { useRequest } from '@jetlinks-web/hooks'
import { encrypt, onlyMessage } from '@jetlinks-web/utils'

const formState = reactive({
  password: '',
  verifyCode: '',
  verifyKey: ''
})

const personalTokenKey = ':X_Personal_Token'
const config = ref({})
const personalToken = ref('')
const isLoading = ref(false)
const verificationData = ref({})
const isExpired = ref(false)
const showVerificationCode = computed(() => !!verificationData.value?.base64)
const verificationCodeUrl = computed(() => verificationData.value?.base64 || '')

const { run: refreshVerificationCode } = useRequest(codeUrl, {
  immediate: false,
  onSuccess(resp) {
    if (resp.result?.key) {
      formState.verifyKey = resp.result.key
      verificationData.value = resp.result
    }
  }
})

const handleRedirect = async (params) => {
  try {
    isLoading.value = true
    const redirectRes = await getTokenRedirect(personalToken.value, params || {})

    //发布过期
    if (redirectRes?.status === 401) {
      isExpired.value = true
      return
    }

    if (redirectRes?.result) {
      if (params) onlyMessage('授权成功，即将跳转...')
      setTimeout(() => {
        const urlString = redirectRes.result
        const urlObject = new URL(urlString)
        const token = urlObject.searchParams.get(personalTokenKey)
        setPersonalToken(token)

        urlObject.searchParams.delete(personalTokenKey)
        const cleanUrl = urlObject.toString()
        window.location.href = cleanUrl
      }, 1000)
    } else {
      throw new Error('获取重定向URL失败')
    }
  } catch (error) {
    console.error('Redirect error:', error)
    refreshVerificationCode()
    onlyMessage('授权失败，请重试', 'error')
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  const authParameters = {
    password: formState.password
  }

  if (config.value?.authConfiguration?.encrypt) {
    authParameters.password = encrypt(formState.password, config.value.authConfiguration.encrypt.publicKey)
    authParameters.encryptId = config.value.authConfiguration.encrypt.id
  }

  if (showVerificationCode.value) {
    authParameters.verifyKey = formState.verifyKey
    authParameters.verifyCode = formState.verifyCode
  }

  await handleRedirect({ authParameters })
}

const initialize = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    personalToken.value = urlParams.get('personal_token')

    if (!personalToken.value) {
      onlyMessage('缺少必要的授权参数', 'error')
      return
    }

    isLoading.value = true
    const res = await getTokenConfig(personalToken.value)

    //发布过期
    if (res.status === 401) {
      isExpired.value = true
      return
    }

    if (res?.result) {
      config.value = res.result

      if (res.result.authType === 'password') {
        refreshVerificationCode()
      } else if (res.result.authType === 'none') {
        handleRedirect()
      }
    } else {
      onlyMessage('获取授权配置失败', 'error')
    }
  } catch (error) {
    console.error('初始化失败:', error)
    onlyMessage('系统错误，请稍后再试', 'error')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  initialize()
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 40px 30px;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.login-form {
  width: 100%;
}

.login-form-button {
  width: 100%;
  margin-top: 8px;
}

.auto-login-message {
  text-align: center;
  padding: 20px 0;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.verification-image {
  cursor: pointer;
  height: 32px;
}

.prefix-icon {
  font-size: 16px;
  margin-right: 8px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
}
</style>
