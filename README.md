# GZM Browser

![GZM Browser](https://guizimo.oss-cn-shanghai.aliyuncs.com/img/image-20230331154750421.png)

## 1、介绍

GZM Browser是一个没有同源限制的浏览器。界面采用大胆的Arc的风格。

**首页**

左边为标签栏，右边为显示区域，提高了视觉占比。

![首页](https://guizimo.oss-cn-shanghai.aliyuncs.com/img/image-20230331155311493.png)

**首页-全景**

所见“全”所得！

![首页-全景](https://guizimo.oss-cn-shanghai.aliyuncs.com/img/image-20230331155547629.png)

## 2、运行

**安装依赖**

```zsh
yarn
```

**运行**

```zsh
yarn run dev
```
**生成图片**

图片地址：`public/icon.png`

```zsh
yarn run electron:generate-icons
```

**构建打包**

```zsh
yarn run electron:build
```

## 3、鸣谢

1、[CSDN](https://blog.csdn.net/qq_53225741/article/details/124964773?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-124964773-blog-125671796.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-124964773-blog-125671796.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=1)

2、[Element](https://element-plus.org/zh-CN)

3、[pinia](https://pinia.vuejs.org/)