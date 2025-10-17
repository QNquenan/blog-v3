---
title: 侧滑菜单Div模式
categories: [代码]
tags: [Mui, 前端, 移动应用]
description: Muiの侧滑菜单Div模式笔记
image: "https://tuchuang.voooe.cn/images/2024/06/19/MUICanvas.webp"
date: 2024-02-20 21:56:53
---

## 前言

由于 Mui 官网写的文档不详细，所以在此记录一下 Div 模式的侧滑菜单

## 完整代码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello MUI</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <link rel="stylesheet" href="css/mui.min.css" />
  </head>

  <body>
    <div class="mui-off-canvas-wrap mui-draggable">
      <!--侧滑菜单部分-->
      <aside id="offCanvasSide" class="mui-off-canvas-left">
        <div id="boxx" class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <div class="tx">
              <img />
            </div>
            <div class="name">张三</div>
            <ul id="menuList" class="mui-table-view mui-table-view-chevron">
              <li class="mui-table-view-cell mui-media">
                <a href="javascript:;" id="zhuYe"> 首页 </a>
              </li>
              <li class="mui-table-view-cell mui-media">
                <a href="javascript:;" id="xinDe"> 心得 </a>
              </li>
              <li class="mui-table-view-cell mui-media">
                <a href="javascript:;" id="gyhd"> 公益活动 </a>
              </li>
              <li class="mui-table-view-cell mui-media">
                <a href="javascript:;" id="sjfx"> 数据分析 </a>
              </li>
              <li class="mui-table-view-cell mui-media">
                <a href="javascript:;" id="sheZhi"> 设置 </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <!--主界面部分-->
      <div class="mui-inner-wrap">
        <header class="mui-bar mui-bar-nav">
          <a
            href="#offCanvasSide"
            class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"
          ></a>
          <h1 class="mui-title">首页</h1>
        </header>
        <div id="box" class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <div class="mui-content"></div>
          </div>
        </div>
        <!-- 关闭遮罩，点击可关闭 -->
        <div class="mui-off-canvas-backdrop"></div>
      </div>
    </div>
    <script src="js/mui.min.js"></script>
    <script>
      mui.init();

      mui("#box").scroll();
      mui("#boxx").scroll();
    </script>
  </body>
</html>
```

## 补充

### 显示侧滑按钮的事件

```javascript
offCanvasWrapper.offCanvas("show");
```

### 显示侧滑按钮的事件

```javascript
offCanvasWrapper.offCanvas("hide");
```
