---
title: 纯Css实现Input的动画样式
categories: [代码]
tags: [Css, 前端]
description: 纯Css写的Input动画样式
image: "https://tuchuang.voooe.cn/images/2024/06/19/inputCss.webp"
date: 2024-03-05 18:14:37
---

## 前言

灵感来自油管 [传送门](https://m.youtube.com/watch?v=Tp1slQwyWaE&feature=youtu.be)

看到 chatGPT 官网的登陆页面有这个样式，看着挺好看，所以就去找了下教程，并且自己优化了一点，纯 css 实现

## 基础

首先创建一个盒子用于存放 `input` 和 `label`

```html
<div class="inputBox">
  <input type="text" placeholder=" " class="input" id="input-userName" />
  <label for="input-userName" class="label">用户名</label>
</div>
```

给他们加上样式

```css
body {
  /* 设置弹性盒子 */
  display: flex;
  /* 居中 */
  align-items: center;
  justify-content: center;
  /* 填充满屏幕 */
  width: 100%;
  height: 100vh;
}

.inputBox {
  /* 子绝父相，故设置父元素为相对定位 */
  position: relative;
}

.input {
  /* 取消自带样式轮廓 */
  outline: none;
  /* 添加边框 */
  border: 2px solid #000;
  /* 添加内边距 */
  padding: 5px;
  /* 添加圆角 */
  border-radius: 5px;
}

.label {
  /* 设置绝对定位，脱离文档流 */
  position: absolute;
  /* 设置居中 */
  top: 50%;
  transform: translateY(-50%);
  /* 强制不换行 */
  white-space: nowrap;
  /* 设置左边距离 */
  left: 15px;
  /* 设置字体大小 */
  font-size: 12px;
  /* 设置字体粗细 */
  font-weight: bold;
  /* 添加上过渡动画 */
  transition: all 0.2s;
  /* 设置左右内边距 */
  padding: 0 3px;
}
```

添加上获得焦点样式，

`.input:not(:placeholder-shown).input:not(:focus) ~ .label` 的意思是：

当输入框不具有占位符、且不处于焦点状态时选择其后的兄弟元素中类名为 "label" 的元素

```css
.input:focus ~ .label,
.input:not(:placeholder-shown).input:not(:focus) ~ .label {
  /* 将提示文字移到上方 */
  top: 1.5px;
  /* 将提示文字向左移 */
  left: 10px;
  /* 显示背景，覆盖掉边框 */
  background: #fff;
}
```

至此，最基本的样子就有了，只需要再加上一点点的样式

## 进阶

获得焦点的颜色样式

```css
.input:focus {
  /* 更改边框颜色 */
  border: 2px solid rgb(0, 200, 255);
}

.input:focus ~ .label {
  /* 更改字体颜色 */
  color: rgb(0, 200, 255);
}
```
