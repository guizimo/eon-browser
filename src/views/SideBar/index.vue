<template>
  <div class="side-bar-container">
    <div class="hide-min">
      <el-popover placement="right-start" :width="160" trigger="hover" v-if="!sideBarShow">
        <template #reference>
          <div class="hide-popover" />
        </template>
        <template #default>
          <ButtonMinBar @openAway="openAwayHandler" />
        </template>
      </el-popover>
    </div>
    <div class="side-box" v-if="sideBarShow">
      <ButtonBar @putAway="putAwayHandler" />
      <UrlBar :link="props.link" @change="changeUrlHandler" />
      <BookMark />
      <TagBar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonBar from '../../components/ButtonBar/index.vue';
import ButtonMinBar from '../../components/ButtonMinBar/index.vue';
import UrlBar from '../../components/UrlBar/index.vue';
import BookMark from '../../components/BookMark/index.vue';
import TagBar from '../../components/TagBar/index.vue';
import { useTagStore } from '../../store/modules/tager';
import { ref } from 'vue';

const tag = useTagStore();

const props = defineProps({
  link: String,
  id: String
});

const sideBarShow = ref(true);

// 更新URL
const changeUrlHandler = (params: { ev: any; webUrl: any }) => {
  let { ev, webUrl } = params;
  if (ev.key == 'Enter') {
    const urlRG = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    if (webUrl && urlRG.test(webUrl)) {
      // 这是一个网址
      if (!webUrl.startsWith('http://') && !webUrl.startsWith('https://')) {
        webUrl = 'https://' + webUrl;
      }
    } else {
      // 百度一下内容
      webUrl = `https://www.baidu.com/s?ie=UTF-8&wd=${webUrl}`;
    }
    tag.editTagItemById({
      id: props.id,
      link: webUrl
    });
  }
};

// 收起侧边栏
const putAwayHandler = () => {
  sideBarShow.value = false;
  window.Electron.ipcRenderer.send('put-away-traffic-light');
};

// 打开侧边栏
const openAwayHandler = () => {
  sideBarShow.value = true;
  //
  window.Electron.ipcRenderer.send('open-away-traffic-light');
};
</script>

<style lang="scss">
.el-popper {
  min-width: 20px;
}
</style>

<style lang="scss" src="./index.scss" scoped></style>
