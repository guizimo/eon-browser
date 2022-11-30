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
    /**
     * 打开新的窗口
     * @param curItem
     */
    pushTagItem(curItem: TagItem) {
      const temp = {
        ...curItem,
        id: uuid()
      }
      this.curTagId = temp.id
      this.tagList.push(temp)
    },
    /**
     * 根据ID删除指定的窗口
     * @param id
     */
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
    /**
     * 编辑窗口信息
     */
    editTagItemById(params: any) {
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].id === params.id) {
          this.tagList[i] = {
            ...this.tagList[i],
            ...params
          }
        }
      }
    },
    /**
     * 选中窗口
     * @param id
     */
    selectTagItem(id: string) {
      const curItem = this.tagList.find(item => item.id === id)
      this.curTagId = curItem ? curItem.id : ''
    }
  }
})
