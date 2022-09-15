import { defineStore } from 'pinia'
import { TagItem } from '../types/tagType'
import { v4 as uuid } from 'uuid'

export const useTagStore = defineStore('tag', {
  state: () => {
    return {
      tagList: [] as TagItem[],
      curTagId: ''
    }
  },
  actions: {
    pushTagItem(curItem: TagItem) {
      const temp = {
        ...curItem,
        id: uuid()
      }
      this.curTagId = temp.id
      this.tagList.push(temp)
    },
    delTagItem(id: string) {
      if (this.tagList.length === 1) {
        // 删除只有一个tab时，不允许删除
        return
      }
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].id === id) this.tagList.splice(i, 1)
      }
      if (this.curTagId === id) {
        // 删除当前tag
        const curItem = this.tagList[this.tagList.length - 1]
        this.curTagId = curItem ? curItem.id : ''
      }
    },
    selectTagItem(id: string) {
      const curItem = this.tagList.find(item => item.id === id)
      this.curTagId = curItem ? curItem.id : ''
    }
  }
})
