---
title: 我的新博客
description: 讲述关于我的新博客的故事。
date: 2025-10-16 19:41:46
updated: 2025-10-16 19:41:46
image: # 图片
categories: [经验分享]
tags: [Blog, Vue]
---

## 前因
在好久之前，我看到了纸鹿佬的博客，观摩了一番后顿时觉得纸鹿佬的博客简直就是艺术品，嘎嘎好看。就有了像用佬的博客的想法，可惜一直没时间实现。最近发现我的博客屎山又堆砌起来了，于是乎就想着直接换成纸鹿佬的博客，经过几天的捣鼓也是成功了。本文用于记录一些编辑的方法。

## 配置
在完成纸鹿佬的 `REDME` 上写的基础修改后

### 新增页面
新增页面有两种方法，一种是直接在 `content` 文件夹下新建一个 `.md` 文件，另一个方法是在 `pages` 文件夹下新建一个 `.vue` 文件`。
`Vue` 文件的优先级比 `md` 文件高，创建完后在 `app\composables\useWidgets.ts` 中添加侧边栏路由就可以访问了

### 添加文章
在控制台使用
``` shell
pnpm new <文章名字>
```
就可以创建新文章了，文章名最好是英文名，中文路径不显示。

### 添加评论
在添加完评论的js文件后，可以在像添加评论的地方添加
``` vue
<PostComment />
```
组件，用 **md** 的页面自带评论

### 侧边栏
侧边栏在 `app\components\widget` 文件夹下新建组件，然后再在 `app\composables\useWidgets.ts` 中的 `import` 和 `rawWidgets` 中添加，就可以在侧边栏显示了。
启用侧边栏代码
``` js
const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-bulletin', 'blog-log'])
```
