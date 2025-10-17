---
title: VM虚拟机进入Pe系统
categories:
  - VM
tags:
  - VM
  - Pe
description: VM虚拟机进入Pe系统笔记
cover: "https://tuchuang.voooe.cn/images/2024/06/19/VMPE.webp"
abbrlink: 19b64ef3
date: 2024-02-21 22:11:25
---

## 简易流程

1. 插入 Pe 盘

2. 打开磁盘管理查看 Pe 的磁盘序号

   打开方式：右键 **此电脑** 选择 **管理** 在侧边选择 **磁盘管理**

   ![1](https://tuchuang.voooe.cn/images/2024/02/21/1.webp)

3. 记住 Pe 磁盘的序号

   ![10](https://tuchuang.voooe.cn/images/2024/02/21/5.webp)

4. 编辑虚拟机配置，选择 **添加** ，添加个硬盘

   ![2](https://tuchuang.voooe.cn/images/2024/02/21/2.webp)

5. 硬盘类型选择 **SCSI**

   ![3](https://tuchuang.voooe.cn/images/2024/02/21/3.webp)

6. 选择 **使用物理磁盘**

   ![4](https://tuchuang.voooe.cn/images/2024/02/21/4.webp)

7. 设备选择 **第二步查看的序号对应的磁盘** ，使用情况选择 **使用整个磁盘**

   ![6](https://tuchuang.voooe.cn/images/2024/02/21/6.webp)

8. 保存后点击上方 **绿色箭头边上的向下小箭头**

   ![7](https://tuchuang.voooe.cn/images/2024/02/21/7.webp)

9. 选择 **打开电源时进入固件**

   ![8](https://tuchuang.voooe.cn/images/2024/02/21/8.webp)

10. 使用上下左右方向键选择 **带有 SCSI 字样的选项**

    ![9](https://tuchuang.voooe.cn/images/2024/02/21/9.webp)

11. 回车确定即可进入 Pe 系统
