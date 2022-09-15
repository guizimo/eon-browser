<template>
  <div class="view-container" v-show="show">
    <div class="tool-bar-container">
      <ToolBar :link="link" @change="handleChangeUrl"></ToolBar>
    </div>
    <div class="view">
      <webview
          nodeintegration
          plugins
          class="view-container"
          disablewebsecurity
          :httpreferrer='httpreferrer'
          ref="webViews"
          style="display: inline-flex;"
          :src='link'
      >
      </webview>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";
import ToolBar from '../../components/ToolBar/index.vue'


const props = defineProps({
  link: String,
  linkMessage: Object,
  show: Boolean
})

const httpreferrer = ref('https://www.baidu.com')


const handleChangeUrl = (ev: { key: string; }) => {

}

</script>

<style src="./index.scss" lang="scss" scoped></style>