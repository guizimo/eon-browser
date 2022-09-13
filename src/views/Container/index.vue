<template>
  <div class="container">
    <div class="tag-container">
      <div class="tag-list">
        <div class="tag-item" v-for="item of tag.tagList">
          <img class="tag-item-icon" @click="selectTag(item.id)" :src="item.icon" alt="">
          <div class="tag-item-title" @click="selectTag(item.id)">{{item.name}}</div>
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
import {tempTagItem} from "./models";

const tag = useTagStore()

// 关闭tag
const closeTag = (id: number) => {
  console.log(id)
  tag.delTagItem(id)
}

// 打开新tag
const openNewTag = () => {
  tag.pushTagItem(tempTagItem)
  tag.selectTagItem(tempTagItem.id)
}

const selectTag = (id: number) => {
  tag.selectTagItem(id)
}


</script>

<style lang="scss" src="./index.scss" scoped></style>