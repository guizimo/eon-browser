<template>
  <div class="view-container" v-show="show">
    <div class="tool-bar-container">
      <ToolBar :link="link" @reload="reloadHandler" @change="handleChangeUrl"></ToolBar>
    </div>
    <div class="view">
      <webview
          nodeintegration
          plugins
          class="view-container"
          disablewebsecurity
          :httpreferrer='httpreferrer'
          ref="webViewRef"
          style="display: inline-flex;"
          :src='link'
      >
      </webview>
    </div>
  </div>
</template>

<script lang="ts" setup>

/**
 * 官方文档
 * https://www.electronjs.org/zh/docs/latest/api/webview-tag
 */
import {onMounted, ref} from "vue";
import ToolBar from '../../components/ToolBar/index.vue'

const webViewRef = ref(null as any)

const props = defineProps({
  link: String,
  linkMessage: Object,
  show: Boolean
})

// httpreferrer
const httpreferrer = ref('https://www.baidu.com')
// 是否展示菜单内容
const isContextShow = ref(false)

const reloadHandler = () => {
  console.log('点击刷新页面')
  if (!webViewRef.value) return
  isContextShow.value = false
  webViewRef.value.reload()
}

// 初始化Hook
const initWebViewHook = () => {
  if (!webViewRef.value) return
  webViewRef.value.addEventListener('new-window', () => {
    console.log('new-window')
  })

  webViewRef.value.addEventListener('did-start-loading', () => {
    console.log('1.页面开始加载')
  })

  webViewRef.value.addEventListener('load-commit', () => {
    console.log('2.主页面文档加载')
  })

  webViewRef.value.addEventListener('page-title-updated', () => {
    console.log('3.主页面标题更新')
  })

  webViewRef.value.addEventListener('dom-ready', () => {
    console.log('4.主页面文档加载')
  })

  webViewRef.value.addEventListener('did-frame-finish-load',() => {
    console.log('5.frame 加载完成')
  })

  webViewRef.value.addEventListener('did-finish-load',() => {
    console.log('6.主框架frame 加载完成')
  })

  webViewRef.value.addEventListener('did-stop-loading',() => {
    console.log('7.页面停止加载')
  })

  webViewRef.value.addEventListener('page-favicon-updated',() => {
    console.log('8、网页icon更新')
  })

  webViewRef.value.addEventListener('did-fail-load',() => {
    console.log('页面加载失败')
  })

  webViewRef.value.addEventListener('context-menu',() => {
    console.log('点击右键')
  })
}


onMounted(() => {
  initWebViewHook()
})


const handleChangeUrl = (ev: { key: string; }) => {

}

</script>

<style src="./index.scss" lang="scss" scoped></style>
