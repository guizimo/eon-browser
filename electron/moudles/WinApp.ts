import { mainLog } from '../utils/logger';
import { app, dialog, ipcMain, Menu, type MessageBoxSyncOptions } from 'electron';
import * as remote from '@electron/remote/main';
import GlobalConfig from '../config/GlobalConfig';
import WinMain from './WinMain';
import WinTray from './WinTray';

export default class WinApp {
  // 初始化配置
  private static initAppConfig() {
    /** 禁用 硬件加速 */
    app.disableHardwareAcceleration();
    /** 禁用 Chromium 沙盒 */
    app.commandLine.appendSwitch('no-sandbox');
    /** 忽略证书相关错误 */
    app.commandLine.appendSwitch('ignore-certificate-errors');
    /** 禁用 GPU */
    app.commandLine.appendSwitch('disable-gpu');
    /** 禁用 GPU 沙盒 */
    app.commandLine.appendSwitch('disable-gpu-sandbox');
    /** 禁用 HTTP 缓存 */
    app.commandLine.appendSwitch('disable-http-cache');
    /** 禁用动画, 解决透明窗口打开闪烁问题 */
    app.commandLine.appendSwitch('wm-window-animations-disabled');
  }

  /**
   * 启动应用
   */
  static startApp() {
    if (!app.requestSingleInstanceLock()) {
      return this.exitApp('There are already instances running.');
    }
    /** 禁用默认系统菜单 */
    Menu.setApplicationMenu(null);
    /** 初始化 remote */
    remote.initialize();
    /** 初始化 app 配置 */
    this.initAppConfig();
    /** 加载环境变量 */
    GlobalConfig.loadEnvFile();
    /** 挂载全局变量 */
    GlobalConfig.mountGlobalVariables();

    /** 初始化完成 */
    app.whenReady().then(async () => {
      this.ipcListening();
      WinMain.create();
      WinMain.ipcListening();
      WinTray.initTrayMenu();
      WinTray.create();
      WinTray.ipcListening();
    });

    // APP监听事件
    this.appOnEvent();
  }

  /**
   * 重启应用
   */
  static restartApp() {
    !GlobalConfig.IS_DEV_MODE && app.relaunch();
    app.exit(0);
  }

  /**
   * 监听相关事件
   */
  static ipcListening() {
    /** 重启 */
    ipcMain.on('restart_app', () => this.restartApp());
  }

  /**
   * APP监听事件
   */
  static appOnEvent() {
    // 运行第二个实例时
    app.on('second-instance', () => WinMain.show('second-instance'));

    // 所有的窗口都被关闭
    app.on('window-all-closed', () => {
      WinTray.destroy();
      this.exitApp();
    });

    // 程序退出之前
    app.on('before-quit', () => {
      mainLog.log('[before quit app] ');
    });

    // 程序退出
    app.on('quit', () => {
      mainLog.log('[app is quit] ');
      WinTray.destroy();
      app.releaseSingleInstanceLock();
    });

    // 监听Webview新建的窗口
    app.on('web-contents-created', (event, contents) => {
      if (contents.getType() === 'webview') {
        contents.setWindowOpenHandler(({ url }) => {
          contents.loadURL(url);
          return { action: 'deny' };
        });
      }
    });
  }

  /**
   * 退出应用
   * @param title
   * @param content
   */
  static exitApp(title?: string, content?: string) {
    mainLog.log('[exit-app] ', title || '', content || '');
    if (title && content) {
      const callback = () => {
        const opt: MessageBoxSyncOptions = {
          type: 'warning',
          icon: GlobalConfig.APP_LOGO,
          noLink: true,
          title: title,
          message: `${content}`,
          buttons: ['确定'],
          cancelId: -1,
          defaultId: 0
        };
        dialog.showMessageBoxSync(opt);
        app.quit();
      };
      app.isReady() ? callback() : app.whenReady().then(callback);
    } else {
      app.quit();
    }
  }
}
