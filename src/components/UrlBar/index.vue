<template>
  <div class="url-bar-container">
    <input
      class="tool-search-input"
      v-model="webUrl"
      spellcheck="false"
      autofocus
      placeholder="百度搜索，或者直接打开网址"
      @keyup="handleChangeUrl"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  link: String
})

const webUrl = ref(props.link)

watch(
  () => props.link,
  newProps => {
    webUrl.value = newProps
  }
)

const emit = defineEmits(['change'])

const handleChangeUrl = (ev: { key: string }) => {
  emit('change', { ev, webUrl: webUrl.value })
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
