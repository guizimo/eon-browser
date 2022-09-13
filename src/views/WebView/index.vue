<template>
  <div class="container">
    <div class="tool"></div>
    <div class="view">
      <webview
          nodeintegration
          plugins
          class="WebWebviewWeb"
          disablewebsecurity
          :httpreferrer='httpreferrer'
          ref="webViews"
          style="display: inline-flex;"
          :src='webViewLink'
      >
      </webview>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const httpreferrer = ref('https://www.baidu.com')
const webViewLink = ref('https://www.baidu.com')

</script>

<style scoped>

</style>