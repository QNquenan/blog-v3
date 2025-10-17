---
title: SpringBootのGet请求新闻列表
categories: [代码]
tags: [SpringBoot]
description: SpringBootのGet请求新闻列表案例笔记
image: "https://tuchuang.voooe.cn/images/2024/06/19/SpringBoot.webp"
date: 2024-02-05 20:30:00
recommend: true
---

## 前言

> 可以和上期教程放在同一文件夹，或者按照上期教程新建一个项目

## 新建数据库表

数据表代码参考，解释：

- `xinwen` ： **数据表名**
- `id` ：**键值，自增**
- `title` ：**标题**
- `content` ：**内容**

```sql
CREATE TABLE xinwen (
    id INT(10) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content VARCHAR(255) NOT NULL,
    UNIQUE (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

{% tip error %}如出现表不能插入中文数据时，记得转换为 utf8{% endtip %}

```sql
SET NAMES utf8mb4;
ALTER TABLE your_table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 项目实现

### 实现 XinWen 实体类

1. 在 `domain` 目录下新建名为 `XinWen` 的类

2. 在 `public` 前添加 `@Table` 和 `@Entity` 注解

   - `@Table(name = "xinwen")` 注解表示对应数据库 xinwen 表
   - `@Entity` 表示这是个实体类

3. 主键 `id` 前添加 `@Id` 和 `@GeneratedValue(strategy = GenerationType.IDENTITY)` 注解

   - 目前代码如下

     ```Java
     package com.example.postdemo.domain;

     import jakarta.persistence.*;

     @Table(name = "xinwen")
     @Entity
     public class XinWen {

         @Id
         @GeneratedValue(strategy = GenerationType.IDENTITY)
         private long id;
         private String title;
         private String content;
     }
     ```

4. 在下方空白处使用 **快捷生成 get、set 方法** ，详见 [此处](https://www.quenan.cn/posts/51385.html#%E5%AE%9E%E7%8E%B0User%E5%AE%9E%E4%BD%93%E7%B1%BB)

5. 完整代码

   ```Java
   package com.example.postdemo.domain;

   import jakarta.persistence.*;

   @Table(name = "xinwen")
   @Entity
   public class XinWen {

       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private long id;
       private String title;
       private String content;

       public long getId() {
           return id;
       }

       public void setId(long id) {
           this.id = id;
       }

       public String getTitle() {
           return title;
       }

       public void setTitle(String title) {
           this.title = title;
       }

       public String getContent() {
           return content;
       }

       public void setContent(String content) {
           this.content = content;
       }
   }
   ```

### 实现 XinWenDao

1. 在 `repository` 目录下新建名为 `XinWenDao` 接口

2. 由于只需要获取全部新闻列表，仅需添加少许代码

   - 添加 `@Repository` 注解，用于标识数据访问层（DAO）组件

   - 继承 `JpaRepository`

3. 完整代码

   ```Java
   package com.example.postdemo.repository;

   import com.example.postdemo.domain.XinWen;
   import org.springframework.data.jpa.repository.JpaRepository;
   import org.springframework.stereotype.Repository;

   @Repository
   public interface XinWenDao extends JpaRepository<XinWen, Long> {
   }

   ```

### 实现 XinWenService

1. 在 `service` 目录下新建名为 `XinWenService` 接口

2. 添加获取全部列表逻辑

3. 完整代码

   ```Java
   package com.example.postdemo.service;

   import com.example.postdemo.domain.XinWen;

   import java.util.List;

   public interface XinWenService {
       List<XinWen> getAllXinWen();

   }
   ```

### 实现 XinWenServiceImpl

1. 在 `service/serviceImpl` 目录下新建名为 `XinWenServiceImpl` 类

2. 添加要实现的方法

   - 在 `public class UserServiceImpl` 后添加 `implements UserService` （此时会报错，原因是方法没实现）
   - 在报错处使用 **快速修复** ，详见 [此处](https://www.quenan.cn/posts/51385.html#%E5%AE%9E%E7%8E%B0UserServiceImpl)

3. 完整代码

   ```Java
   package com.example.postdemo.service.serviceImpl;

   import com.example.postdemo.domain.XinWen;
   import com.example.postdemo.repository.XinWenDao;
   import com.example.postdemo.service.XinWenService;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;

   import java.util.List;

   @Service
   public class XinWenServiceImpl implements XinWenService {
       @Autowired
       private XinWenDao xinWenDao;

       @Override
       public List<XinWen> getAllXinWen() {
           return xinWenDao.findAll();
       }
   }
   ```

### 实现 XinWenController

1. 在 `controller` 目录下创建 `XinWenController` 类

2. 添加 `@RestController` 和 `@RequestMapping("/get")` 注解，分别表示标注这是个控制器和基路由

3. 注入 `XinWenService`

4. 完整代码

   ```Java
   package com.example.postdemo.controller;

   import com.example.postdemo.domain.XinWen;
   import com.example.postdemo.service.XinWenService;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RestController;

   import java.util.List;

   @RestController
   @RequestMapping("/get")
   public class XinWenController {
       @Autowired
       private XinWenService xinWenService;

       @GetMapping("/xinwen")
       public List<XinWen> getAllXinWen() {
           return xinWenService.getAllXinWen();
       }
   }
   ```

## 测试项目

使用 `postman` 测试

- 向路由 `http://localhost:8080/user/register` 发送 `Get` 请求，无需添加参数和请求体

- 成功返回

  ```json
  [
    {
      "id": 1,
      "title": "1",
      "content": "111",
    },
    {
      "id": 2,
      "title": "2",
      "content": "neir",
    },
    {
      "id": 3,
      "title": "新闻1",
      "content": "新闻内容",
    },
  ]
  ```
