<template>
  <div ref='fullPage' :style="{ height: MinHeight}" :class="{ 'full-page-warp': true, 'scroll': showScroll }" >
    <slot></slot>
  </div>
</template>

<script setup name='FullPage'>

const props = defineProps({
  extraHeight: {
    type: Number,
    default: 0
  },
  showScroll: {
    type: Boolean,
    default: false
  }
})

const fullPage = ref(null)
const MinHeight = ref(`0`)

onMounted(() => {
  setTimeout(() => {
    const top = fullPage.value.getBoundingClientRect().top
    const _y = top < 0 ? 0 : top
    MinHeight.value = `calc(100vh - ${_y + props.extraHeight + 24}px)`
  }, 10)
})

</script>

<style scoped lang="less">
.full-page-warp {
  background: #fff;

  &.scroll {
    overflow-y: auto;
  }
}

</style>
