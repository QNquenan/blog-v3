---
title: 自用的bf导航栏魔改
tags:
  - Butterfly
  - 魔改
categories:
  - 博客
cover: "https://tuchuang.voooe.cn/images/2024/06/19/bfNav.webp"
abbrlink: 7aeab8a1
date: 2024-03-25 21:04:52
---

## 前言

这几天看到安知鱼大佬的洪里洪气的导航栏甚是喜欢，特别是那个下滑显示文章/页面标题，上滑显示菜单的功能十分眼馋。就找了找教程加上扒一下站，就有了这篇文章

## 参考

{% link 关于Butterfly的导航栏的一些教程,Ariasaka,https://blog.yaria.top/posts/53e6b356 %}

{% link 安知鱼,安知鱼,https://blog.anheyu.com/ %}

## 我的魔改

我的导航栏使用了 `Ariasaka` 大佬的

- 分离搜索栏与菜单栏
- 导航栏居中
- 导航栏居中
- 网站标题部分的增强版
- 顶栏常驻
- 显示标题

至于 **去掉导航栏项目底下的蓝色长条** 这个魔改我没用，因为我还是很喜欢下划线的，所以就做了一点魔改：

- 更改下划线颜色
- 更改下划线动画由中间向两边扩开
  具体可以看我的

  {% link 超链接动画样式,鹊楠吖,https://www.quenan.cn/posts/42329.html%}

### 显示标题洪哥切换动画版

1. 修改 `[blogRoot]\themes\Butterfly\layout\includes\header\nav.pug`

   ```diff
    nav#nav
    span#blog-info
        a(href=url_for('/') title=config.title)
        if theme.nav.logo
            img.site-icon(src=url_for(theme.nav.logo))
        if theme.nav.display_title
            span.site-name=config.title

    #menus
        if (theme.algolia_search.enable || theme.local_search.enable || theme.docsearch.enable)
        #search-button
            a.site-page.social-icon.search(href="javascript:void(0);")
            svg.meta_icon(style="width:20px;height:20px;position:relative;top:2px").post-ui-icon
                use(xlink:href='#icon-sousuo')
        !=partial('includes/header/menu_item', {}, {cache: true})
    +    div.titleNameBox
    +      center(id="name-container")
    +        a(id="page-name" href="javascript:scrollToTop()") PAGE_NAME
        ...
   ```

   这是节选，不能直接覆盖

2. 在 `/source/js` 目录下新建 `nav.js`，并引入

   ```javascript
   document.addEventListener("pjax:complete", tonav);
   document.addEventListener("DOMContentLoaded", tonav);
   //响应pjax
   function tonav() {
     // document.getElementById("name-container").setAttribute("style", "display:none");

     var position = $(window).scrollTop();

     $(window).scroll(function () {
       var scroll = $(window).scrollTop();

       if (scroll > position) {
         document
           .getElementById("name-container")
           .setAttribute("style", "top: 0 !important;");
         // document.getElementById("name-container").classList.add('titleShow');
         document
           .getElementsByClassName("menus_items")[1]
           .setAttribute("style", "top: -60px !important");
       } else {
         document
           .getElementsByClassName("menus_items")[1]
           .setAttribute("style", "");
         document.getElementById("name-container").setAttribute("style", "");
         // document.getElementById("name-container").classList.remove('titleShow');
       }

       position = scroll;
     });
     function scrollToTop() {
       document
         .getElementsByClassName("menus_items")[1]
         .setAttribute("style", "");
       document.getElementById("name-container").setAttribute("style", "");
       btf.scrollToDest(0, 500);
     }
     //修复没有弄右键菜单的童鞋无法回顶部的问题
     document.getElementById("page-name").innerText =
       document.title.split(" | 鹊楠の小窝")[0];
     document
       .getElementById("page-name")
       .addEventListener("click", scrollToTop);
   }
   ```

3. 添加 css 样式，(由于我的样式都是野鸡写法，所以直接把整个 nav 的样式表贴过来了)

   ```css
   /* 导航栏魔改 */

   /* 一级菜单居中 */
   #nav .menus_items {
     display: inline-block !important;
     transition: all 0.3s;
     position: absolute !important;
     width: fit-content !important;
     top: 50%;
     left: 50% !important;
     transform: translate(-50%, -50%) !important;
   }

   #nav #blog-info {
     flex: none !important;
   }

   /* 子菜单居中 */
   .menus_item_child li:not(#sidebar-menus li) {
     float: left;
     border-radius: 6px !important;
     -webkit-border-radius: 6px !important;
     -moz-border-radius: 6px !important;
     -ms-border-radius: 6px !important;
     -o-border-radius: 6px !important;
   }

   .menus_item_child:not(#sidebar-menus ul) {
     /* left:calc(-150%)!important;这是估算值，为了保持元素居中的，如果不合适可以自己调改为：*/
     left: 50%;
     translate: -50%;
   }

   /* 标题遮罩 */
   .site-name::before {
     opacity: 0;
     background-color: var(--theme-color) !important;
     border-radius: 8px;
     -webkit-border-radius: 8px;
     -moz-border-radius: 8px;
     -ms-border-radius: 8px;
     -o-border-radius: 8px;
     transition: 0.3s;
     -webkit-transition: 0.3s;
     -moz-transition: 0.3s;
     -ms-transition: 0.3s;
     -o-transition: 0.3s;
     position: absolute;
     top: 0 !important;
     right: 0 !important;
     width: 100%;
     height: 100%;
     content: "\f015";
     box-shadow: 0 0 5px var(--theme-color);
     font-family: "Font Awesome 6 Free";
     text-align: center;
     color: white;
     line-height: 34px;
     /*如果有溢出或者垂直不居中的现象微调一下这个参数*/
     font-size: 18px;
     /*根据个人喜好*/
   }

   .site-name:hover::before {
     opacity: 1;
     scale: 1.03;
   }

   .site-name {
     position: relative;
     font-size: 24px;
     /*一定要把字体调大点，否则效果惨不忍睹！*/
   }

   #nav.hide-menu #toggle-menu {
     display: none !important;
     padding: 0 6px;
   }

   #search-button,
   #toggle-menu {
     position: relative;
   }

   /* 标题 */
   #nav {
     justify-content: space-between !important;
   }

   .nav-fixed #nav {
     transform: translateY(60px) !important;
     -webkit-transform: translateY(60px) !important;
     -moz-transform: translateY(60px) !important;
     -ms-transform: translateY(60px) !important;
     -o-transform: translateY(60px) !important;
     transition: all 0.4s !important;
     -webkit-transition: all 0.4s !important;
     -moz-transition: all 0.4s !important;
     -ms-transition: all 0.4s !important;
     -o-transition: all 0.4s !important;
   }

   #page-name::before {
     font-size: 18px;
     position: absolute;
     min-width: 100px;
     width: 100%;
     height: 35px;
     border-radius: 8px;
     color: white !important;
     top: 50%;
     transform: translate(-50%, -50%);
     left: 50%;
     content: "回到顶部";
     background-color: var(--theme-color);
     transition: all 0.3s;
     -webkit-transition: all 0.3s;
     -moz-transition: all 0.3s;
     -ms-transition: all 0.3s;
     -o-transition: all 0.3s;
     opacity: 0;
     box-shadow: 0 0 3px var(--theme-color);
     line-height: 35px;
     /*如果垂直位置不居中可以微调此值，也可以删了*/
   }

   #page-name:hover:before {
     opacity: 1;
   }

   @media screen and (max-width: 768px) {
     #name-container {
       display: none !important;
     }

     .site-name::before {
       line-height: 28px !important;
       font-size: 16px !important;
     }

     #nav .menus_items {
       display: none !important;
     }

     #nav.hide-menu #toggle-menu {
       display: inline-block !important;
     }

     .menus_item_child:not(#sidebar-menus ul) {
       /* left:calc(-150%)!important;这是估算值，为了保持元素居中的，如果不合适可以自己调改为：*/
       translate: 0;
     }

     .menus_item_child li:not(#sidebar-menusli) {
       float: none;
     }

     #sidebar #sidebar-menus .menus_items .site-page:hover {
       color: #fff !important;
     }
   }

   .titleNameBox {
     z-index: -1;
     overflow: hidden;
     width: 100%;
     height: 100%;
     position: absolute;
     left: 0;
     top: 0;
   }

   #name-container {
     transition: all 0.3s;
     -webkit-transition: all 0.3s;
     -moz-transition: all 0.3s;
     -ms-transition: all 0.3s;
     -o-transition: all 0.3s;
     position: absolute;
     top: 60px;
     left: 50%;
     transform: translateX(-50%);
     height: 100%;
   }

   #name-container a {
     height: 100%;
     line-height: 60px;
     display: inline-block;
     padding: 0 !important;
     position: relative;
   }

   #name-container:hover {
     scale: 1.03;
   }

   #page-name {
     position: relative;
     padding: 10px 30px;
     /*如果文字间隔不合理可以微调修改，第二个是水平方向的padding，第一个是垂直的*/
   }

   @media screen and (max-width: 1060px) {
     #nav .menus_items .menus_item {
       padding: 0 !important;
     }
   }

   /* 导航栏魔改 end */
   ```

   这样你就获得了个有切换动画的导航栏显示标题
