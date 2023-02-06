<template>
  <div class="side-bar-container">
    <ButtonBar/>
    <UrlBar :link="props.link" @change="handleChangeUrl"/>
    <BookMark/>
    <TagBar/>
  </div>
</template>

<script lang="ts" setup>

import ButtonBar from '../../components/ButtonBar/index.vue'
import UrlBar from '../../components/UrlBar/index.vue'
import BookMark from '../../components/BookMark/index.vue'
import TagBar from '../../components/TagBar/index.vue'
import { useTagStore } from "../../store/modules/tager";


const tag = useTagStore()

const props = defineProps({
  link: String
})

// 更新URL
const handleChangeUrl = (params: { ev: any; webUrl: any; }) => {
  let {ev, webUrl} = params
  if (ev.key == 'Enter') {
    let urlRG = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
    if (webUrl && urlRG.test(webUrl)) {
      // 这是一个网址
      if (!webUrl.startsWith('http://') && !webUrl.startsWith('https://')) {
        webUrl = 'https://' + webUrl
      }
    } else {
      // 百度一下内容
      webUrl = `https://www.baidu.com/s?ie=UTF-8&wd=${webUrl}`
    }
    tag.editTagItemById({
      id: props.id,
      link: webUrl
    })
  }
}

</script>

<style lang="scss" src="./index.scss" scoped></style>
