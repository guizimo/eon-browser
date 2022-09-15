import { defineStore } from 'pinia'
import { TagItem } from '../types/tagType'
import { v4 as uuid } from 'uuid'

export const useTagStore = defineStore('tag', {
  state: () => {
    return {
      tagList: [] as TagItem[],
      curTag: {}
    }
  },
  actions: {
    pushTagItem(curItem: TagItem) {
      const temp = {
        ...curItem,
        id: uuid()
      }
      this.tagList.push(temp)
      this.curTag = temp
    },
    delTagItem(id: string) {
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].id === id) this.tagList.splice(i, 1)
      }
    },
    selectTagItem(id: string) {
      console.log(id)
      this.curTag = this.tagList.find(item => item.id === id) || {}
    }
  }
})
