---
title: 超链接动画样式
categories: [代码]
tags: [Css, 前端]
description: 纯Css写的超链接的下划线动画样式练手
image: "https://tuchuang.voooe.cn/images/2024/06/19/linkTransition.webp"
date: 2024-03-15 14:59:48
---

## 前言

觉得原来的超链接样式不是很符合我的审美，所以就改了一下，本文章用于记录防止遗忘咋写的

## HTML

```HTML
<a href="#">我是超链接</a>
```

## CSS

```css
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 设置居中 */
}

a {
  /* 清除超链接样式 */
  text-decoration: none;
  /* 更改初始颜色 */
  color: #000;
  /* 设置过渡动画 */
  transition: all 0.3s;
  /* 设置相对定位 */
  position: relative;
}

a::before {
  /* 设置一个填充让伪元素正常渲染 */
  content: " ";
  /* 设置绝对定位 */
  position: absolute;
  /* 设置底部距离 */
  bottom: -3px;
  /* 设置宽度 */
  width: 100%;
  /* 设置高度 */
  height: 2px;
  /* 设置过渡动画 */
  transition: all 0.3s;
  /* 设置水平方向缩放比例 */
  transform: scaleX(0);
  /* 设置背景 */
  background: rgb(255, 133, 153);
}

a:hover {
  /* 设置鼠标接触时颜色 */
  color: rgb(255, 133, 153);
}

a:hover::before {
  /* 设置比例为1，使其显示 */
  transform: scaleX(1);
}
```
