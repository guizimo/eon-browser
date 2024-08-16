<template>
  <div class="bookmark-container">
    <div class="bookmark-container-title">
      <i class="iconfont icon-task title-img" />
      <div class="title-text">书签</div>
    </div>
    <div class="bookmark-list">
      <div
        v-for="(item, index) of bookMarkList"
        :key="`bookmark_${index}`"
        class="bookmark-item"
        @click="openNewTagHandler(item)"
      >
        <img :src="item.icon" alt="" class="bookmark-item-img" />
        <!--      <div class="bookmark-item-text">{{item.name}}</div>-->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useBookMarkStore } from '../../store/modules/bookmarker';
import { storeToRefs } from 'pinia';
import { useTagStore } from '../../store/modules/tager';

const bookMarkStore = useBookMarkStore();
const tag = useTagStore();
// 响应式
const { bookMarkList } = storeToRefs(bookMarkStore);

const openNewTagHandler = (item: any) => {
  tag.pushTagItem(item);
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
