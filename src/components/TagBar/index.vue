<template>
  <div class="tag-bar-container">
    <div class="tag-bar-container-title" @click="openNewTag()">
      <i class="iconfont icon-plus title-img" />
      <div class="title-text">New Tab</div>
    </div>
    <div class="tag-bar-list">
      <div
        class="tag-bar-item"
        v-for="item of tagList"
        :key="`title-${item.id}`"
        :class="curTagId === item.id ? 'select-item' : ''"
      >
        <img class="tag-bar-item-icon" @click="selectTag(item.id)" :src="item.icon" alt="" />
        <div class="tag-item-item-title" @click="selectTag(item.id)">
          {{ item.name }}
        </div>
        <div class="tag-item-close">
          <i class="iconfont icon-close tag-bar-item-icon" @click="closeTag(item.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTagStore } from '../../store/modules/tager';
import { storeToRefs } from 'pinia';
import { tempTagItem } from '../../models';

const tag = useTagStore();
// 响应式
const { tagList, curTagId } = storeToRefs(tag);

const closeTag = (id: string) => {
  tag.delTagItem(id);
};

// 打开新tag
const openNewTag = () => {
  const temp = tempTagItem();
  tag.pushTagItem(temp);
};

// 选中Tag
const selectTag = (id: string) => {
  tag.selectTagItem(id);
};

// 当标签列表为空时，新打开一个默认窗口
if (tagList.value.length === 0) {
  openNewTag();
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
