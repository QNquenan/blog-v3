---
title: Jsdelivr与渺软CDN使用笔记
categories:
  - [博客]
  - [笔记]
tags:
  - CDN
  - 笔记
  - 渺软
description: 为健忘的我写一条使用笔记
cover: "https://tuchuang.voooe.cn/images/2024/06/19/MRCDN.webp"
abbrlink: 171ff1e4
date: 2024-02-06 01:00:00
---

> 因为 `Jsdelivr` 国内备案无了，所以使用渺软 CDN 来回源 Jsdelivr

## Jsdelivr 使用

官网：[https://www.jsdelivr.com/](https://www.jsdelivr.com/)

### GitHub 仓库链接转 CDN

在线转换地址：[https://www.jsdelivr.com/github](https://www.jsdelivr.com/github)

Jsdelivr 链接：`https://cdn.jsdelivr.net/gh/GitHub用户名/仓库名@分支(一般为main)/文件路径`

在 `js` `css` 等文件名后添加 `min` 可以压缩文件，如 `xxx.min.js`

### 刷新 CDN 缓存

- 将 `https://cdn.jsdelivr.net/gh/...` 更换为 `https://purge.jsdelivr.net/gh/...` 刷新，再次访问 `https://cdn.jsdelivr.net/gh/...` 就可以看见刷新后的文件了
- 成功返回
  ```json
  {
    "id": "dRZnfzmLXGb78nsa",
    "status": "finished",
    "timestamp": "2024-02-05T17:12:03.738Z",
    "paths": {
      "/gh/GitHub用户名/仓库名@分支(一般为main)/文件路径": {
        "throttled": false,
        "providers": {
          "CF": true,
          "FY": true
        }
      }
    }
  }
  ```

## 渺软 CDN

官网：[https://cdn.onmicrosoft.cn/](https://cdn.onmicrosoft.cn/)

### 使用方法

- 将 `https://cdn.jsdelivr.net/gh/...` 更换为 `https://jsd.onmicrosoft.cn/gh/...`

### 刷新 CDN 缓存

1. 在 [爱发电](https://afdian.net/a/icodeq) 赞助 `@Zkeq` 获取刷新 `token`
2. 在官网的 `Pure Cache` 处刷新即可
