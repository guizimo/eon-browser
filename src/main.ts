import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setupStore } from './store'

const bootstrap = () => {
  const app = createApp(App)
  // 配置存储
  setupStore(app)
  // 加载图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // 屏蔽警告信息
  app.config.warnHandler = () => null
  app.use(ElementPlus).use(router).mount('#app')
}

// 初始化
bootstrap()
