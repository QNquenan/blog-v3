---
title: 使用Python下载图片
tags:
  - 笔记
  - Python
categories:
  - [Python]
  - [笔记]
description: 用Python来写一个小程序批量下载图片
cover: "https://tuchuang.voooe.cn/images/2024/06/19/PythonImg.webp"
swiper_index: 4
abbrlink: 1abe6423
date: 2024-02-26 11:08:07
---

## 准备工作

~~安装 `Python` （应该不用说吧~~

安装 `requests`

```cmd
pip install requests
```

## 编写代码

### 简单应用

```python
# 导入 requests 库，用于发送 HTTP 请求
import requests

# 定义要下载的图片路径
url = '要下载的图片路径'

# 定义要保存的图片名字
name = '图片名字'

# 发送 HTTP GET 请求，获取图片的响应对象
res = requests.get(url)

# 使用 with 语句打开文件，并以二进制写入模式写入内容
with open(name, 'wb') as file: # file 可以自定义，例如 a，aa之类的
    # 将获取的二进制数据写入文件
    file.write(res.content)
```

### 批量下载

```python
import requests

def downloadImg(url, name):
    # 定义要下载的图片路径
    url = url

    # 发送 HTTP GET 请求，获取图片的响应对象
    res = requests.get(url)

    # 使用 with 语句打开文件，并以二进制写入模式写入内容
    with open(name, 'wb') as file:
        # 将获取的二进制数据写入文件
        file.write(res.content)

# 定义图片路径列表
imgUrlList = [
    'https://tuchuang.voooe.cn/images/2024/02/23/1.webp',
    'https://tuchuang.voooe.cn/images/2024/02/23/2.webp',
    'https://tuchuang.voooe.cn/images/2024/02/23/3.webp',
    'https://tuchuang.voooe.cn/images/2024/02/23/4.webp'
]

# 初始化计数器
nub = 1

# 遍历图片路径列表并下载图片
for imgUrl in imgUrlList:
    # 调用下载函数，传入图片路径和保存的文件名
    downloadImg(imgUrl, str(nub) + '.webp')

    # 计数器自增
    nub += 1
```
