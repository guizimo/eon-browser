import { v4 as uuid } from 'uuid'

export const tempTagItem = () => {
  return {
    icon: 'https://www.baidu.com/favicon.ico',
    name: '百度一下，你就知道',
    link: 'https://www.baidu.com/',
    id: uuid()
  }
}
