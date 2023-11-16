// electron/main.ts
import WinApp from './moudles/WinApp'
import { protocol } from 'electron'

// 协议保护
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true
    }
  }
])

// 关闭安全警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'false'

// 必要的全局错误捕获
process.on('uncaughtException', (error: Error) => {
  WinApp.exitApp('异常捕获', error.message || error.stack)
})

WinApp.startApp()
