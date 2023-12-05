/**
 * 全局配置
 */

import NodeOS from 'os'
import NodePath from 'path'
import { config } from 'dotenv'
import { app, screen, BrowserWindow } from 'electron'
import PKG from '../../package.json'

class GlobalConfig {
  // 是否为 windows 平台
  static readonly IS_WIN32 = process.platform === 'win32'
  // 是否为 MacOS 平台
  static readonly IS_MACOS = process.platform === 'darwin'
  // 是否为 Linux 平台
  static readonly IS_LINUX = process.platform === 'linux'
  // 是否为开发模式
  static readonly IS_DEV_MODE = !app.isPackaged
  // 项目名称
  static readonly PROJECT_NAME = PKG.name

  /**
   * 源码目录
   * - dev : {project directory}/
   * - prod :
   *    1. on macOS : /Applications/{app name}.app/Contents/Resources/app?.asar
   *    2. on Linux : {installation directory}/resources/app?.asar
   *    3. on Windows : {installation directory}/resources/app?.asar
   */
  static readonly DIR_APP = app.getAppPath()

  // 静态资源目录
  static readonly DIR_STATIC = NodePath.resolve(this.DIR_APP, 'static')

  // 存放资源文件的目录
  static readonly DIR_RESOURCES = NodePath.resolve(
    this.DIR_APP,
    this.IS_DEV_MODE ? '' : '..'
  )

  // 根目录/安装目录
  static readonly DIR_ROOT = this.IS_DEV_MODE
    ? this.DIR_APP
    : NodePath.resolve(this.DIR_RESOURCES, '..')

  // 图标路径
  private static readonly LOGO_PATH = {
    win32: 'icons/256x256.png',
    darwin: 'icons/icon.icns',
    linux: 'icons/256x256.png'
  }

  // 客户端图标
  static readonly APP_LOGO = NodePath.join(
    this.DIR_STATIC,
    this.LOGO_PATH[process.platform]
  )

  // 最小化图标
  static readonly DOCKER_LOGO = NodePath.join(
    this.DIR_STATIC,
    this.LOGO_PATH.linux
  )

  // 运行地址
  static WIN_URL = NodePath.join(this.DIR_APP, "dist", "index.html")

  /**
   * 加载环境变量, 默认为 .env 文件
   * 若要打包后在主进程中也能访问环境变量, 需要将配置文件一起打包
   * 在 package.json 的 build.files 中添加文件名即可
   */
  static loadEnvFile() {
    if (this.IS_DEV_MODE) {
      config()
    } else {
      config({ path: NodePath.resolve(this.DIR_APP, '.env') })
    }
    this.loadWinUrl()
  }

  /**
   * 加载WinUrl配置
   */
  static loadWinUrl() {
    if (this.IS_DEV_MODE) {
      this.WIN_URL = `http://${process.env.VITE_BASE_HOST}:${process.env.VITE_BASE_PORT}`
    } else {
      this.WIN_URL =  NodePath.join(this.DIR_APP, "dist", "index.html")
    }
  }

  /**
   * 获取程序名称
   */
  static getAppTitle() {
    return process.env.VITE_APP_TITLE || this.PROJECT_NAME
  }

  /**
   * 本地日志路径
   */
  static getLocalLogsPath() {
    switch (true) {
      case this.IS_WIN32:
        return app.getPath('logs')
      case this.IS_MACOS:
        return NodePath.join(
          NodeOS.homedir(),
          'Library/Logs',
          this.PROJECT_NAME
        )
    }
    return ''
  }

  /**
   * 挂载全局变量
   */
  static mountGlobalVariables() {
    /** 静态资源路径 */
    global.StaticPath = this.DIR_STATIC
    /** 客户端图标 */
    global.ClientLogo = this.APP_LOGO
    /** 客户端版本号 */
    global.ClientVersion = PKG.version
  }

  /**
   * 根据分辨率适配窗口大小
   * @param dto
   * @param win
   */
  static adaptByScreen(dto: WinStateDTO, win: BrowserWindow | null) {
    const devWidth = 1920
    const devHeight = 1080
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize // 显示器工作区域大小
    const zoomFactor = Math.max(
      workAreaSize.width / devWidth,
      workAreaSize.height / devHeight
    )
    const realSize = { width: 0, height: 0 }
    realSize.width = Math.round(dto.width * zoomFactor)
    realSize.height = Math.round(dto.height * zoomFactor)
    win?.webContents.setZoomFactor(zoomFactor)
    return realSize
  }
}

export default GlobalConfig
