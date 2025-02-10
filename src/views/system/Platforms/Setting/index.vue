<template>
  <j-page-container>
    <FullPage :fixed="false">
      <div class="api-container">
        <Api mode="api">
          <template #top>
            <p>
              <AIcon
                  type="ExclamationCircleOutlined"
                  style="margin-right: 12px; font-size: 14px"
              />
              配置系统支持API赋权的范围
            </p>
          </template>
        </Api>
      </div>
    </FullPage>
  </j-page-container>
</template>

<script setup lang="ts" name="Api">
import Api from '../Api/index.vue';
import FullPage from "@/layout/FullPage.vue";
</script>

<style lang="less" scoped>
.api-container {
  height: 100%;
  padding: 24px;
}

</style>
