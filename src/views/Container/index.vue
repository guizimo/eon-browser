<template>
  <div class="container">
    <SideBar :link="getCurTag()"/>
    <div class="view-container">
      <WebViewHtml
          v-for="item of tagList"
          :key="`view-${item.id}`"
          :link="item.link"
          :linkMessage="item"
          :id="item.id"
          :show="curTagId === item.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// 组合式
import {useTagStore} from "../../store/modules/tager";
import WebViewHtml from '../WebView/index.vue'
import SideBar from '../SideBar/index.vue'
import {storeToRefs} from "pinia";

const tag = useTagStore()
// 响应式
const {tagList, curTagId} = storeToRefs(tag)


const getCurTag = () => {
  const curItem = tagList.value.find(item => item.id === curTagId.value)
  return curItem?.link
}

</script>

<style lang="scss" src="./index.scss" scoped></style>
