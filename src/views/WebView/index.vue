<template>
  <div class="view-container" v-show="show">
    <div class="tool-bar-container">
      <ToolBar :link="link" @reload="reloadHandler" @goBack="goBackHandler" @forward="forwardHandler" @change="handleChangeUrl"></ToolBar>
    </div>
    <div class="view">
      <WebView
          nodeintegration
          plugins
          allowpopups
          class="view-container"
          disablewebsecurity
          :httpreferrer='httpreferrer'
          ref="webViewRef"
          style="display: inline-flex;"
          :src='link'
      >
      </WebView>
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
// 是否可以后退
const isGoBack = ref(false)
// 是否可以前进
const isForward = ref(false)
// 是否停止
const isStop = ref(false)
// 是否页面正常加载
const isPageNormal = ref(false)

const reloadHandler = () => {
  console.log('点击刷新按钮')
  if (!webViewRef.value) return
  isContextShow.value = false
  webViewRef.value.reload()
}

// 后退
const goBackHandler = () => {
  console.log('点击后退按钮')
  if (!webViewRef.value) return
  isContextShow.value = false
  if (!isGoBack.value) return
  webViewRef.value.goBack()
}

// 前进
const forwardHandler = () => {
  console.log('点击前进按钮')
  if (!webViewRef.value) return
  isContextShow.value = false
  if (!isForward.value) return
  webViewRef.value.goForward()
}

// 初始化Hook
const initWebViewHook = (showConsoleLog = false) => {
  if (!webViewRef.value) return
  webViewRef.value.addEventListener('new-window', (event: { url: string; }) => {
    console.log('new-window', event)
    webViewRef.value.loadURL(event.url)
  })

  webViewRef.value.addEventListener('did-start-loading', () => {
    showConsoleLog && console.log('1.页面开始加载')
  })

  webViewRef.value.addEventListener('load-commit', () => {
    showConsoleLog && console.log('2.主页面文档加载')
  })

  webViewRef.value.addEventListener('page-title-updated', () => {
    showConsoleLog && console.log('3.主页面标题更新')
  })

  webViewRef.value.addEventListener('dom-ready', () => {
    showConsoleLog && console.log('4.主页面文档加载')
  })

  webViewRef.value.addEventListener('did-frame-finish-load',() => {
    showConsoleLog && console.log('5.frame 加载完成')
  })

  webViewRef.value.addEventListener('did-finish-load',() => {
    showConsoleLog && console.log('6.主框架frame 加载完成')
  })

  webViewRef.value.addEventListener('did-stop-loading',() => {
    showConsoleLog && console.log('7.页面停止加载')
  })

  webViewRef.value.addEventListener('page-favicon-updated',() => {
    showConsoleLog && console.log('8、网页icon更新')
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
