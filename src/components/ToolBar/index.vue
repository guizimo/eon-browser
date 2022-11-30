<template>
  <div class="tool-container">
    <span class="tool-icon-content">
       <el-icon class="tool-icon" @click="goBack"><Back/></el-icon>
    </span>
    <span class="tool-icon-content">
       <el-icon class="tool-icon" @click="forward"><Right/></el-icon>
    </span>
    <span class="tool-icon-content">
       <el-icon class="tool-icon" @click="reload"><RefreshRight/></el-icon>
    </span>
    <div class="tool-search">
      <input class="tool-search-input" v-model="webUrl" spellcheck="false" autofocus
             placeholder="百度搜索，或者直接打开网址" @keyup="handleChangeUrl">
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref, watch} from "vue";

const props = defineProps({
  link: String
})

const emit = defineEmits(['change', 'reload', 'goBack', 'forward'])

const webUrl = ref(props.link)

watch(
    () => props.link,
    (newProps) => {
      webUrl.value = newProps
    }
);

const handleChangeUrl = (ev: { key: string; }) => {
  emit('change', {ev, webUrl: webUrl.value})
}

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
</script>

<style src="./index.scss" lang="scss" scoped></style>
