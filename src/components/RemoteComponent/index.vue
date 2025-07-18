<script setup >
import {
  __federation_method_add_origin_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault
} from "virtual:__federation__";

import {ref, watch} from "vue";

const props = defineProps({
  remoteSetting: Object,
  extraProps: Object
})

const Recommendations = ref()

const init = async () => {
  const RecommendationsInfo = await __federation_method_getRemote(props.remoteSetting.name, `./${props.remoteSetting.name}`)
  Recommendations.value = __federation_method_unwrapDefault(RecommendationsInfo)
}

watch(()=> props.remoteSetting, () => {
  if (props.remoteSetting && props.remoteSetting.name && props.remoteSetting.url) {
    __federation_method_add_origin_setRemote(props.remoteSetting.name, props.remoteSetting.url)
    setTimeout(() => {
      init()
    }, 50 )
  }
}, { immediate: true })

</script>

<template>
  <Suspense v-if="Recommendations">
    <component :is="Recommendations" v-bind="extraProps"/>
  </Suspense>
</template>

<style scoped>

</style>
