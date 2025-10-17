---
title: 免费安装杜比全景声
tags: [软件]
categories: [经验分享]
image: "https://tuchuang.voooe.cn/images/2024/06/19/InstallDolby.webp"
description: 这篇文章将教你如何安装杜比全景声
date: 2024-04-03 11:09:28
---

## 前言

工具地址：[酸奶会发光](https://fpsplay.github.io/)
作者的视频教程

::video-embed
---
type: bilibili
id: BV11B4y137cf
---
::

## 安装驱动

1. 打开音效安装器
2. 进入第一个 **音效驱动**
3. 点击 **Next**
4. 点击 `Add or Remove Features`
5. 勾选如下驱动（不需要 DTS 可以不勾选）
   ::pic
   ---
   src: https://tuchuang.voooe.cn/images/2024/04/03/1.webp
   ---
   ::
6. 点击 **Next**
7. 点击 **Install** 安装

## 配置音效

1. 进入第二个 **音效配置**
2. 点击顶部的 **Endpoints** 选择自己要安装的扬声器，如只是给扬声器安装，找到带有 **[Active]** 字样的即可
   ::pic
   ---
   src: https://tuchuang.voooe.cn/images/2024/04/03/2.webp
   ---
   ::
3. 先点击 **Backup** 备份
   ::pic
   ---
   src: https://tuchuang.voooe.cn/images/2024/04/03/3.webp
   ---
   ::
4. 点击 **Product Config Tool**
   ::pic
   ---
   src: https://tuchuang.voooe.cn/images/2024/04/03/4.webp
   ---
   ::
5. 点击 **Products** 选择 **Dolby DAX3 UWP (DAPv251-VLLDP120)**
   ::pic
   ---
   src: https://tuchuang.voooe.cn/images/2024/04/03/5.webp
   ---
   ::
6. 最后点击 **Apply Product Settings to Selected Endpoints** 应用

## 安装杜比全景声软件

1. 点击 **杜比全景声** 会自动安装
2. 安装成功后点击 **重启服务**
3. 打开任务管理器，等待出现两个 **DAX API** 进程

## 切换杜比

1. 点击想要切换的杜比
2. 等待安装完成后重启服务

## 安装 DTS

1. 重复上述操作，直到配置音效
2. **Products** 换成 **DTS APO3x UWP**
3. 点击 **Apply Product Settings to Selected Endpoints** 应用
4. 点击安装 **DTS 音效**
5. 重启服务

## 完全卸载

1. 卸载音效软件
2. 进入 **音效配置**
3. 点击 **Restore**
4. 找到备份文件，恢复备份
5. 点击 **音效驱动**
6. 点击 **Remove** 卸载驱动
