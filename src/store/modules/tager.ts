import { defineStore } from 'pinia'
import { TagItem } from '../types/tagType'

export const useTagStore = defineStore('tag', {
  state: () => {
    return {
      tagList: [] as TagItem[],
      curTag: ''
    }
  },
  actions: {
    pushTagItem(curItem: TagItem) {
      this.tagList.push(curItem)
    },
    delTagItem(id: number) {
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].id === id) this.tagList.splice(i, 1)
      }
    }
  }
})
