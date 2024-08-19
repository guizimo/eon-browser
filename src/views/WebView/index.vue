<template>
  <div class="web-view-container" v-show="show">
    <div class="view">
      <WebView
        nodeintegration
        plugins
        allowpopups
        class="view-container-core"
        disablewebsecurity
        :httpreferrer="httpreferrer"
        ref="webViewRef"
        style="display: inline-flex"
        :src="link"
      />
      <div class="context-menu" v-if="isContextShow">
        <div class="context-menu-item" @click="goConsole">控制台</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 官方文档
 * https://www.electronjs.org/zh/docs/latest/api/webview-tag
 */
import { onMounted, ref } from 'vue';
import { useTagStore } from '@/store/modules/tager';

const webViewRef = ref(null as any);

const props = defineProps({
  link: String,
  id: String,
  linkMessage: Object,
  show: Boolean
});

// httpreferrer
const httpreferrer = ref('https://www.baidu.com');
// 是否展示菜单内容
const isContextShow = ref(false);
// 是否可以后退
const isGoBack = ref(false);
// 是否可以前进
const isGoForward = ref(false);
// 是否停止
const isStop = ref(false);
// 是否页面正常加载
const isPageNormal = ref(false);
// 页面是否在加载中
const isLoading = ref(false);

// 当前curLink
const curLink = ref(props.link);

const tag = useTagStore();

// 设置iframe样式
const setIframeStyle = () => {
  webViewRef.value.shadowRoot.querySelector('iframe').style.borderRadius = '6px';
};

// 刷新页面
const reloadHandler = () => {
  console.log('点击刷新按钮');
  if (!webViewRef.value) return;
  isContextShow.value = false;
  webViewRef.value.reload();
};

// 后退
const goBackHandler = () => {
  console.log('点击后退按钮');
  if (!webViewRef.value) return;
  isContextShow.value = false;
  if (!isGoBack.value) return;
  webViewRef.value.goBack();
};

// 前进
const forwardHandler = () => {
  console.log('点击前进按钮');
  if (!webViewRef.value) return;
  isContextShow.value = false;
  if (!isGoForward.value) return;
  webViewRef.value.goForward();
};

// 打开控制台
const goConsole = () => {
  if (!webViewRef.value.isDevToolsOpened()) {
    webViewRef.value.openDevTools();
  }
};

// 初始化Hook
const initWebViewHook = (showConsoleLog = false) => {
  if (!webViewRef.value) return;
  webViewRef.value.addEventListener('new-window', (event: { url: string }) => {
    console.log('新打开页面', event);
    webViewRef.value.loadURL(event.url);
    curLink.value = event.url;
  });

  webViewRef.value.addEventListener('did-start-loading', () => {
    showConsoleLog && console.log('1.页面开始加载');
    setIframeStyle();
  });

  webViewRef.value.addEventListener('load-commit', () => {
    showConsoleLog && console.log('2.主页面文档加载');
  });

  webViewRef.value.addEventListener('page-title-updated', () => {
    showConsoleLog && console.log('3.主页面标题更新');
  });

  webViewRef.value.addEventListener('dom-ready', () => {
    showConsoleLog && console.log('4.主页面文档加载');
    // 补充信息
    isLoading.value = webViewRef.value.isLoading(); // 是否加载完成
    const getURL = webViewRef.value.getAttribute('src'); // 访客页面URL This.webViews.getAttribute('src')
    const getTitle = webViewRef.value.getTitle(); // 访客页面标题
    isGoBack.value = webViewRef.value.canGoBack();
    isGoForward.value = webViewRef.value.canGoForward();
    curLink.value = getURL;
    tag.editTagItemById({
      id: props.id,
      name: getTitle
    });
  });

  webViewRef.value.addEventListener('did-frame-finish-load', () => {
    showConsoleLog && console.log('5.frame 加载完成');
  });

  webViewRef.value.addEventListener('did-finish-load', () => {
    showConsoleLog && console.log('6.主框架frame 加载完成');
  });

  webViewRef.value.addEventListener('did-stop-loading', () => {
    showConsoleLog && console.log('7.页面停止加载');
  });

  webViewRef.value.addEventListener('page-favicon-updated', (e: { favicons: string | any[] }) => {
    showConsoleLog && console.log('8、网页icon更新');
    if (e.favicons && e.favicons.length > 0) {
      tag.editTagItemById({
        id: props.id,
        icon: e.favicons[0]
      });
    }
  });

  webViewRef.value.addEventListener('did-fail-load', () => {
    console.log('页面加载失败');
  });

  webViewRef.value.addEventListener('context-menu', () => {
    console.log('点击右键');
    if (!isContextShow.value) {
      isContextShow.value = true;
    }
  });
};

onMounted(() => {
  initWebViewHook();
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
