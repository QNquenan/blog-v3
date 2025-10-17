---
title: Windows安装alist并美化
tags:
  - alist
  - windows
  - 美化
categories:
  - [前端]
  - [美化]
  - [软件]
cover: "https://tuchuang.voooe.cn/images/2024/06/19/WindowsInsAlist.webp"
abbrlink: 67ef0433
date: 2024-04-19 11:21:38
---

## 前言

本文安装部分教程只针对 `Windows` 系统毕竟 Linux 系统可以一键部署，不需要教了。

## 安装

1. 前往 [Releases · alist-org/alist (github.com)](https://github.com/alist-org/alist/releases) 根据自身情况下载对应的压缩包，我的是 `alist-windows-amd64.zip`

2. 解压到任意文件夹内

3. 在当前文件夹下打开 `cmd`

4. 输入

   ```cmd
   .\alist.exe server # 运行程序

   .\alist.exe admin # 获取管理员信息 （默认是admin）

   .\alist admin set [password] # 修改自己的管理员密码
   ```

5. 默认访问地址是 [127.0.0.1:5244](127.0.0.1:5244)

{% folding ,配置开机自启 %}

> 此处使用知乎大佬 [遮羽](https://zhuanlan.zhihu.com/p/586155507) 的 vbs 代码
>
> 在 AList.exe 所在的目录下，创建一个 txt 文件，将后缀名改.vbs 输入代码

```vbs
Set ws = CreateObject("Wscript.Shell")
ws.run "cmd /c .\alist.exe server",vbhide
```

{% endfolding %}

## 美化

添加的不多

头部

```html
<link
  rel="stylesheet"
  href="https://cdn.staticfile.net/lxgw-wenkai-screen-webfont/1.7.0/lxgwwenkaigbscreen.min.css"
/>
<style>
  * {
    font-family: LXGW WenKai Screen;
  }
  /* 背景 */
  .hope-ui-light {
    background-size: 20rem;
    background-image: url(https://img2.imgtp.com/2024/03/19/fhMevDWK.svg) !important;
    background-repeat: initial;
    background: #fcfcfc;
    background-attachment: local;
    background-position: center;
  }

  .hope-c-PJLV-idaeksS-css,
  .hope-c-PJLV-ikaMhsQ-css {
    background: none !important;
  }

  ::selection {
    background: #fbc2eb;
    color: #fff;
  }

  * {
    letter-spacing: 2px;
  }

  .footer {
    display: none !important;
  }

  .hope-c-PJLV-ikSuVsl-css {
    background: none !important;
  }

  .markdown-body a {
    color: #000 !important;
  }

  .hope-ui-dark .markdown-body a {
    color: #fff !important;
  }

  .copyright a,
  .copyright .by {
    text-decoration: none;
  }

  .copyright .by {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .copyright a {
    display: flex;
    justify-content: center;
    margin: 0 10px;
    position: relative;
    transition: 0.5s;
  }

  .copyright .xhx {
    background: pink;
    height: 3px;
    border-radius: 10px;
    width: 0;
    position: absolute;
    bottom: -3px;
    transition: 0.5s;
  }

  .copyright a:hover {
    color: pink;
  }

  .copyright a:hover .xhx {
    width: 100%;
  }

  .copyright .run_item {
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .copyright .link {
    padding: 4px;
    background: rgba(255, 133, 153);
    color: #fff;
    border-radius: 0 8px 8px 0;
  }

  .copyright .name {
    padding: 4px;
    background: #fff;
    border-radius: 8px 0 0 8px;
    color: #000;
  }

  .copyright {
    padding: 50px;
    color: #000 !important;
  }

  .runtime {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .about,
  .state {
    width: min(99%, 980px);
    text-align: center;
    padding-inline: 2%;
  }

  .state {
    margin-top: 20px;
  }
</style>
```

内容

```html
<div class="copyright" align="center">
  <div class="about">
    <div class="runtime">
      <span class="run_item">
        <span class="name">AList</span>
        <span class="link">UI</span>
      </span>
      <span class="run_item">
        <span class="name">中国移动云盘</span>
        <span class="link">挂载</span>
      </span>
      <span class="run_item">
        <span id="runtime_span"></span>
      </span>
      <script type="text/javascript">
        function show_runtime() {
          window.setTimeout("show_runtime()", 1000);
          X = new Date("12/3/2023 00:00:00");
          Y = new Date();
          T = Y.getTime() - X.getTime();
          M = 24 * 60 * 60 * 1000;
          a = T / M;
          A = Math.floor(a);
          b = (a - A) * 24;
          B = Math.floor(b);
          c = (b - B) * 60;
          C = Math.floor((b - B) * 60);
          D = Math.floor((c - C) * 60);
          runtime_span.innerHTML =
            '<span class="name">稳定运行' +
            A +
            '天</span><span class="link">' +
            B +
            "时" +
            C +
            "分" +
            D +
            "秒</span>";
        }
        show_runtime();
      </script>
    </div>
  </div>
  <div class="state">
    <p>
      免责声明：本站为个人网盘，网盘所发布的一切影视、源代码、注册信息及软件等资源仅限用于学习和研究目的
    </p>
  </div>
  <div class="by">
    <span>Powered By</span>
    <a href="https://quenan.cn" target="_blank">
      <span>Quenan</span>
      <div class="xhx"></div>
    </a>
    <span>| ©2023</span>
  </div>
</div>
```
