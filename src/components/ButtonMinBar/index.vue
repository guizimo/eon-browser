<template>
  <div class="button-bar-container">
    <span class="tool-icon-content">
      <i class="iconfont icon-arrow-left tool-icon" @click="goBack" />
    </span>
    <span class="tool-icon-content">
      <i class="iconfont icon-arrow-right tool-icon" @click="forward" />
    </span>
    <span class="tool-icon-content">
      <i class="iconfont icon-refresh tool-icon" @click="reload" />
    </span>
    <span class="tool-icon-content">
      <i class="iconfont icon-open tool-icon" @click="openAway" />
    </span>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['reload', 'goBack', 'forward', 'openAway'])

// 刷新按钮
const reload = () => {
  emit('reload')
}

// 后退按钮
const goBack = () => {
  emit('goBack')
}

// 前进按钮
const forward = () => {
  emit('forward')
}

// 收起按钮
const openAway = () => {
  emit('openAway')
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
