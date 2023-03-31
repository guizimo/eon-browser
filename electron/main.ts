// electron/main.ts
import { app, BrowserWindow, Menu, protocol, globalShortcut, ipcMain } from 'electron'
import { join } from 'path'

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true
    }
  }
])

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// 取消菜单栏
// Menu.setApplicationMenu(null)

let mainWindow: BrowserWindow

// 创建浏览器窗口
const createWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'GZM Browsers',
    titleBarStyle: 'hidden',
    width: 1200,
    height: 750,
    trafficLightPosition: { x: 15, y: 20 },
    webPreferences: {
      preload: join(__dirname, '../electron/preload.js'),
      webviewTag: true,
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    // 开发者工具
    mainWindow.webContents.openDevTools()
  } else {
    // load your file
    mainWindow.loadFile(join(__dirname, '../index.html'))
  }

  // if (process.platform === 'darwin') {
  //   let contents = mainWindow.webContents
  //   globalShortcut.register('CommandOrControl+C', () => {
  //     contents.copy()
  //   })
  //   globalShortcut.register('CommandOrControl+V', () => {
  //     contents.paste()
  //   })
  // }
}

// Electron结束初始化和创建浏览器窗口时调用
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 在macOS上，点击dock中的应用图标，没有打开其他的窗口时，会自动创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 所有的窗口关闭
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 阻止新开窗口
let contentTemp: any = null

const newWindowListener = (event: Event) => {
  event.preventDefault()
  contentTemp?.removeListener('new-window', newWindowListener)
}
app.on('web-contents-created', (event, webContents) => {
  webContents.addListener('new-window', newWindowListener)
  contentTemp = webContents
})


ipcMain.on('put-away-traffic-light', () => {
  mainWindow.setWindowButtonVisibility(false)
})

ipcMain.on('open-away-traffic-light', () => {
  mainWindow.setWindowButtonVisibility(true)
})
