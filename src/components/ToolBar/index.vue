<template>
  <div class="tool-container">
    <span class="tool-icon-content">
       <el-icon class="tool-icon"><Back/></el-icon>
    </span>
    <span class="tool-icon-content">
       <el-icon class="tool-icon"><Right/></el-icon>
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

import {ref} from "vue";

const props = defineProps({
  link: String
})

const emit = defineEmits(['change', 'reload'])

const webUrl = ref(props.link)

const handleChangeUrl = (ev: { key: string; }) => {
  emit('change', ev)
  if (ev.key == 'Enter') {
    let urlRG = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
    if (webUrl.value && urlRG.test(webUrl.value)) {
      // 这是一个网址
      console.log(webUrl.value)
    } else {
      console.log('11111111')

    }
  }
}

// 刷新按钮
const reload = () => {
  emit('reload')
}

</script>

<style src="./index.scss" lang="scss" scoped></style>
