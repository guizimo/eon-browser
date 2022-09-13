<template>
  <div class="container">
    <div class="tag-container">
      <div class="tag-list">
        <div class="tag-item" v-for="item of tag.tagList">
          <div class="tag-item-icon">
            <img :src="item.icon" alt="">
          </div>
          <div class="tag-item-title">{{item.name}}</div>
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
      <WebView></WebView>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 组合式
import { ref } from 'vue'
import {useTagStore} from "../../store/modules/tager";
import WebView from '../WebView/index.vue'

const tag = useTagStore()

console.log(tag.tagList)

const closeTag = (id: number) => {
  console.log(id)
  tag.delTagItem(id)
}

const openNewTag = () => {
  const temp = {
    icon: 'sss',
    name: '你好',
    link: 'kkk',
    id: new Date().getTime()
  }
  tag.pushTagItem(temp)
}


</script>

<style lang="scss" src="./index.scss" scoped></style>