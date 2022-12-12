import { defineStore } from 'pinia'

export const useBookMarkStore = defineStore('bookMark', {
  state: () => {
    return {
      bookMarkList: [
        {
          icon: 'https://www.baidu.com/favicon.ico',
          name: '归子莫',
          link: 'https://www.guizimo.com'
        },
        {
          icon: 'https://www.baidu.com/favicon.ico',
          name: '百度',
          link: 'https://www.baidu.com'
        }
      ]
    }
  },
  actions: {}
})
