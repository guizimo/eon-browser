<template>
  <div class="container">
    <div class="tag-container">
      <div class="tag-list">
        <div class="tag-item" v-for="item of tagList" :key="`title-${item.id}`" :class="curTagId === item.id ? 'select-item' : ''">
          <img class="tag-item-icon" @click="selectTag(item.id)" :src="item.icon" alt="">
          <div class="tag-item-title" @click="selectTag(item.id)">{{item.id}}</div>
          <div class="tag-item-close">
            <el-icon class="tag-item-close-icon" @click="closeTag(item.id)"><Close /></el-icon>
          </div>
        </div>
      </div>
      <div class="add-tag">
        <el-icon class="add-tag-icon" @click="openNewTag()"><Plus /></el-icon>
      </div>
    </div>
    <div class="view-container">
      <WebViewHtml
          v-for="item of tagList"
          :key="`view-${item.id}`"
          :link="item.link"
          :linkMessage="item"
          :show="curTagId === item.id"
      >
      </WebViewHtml>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 组合式
import {onMounted, ref} from 'vue'
import {useTagStore} from "../../store/modules/tager";
import WebViewHtml from '../WebView/index.vue'
import {tempTagItem} from "./models";
import {storeToRefs} from "pinia";

const tag = useTagStore()
// 响应式
const {tagList, curTagId} = storeToRefs(tag)


// 关闭tag
const closeTag = (id: string) => {
  tag.delTagItem(id)
}

// 打开新tag
const openNewTag = () => {
  const temp = tempTagItem()
  tag.pushTagItem(temp)
}

// 选中Tag
const selectTag = (id: string) => {
  tag.selectTagItem(id)
}

if(tagList.value.length === 0) {
  openNewTag()
}

onMounted(() => {

})

</script>

<style lang="scss" src="./index.scss" scoped></style>