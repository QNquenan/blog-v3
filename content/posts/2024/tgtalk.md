---
title: 基于Tg的说说
tags: [博客, Hexo, 说说]
categories: [代码]
image:
description: 这篇文章讲述了如何安装基于Telegram的说说页面
date: 2024-03-29 11:33:18
---

## 前言

> 今天懒啊，很懒啊，不放图片了听不懂再在评论区问叭 😜

项目起源于 [ChenYFan](https://github.com/ChenYFan)
项目地址：

::link-card
---
icon: https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg
title: TGTalk FrontEnd
link: https://github.com/FloatSheep/tgtalk-frontend
---
::

我的 butterfly 分支：

::link-card
---
icon: https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg
title: tgtalk-frontend-butterfly
link: https://github.com/QNquenan/tgtalk-frontend-butterfly
---
::

<br />

::alert{type="question"}
下列教程基本超搬 [TGTalk FrontEnd](https://github.com/FloatSheep/tgtalk-frontend)
::

::folding{open title="更新日志"}

:::timeline
{2024-4-2}
1. 更新 `css` ，修改图片大小
:::
::

## 创建频道

这边以电脑版 Tg 为例

1. 点击右边三条杠，呼出菜单
2. 选择 **创建频道**
3. 选择公开，输入频道外链
4. 拉人可选跳过
5. 就创建好啦

## 部署 API

1. 前往 [Gist](https://gist.github.com/ChenYFan/4e88490212e3e08e06006cf31140cd3f) ，复制其中所有代码
2. 进入 [Cloudflare](https://dash.cloudflare.com/)
3. 在右侧选择 **Workers 和 Pages** => **概叙** => **创建应用程序**
4. 点击 **创建 Worker** => **修改名称(名称随意)** => **部署** => **编辑代码**
5. 在其中粘贴所有复制的代码，修改 `ChannelName` 为 Tg 频道名称，点击 **部署** 并访问 **Worker** 查看是否能正确返回内容

::alert{type="question"}
如果不能返回内容，请将 `nextBefore` 一行更改为 `Number((getDataFromTelegram.match(/data-before="([0-9]+)"/g) || ["0"])[0].match(/[0-9]+/g))`
::

## API 绑定域名

::alert{type="question"}
貌似需要域名 DNS 在 CF
::

1. 点击域名，进入域名管理界面
2. 右侧点击 **DNS** ，新建解析
3. 类型为 `A` ，名称任意填写子域，IPv4 地址随便填写，但是不能指向 CF 本身，点击 **保存**
4. 右侧点击 **Workers 路由** => **添加路由**
5. 此时会弹出一个弹窗，路由填写你的子域，worker 选择你的 woker

## 添加说说页面

1. 在控制台输入
   ```shell
   hexo new page [页面名称，此处我填的是tgtalk]
   ```
2. 在 `/source/tgtalk/index.md` 中编辑
3. 添加样式文件
   {% note info simple %} 如果你有能力，我更推荐你自己编写样式和模板，这样你能更好控制显示效果，除此之外，你还能更好的避免样式污染（将样式生效范围限定在挂载容器之内） {% endnote %}

   ```html
   <link
     rel="stylesheet"
     href="https://registry.npmmirror.com/@floatsheep/tg-talker/latest/files/dist/main.css"
   />
   ```

   我自用的样式：

   ```css
   /* Tg说说 */

   .content-container {
     padding: 10px 0;
     column-count: 3;
     /* 列数 */
     column-gap: 20px;
     /* 列间距 */
   }

   #article-container .message {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     break-inside: avoid;
     /* 避免在列中间断 */
     margin-bottom: 20px;
     /* 间距 */
     padding: 10px 20px;
     border: 2px solid #e5e5e5;
     border-radius: 20px;
     transition: all 0.3s;
   }

   #article-container .message:hover {
     box-shadow: 0 15px 32px rgba(0, 0, 0, 0.15);
     border-color: var(--theme-color);
   }

   #article-container p {
     margin: 0 0 5px !important;
     flex-basis: 100%;
   }

   #article-container .image:not(:empty) {
     /* flex: 0 0 calc(24% - 4px); */ /* 如果需要固定死一行放四个请取消注释 */
     height: 100px;
     margin: 3px;
   }

   #article-container .point {
     font-size: 1.5em;
   }

   #article-container .info-header {
     display: none;
   }

   #article-container .Tag {
     display: flex;
     align-items: center;
     justify-content: space-between;
   }

   #article-container .text a {
     width: 100%;
   }

   #article-container .time {
     flex-basis: 100%;
     display: flex;
     padding: 5px 0;
     border-top: 2px dashed #e5e5e5;
   }

   #article-container img {
     width: 100%;
     height: 100%;
     border-radius: 10px;
     margin: 0 !important;
   }

   #article-container .time-in {
     padding: 0 5px;
     font-size: 15px;
     margin: 10px 0;
     border: 2px solid #e5e5e5;
     border-radius: 25px;
   }

   #article-container .tagList .tags {
     color: #00c2ff;
     margin-right: 10px;
     line-height: 30px;
     display: inline-block;
   }

   #article-container i {
     font-style: normal !important;
     background: none !important;
   }

   #article-container #load-more {
     position: absolute;
     top: 40px;
     left: 50%;
     transform: translateX(-50%);
   }

   @media (max-width: 768px) {
     .content-container {
       column-count: 1 !important;
       /* 列数 */
       column-gap: 15px;
       /* 列间距 */
     }
   }

   /* Tg说说 end */
   ```

4. 添加初始化脚本和主要脚本
   ```html
   <script>
     window.G_CONFIG = {
       api: "https://tgtalk.api.eurekac.cn", // 你部署的 API
       ref: "g-container", // 你想要挂载的容器
       template: "default", // 选择 "custom" 或者 "default"
       zoom: true, // 启用 Medium-Zoom（点击图片放大）
     };
   </script>
   <script src="https://registry.npmmirror.com/@floatsheep/tg-talker/latest/files/dist/index.js"></script>
   <div id="g-container"></div>
   <!--你可以更改ID-->
   <button id="load-more">加载更多</button>
   <!--加载更多按钮-->
   ```
   如果想用我的修改版，那就去我分支的 [Releases](https://github.com/QNquenan/tgtalk-frontend-butterfly/releases) 下载 js，替换掉原链接即可

## 开放的 Handlebars Helper

这些是本项目中开放的 Handlebars Helper，如果你要编写自己的模板，或许会对你有所帮助：

|     名字     |                          使用方法                          |                                效果                                |
| :----------: | :--------------------------------------------------------: | :----------------------------------------------------------------: |
| tagExtractor |                     tagExtractor(text)                     |                      遍历并返回 text 中的 tag                      |
| tagConverter |             tagConverter(text, renderTagList)              |                  转换 a 标签为 tagList 中的 tags                   |
|   contains   |     contains(str, sub)<br />(contains text "Channel")      |                      判断 str 中是否包括 sub                       |
|     not      |      not(value)<br /> (not (contains text "Channel"))      | 返回给定值的相反值（true -> false / false -> true），可与 #if 连用 |
| replaceImage | replaceImage(originalLink)<br />`{{ replaceImage this }} ` |                            覆写图片链接                            |
| replaceTime  |    replaceTime(timestamp)<br />`{{replaceTime time}}  `    |                        重写时间戳为本地时间                        |
|  maskRender  |       maskRender(text)<br />`{{maskRender text}}  `        |             转换文字中的 Telegram 遮罩为 plugin-heimu              |
|     add      |                         add(a, b)                          |                     将 a 与 b 相加（数字类型）                     |
