// electron/main.ts
import { app, BrowserWindow } from 'electron'

// 创建浏览器窗口
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Main window'
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // load your file
    mainWindow.loadFile('index.html')
  }
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
