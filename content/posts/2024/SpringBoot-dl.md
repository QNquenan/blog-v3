---
title: SpringBootのPost登录注册
categories: [代码]
tags: [SpringBoot]
description: SpringBootのPost登录注册案例笔记
image: "https://tuchuang.voooe.cn/images/2024/06/19/SpringBoot.webp"
date: 2024-02-04 03:08:13
recommend: true
---

## 前言

> 本文参考并根据最新版本修改于 [快速上手 Springboot 项目（登录注册保姆级教程）](https://blog.csdn.net/weixin_44043758/article/details/118367899)
>
> **注意事项**：所有示例代码建议手敲一遍，因为有一些导入语句（import）会自动补全生成，而复制粘贴不会，所以若复制粘贴则记得复制导入语句

## 创建项目

需要注意的点：

- 语言[Language] 为 `Java`

- 类型[Type] 为 `Maven`
- 打包[Packaging] 为 `Jar`

![1](https://tuchuang.voooe.cn/images/2024/02/03/1.webp)

## 选择依赖

- `Web` => `Spring Web` **创建 `WebApi`**
- `SQL` => `Spring Data JPA` **数据库持久层使用 `JPA`**
- `SQL` => `MySQL Driver` **数据库使用 `MySQL`**

![2](https://tuchuang.voooe.cn/images/2024/02/03/2.webp)

## 目录结构

- `/src/main/java/[软件包名称]/[项目名称]Application` 为项目入口，为了初始化整个应用程序
- `/src/main/resources/application.properties` 为配置文件，用于指定数据库连接信息，服务器端口等配置

![3](https://tuchuang.voooe.cn/images/2024/02/03/3.webp)

## 配置数据库

- 配置数据库

  - 进入`/src/main/resources/application.properties` 添加以下代码

    ```properties
      # 配置数据库
      # 配置驱动
      spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
      # 若连接的是云数据库则将localhost改为云端ip
      spring.datasource.url=jdbc:mysql://localhost:3306/logindemo?serverTimezone=UTC
      # Mysql用户
      spring.datasource.username=root
      # Mysql对应用户密码
      spring.datasource.password=123456789
    ```

  - `spring.datasource.driver-class-name`: 指定数据库驱动的类名，这里是 MySQL 数据库的驱动类。

  - `spring.datasource.url`: 指定数据库的连接 URL，其中 `localhost:3306` 是数据库的地址和端口，`logindemo` 是数据库的名称，`serverTimezone=UTC` 是为了解决时区问题。

  - `spring.datasource.username`: 指定连接数据库的用户名，这里是 MySQL 用户名为 `root`。

  - `spring.datasource.password`: 指定连接数据库的用户密码，这里是 MySQL 用户密码为 `123456789`。

- IDEA 连接数据库（非必要，仅为开发方便）

  - `数据库` => `+` => `数据源` => `MySQL`

    ![4](https://tuchuang.voooe.cn/images/2024/02/03/4.webp)

  - 配置数据源

    - 主机[Host] 为数据库 IP 地址

    - 用户[User] 为 MySqL 用户名
    - 密码[Password] 为数据库密码
    - 数据库[Database] 为数据库名
    - 填完后点击 **测试连接[Test Connection]** 成功即可点击 **确定[OK]**
    - ![5](https://tuchuang.voooe.cn/images/2024/02/03/5.webp)

## 添加数据表

你可以使用第三方的可视化工具进行创建，如 `Navicat Premium 15` , `idea` 等，本文只提供 `MySQL` 的代码

1. 使用命令行进入 `MySQL`
2. 创建数据表
   ```mysql
    CREATE TABLE user
    (
        uid int(10) primary key NOT NULL AUTO_INCREMENT,
        uname varchar(30) NOT NULL,
        password varchar(255) NOT NULL,
        UNIQUE (uname)
    );
   ```

- uid: 用户编号，主键，自增(按照本教程如果不添加自增会报错)

- uname: 用户名，作为登录的账号（业务主键），不可重复

- password: 密码，因为可能要加密，所以长度设了较长的 255

## 项目架构

- `视图层[View]` => `控制层[Controller]` => `业务逻辑层[Service]` => `数据持久层[DAO]` => `数据库`

- **数据持久层**

  负责将 Java 对象与数据库表之间建立映射，实现数据的存储和检索，它包含了存放能对数据库表进行操作的类。在项目中将创建个实体类 `User` 映射到数据仓库的 `user` 表

  - `repository` : 存放一些数据访问类（也就是一些能操纵数据库的类）的包，比如存放能对`user` 表进行增删改查的类
  - `domain` ：存放实体类的包，比如 `User` 类，其作为对应数据库 `user` 表的一个实体类

- **业务逻辑层**

  处理业务逻辑。比如在项目中，就在业务逻辑层实现登录注册的逻辑，像是判断是否有用户名重复，密码是否正确等逻辑

  - `service` : 存放业务逻辑接口的包
  - `serviceImpl` : 存放业务逻辑实现类的包，其中的类实现 `service` 中的接口

- **控制层**

  接收视图层的请求，调用业务逻辑层的方法，并将结果返回给视图层。控制层负责协调整个应用程序的工作流。比如视图层请求登录并发来了用户的账号和密码，那么控制层就调用业务逻辑层的登录方法，并将账号密码作为参数传入，在将结果返回给视图层。

  - `controller` : 存放控制器的包。比如 `UserController`

- **视图层 **的作用是展现数据。

- **最佳开发方式是自下向上开发，因为包之间的调用是上层调用下层**

## 目录结构

在项目入口 `/src/main/java/[软件包名称]/[项目名称]Application` 中新建以下目录与文件

- `domain`
- `repository`
- `service`
  - `serviceImpl`
- `controller`
- `utils` **存放工具类，一些自己封装的工具**
- `config` **存放配置类，一些配置如登录拦截器，安全配置等**

![6](https://tuchuang.voooe.cn/images/2024/02/03/6.webp)

## 所有类与接口目录位置

![7](https://tuchuang.voooe.cn/images/2024/02/03/7.webp)

## 项目实现

### 实现 User 实体类

1. 在 `domain` 目录下新建名为 `User` 类

2. 在 `public` 前添加 `@Table` 和 `@Entity` 注解

   - `@Table(name = “userlist”)` 说明此实体类对应于数据库的 userlist 表，此处你的数据库表名为什么就写什么

     ![8](https://tuchuang.voooe.cn/images/2024/02/03/8.webp)

   - `@Entity` 说明此类是个实体类

3. 主键 uid 上要加上 `@Id` 与 `@GeneratedValue(strategy = GenerationType.IDENTITY)` 注解

   ```java
   package com.example.demo.domain;

   import jakarta.persistence.*;

   @Table(name = "userlist")
   // 说明此实体类对应于数据库的user表
   @Entity
   // 说明此类是个实体类
   public class User {

       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private long uid;
       // 注意属性名要与数据表中的字段名一致
       // 主键自增int(10)对应long

       private String username;
       // 用户名属性varchar对应String

       private String password;
       // 密码属性varchar对应String
   }
   ```

4. 为属性快捷生成 get、set 方法

   - 将光标移至要插入 get、set 方法的位置

   - **右键** => **生成...** => **Getter 和 Setter** => **全选** => **确定**

     ![9](https://tuchuang.voooe.cn/images/2024/02/03/9.webp)

### 实现 UserDao

1. 在 `repository` 目录下新建名为 `UserDao` 接口

2. 添加数据库访问数据库的方法，在这里添加**根据用户名查询用户**方法

   - 添加 `@Repository` 注解，用于标识数据访问层（DAO）组件，通常与持久层的操作相关，比如数据库操作。
   - 接口要继承 `JpaRepository` ，这样 JPA 就能帮助我们完成对数据库的映射
     - `User` ：实体类的类型，这里是 `User` 类。
     - `Long` ：主键的数据类型，这里是 `Long` 类型。通常，实体类的主键类型会是实体的唯一标识，一般选择 `Long` 或 `Integer`。

3. 完整代码

   ```java
   package com.example.postdemo.repository;

   import com.example.postdemo.domain.User;
   import org.springframework.data.jpa.repository.JpaRepository;
   import org.springframework.stereotype.Repository;

   /*此处代码为根据用户名查询用户方法*/

   @Repository
   public interface UserDao extends JpaRepository<User, Long> {

       User findByUsername(String username); //通过用户名Username查找用户，注意使用驼峰命名法

       User findByUsernameAndPassword(String username, String password); //通过用户名和密码查询用户

   }
   ```

### 实现 UserSer

1. 在 `service` 目录下新建名为 `UserService` 接口

2. 添加登录注册用到的业务逻辑

3. 完整代码

   ```java
   package com.example.postdemo.service;

   import com.example.postdemo.domain.User;

   public interface UserService {

       /**
        * 登录逻辑
        * @param username 用户名
        * @param password 密码
        * @return
        */
       User loginService(String username, String password);

       /**
        * 注册逻辑
        * @param user 要注册的User对象
        * @return
        */
       User registService(User user);
   }

   ```

### 实现 UserServiceImpl

- 要在 `UserServiceImpl` 中实现 `UserService` 中的方法

1. 在 `service/serviceImpl` 目录下新建名为 `UserServiceImpl` 类

2. 添加需要实现的方法

   - 在 `public class UserServiceImpl` 后添加 `implements UserService` （此时会报错，原因是方法没实现）
   - 右击报错条目
   - 点击快速修复
   - 选择实现方法

3. 实现登录逻辑

   - 因为要用到 UserDao 中的方法，所以先通过 `@Resource` 注解帮助我们实例化 UserDao 对象

     - `@Resource` 是 Java EE 中的注解，用于实现依赖注入。

   - 完整代码

     ```Java
     @Resource
     private UserDao userDao;// 引入UserDao

     @Override
     public User loginService(String username, String password) {
         // 如果账号密码都对则返回登录的用户对象，如有错误，返回null
         User user = userDao.findByUsernameAndPassword(username, password);
         // 重要信息置空
         if(user != null) {
         	user.setPassword("");// 避免将密码返回给客户端
         }

         return user;// 返回登录用户
     }
     ```

4. 实现注册逻辑

   - 完整代码

     ```java
     @Override
     public User registService(User user) {
     	// 当新用户的用户名已存在
     	if (userDao.findByUsername(user.getUsername()) != null) {

     		return null;// 返回null表示用户名已存在，注册失败

     	} else {
     		// 返回创建好的用户对象(带uid)
     		User newUser = userDao.save(user);

     		if (newUser != null) {
     			newUser.setPassword("");// 避免将密码返回给客户端
     		}

     		return newUser;// 返回新注册的用户对象
     	}
     }
     ```

5. 在 `public class UserServiceImpl implements UserService` 上添加 `@Service` 注解

   - `@Service` 注解用于标识一个类是业务逻辑层（Service 层）的组件

6. 最终完整代码

   ```Java
   package com.example.postdemo.service.serviceImpl;

   import com.example.postdemo.domain.User;
   import com.example.postdemo.repository.UserDao;
   import com.example.postdemo.service.UserService;
   import jakarta.annotation.Resource;
   import org.springframework.stereotype.Service;

   @Service
   public class UserServiceImpl implements UserService {
       @Resource
       private UserDao userDao;// 引入UserDao

       @Override
       public User loginService(String username, String password) {
           // 如果账号密码都对则返回登录的用户对象，如有错误，返回null
           User user = userDao.findByUsernameAndPassword(username, password);
           // 重要信息置空
           if(user != null) {
               user.setPassword("");// 避免将密码返回给客户端
           }

           return user;// 返回登录用户
       }

       @Override
       public User registService(User user) {
           // 当新用户的用户名已存在
           if (userDao.findByUsername(user.getUsername()) != null) {

               return null;// 返回null表示用户名已存在，注册失败

           } else {
               // 返回创建好的用户对象(带uid)
               User newUser = userDao.save(user);

               if (newUser != null) {
                   newUser.setPassword("");// 避免将密码返回给客户端
               }

               return newUser;// 返回新注册的用户对象
           }
       }
   }
   ```

### 实现工具类 Result

工具类 `Result` 的作用是作为返回给前端的统一后的对象。也就是说返回给前端的都是 Result 对象，只是对象中的属性不太一样，这样方便前端固定接收格式。

1. 在 `utils` 目录下新建 `Result` 类

2. 在 `public class Result` 后面加上 `<T>`

   - `public class Result<T>`

3. 创建私有变量

   ```Java
   private String code;

   private String msg;

   private T data;
   ```

4. 生成 `Getter 和 Setter`

   - 回车

   - **右键** => **生成...** => **Getter 和 Setter** => **全选** => **确定**
   - 详情看 [实现 User 实体类](###实现User实体类)

5. 完整代码

   ```java
   package com.example.postdemo.utils;

   public class Result<T> {
       private String code;
       private String msg;
       private T data;

       public String getCode() {
           return code;
       }

       public void setCode(String code) {
           this.code = code;
       }

       public String getMsg() {
           return msg;
       }

       public void setMsg(String msg) {
           this.msg = msg;
       }

       public T getData() {
           return data;
       }

       public void setData(T data) {
           this.data = data;
       }

       public Result() {
       }

       public Result(T data) {
           this.data = data;
       }

       public static Result success() {
           Result result = new Result<>();
           result.setCode("0");
           result.setMsg("请求成功");
           return result;
       }

       public static <T> Result<T> success(T data) {
           Result<T> result = new Result<>(data);
           result.setCode("0");
           result.setMsg("请求成功");
           return result;
       }

       public static <T> Result<T> success(T data,String msg) {
           Result<T> result = new Result<>(data);
           result.setCode("0");
           result.setMsg(msg);
           return result;
       }

       public static Result error(String code, String msg) {
           Result result = new Result();
           result.setCode(code);
           result.setMsg(msg);
           return result;
       }
   }
   ```

6. 可以看出 `Result` 是个模板类，因此想要返回什么数据类型给前端都行，如 `Result<User>` 可以直接用`类名.方法名`调用。

### 实现 UserController

1. 在 `controller` 目录下创建 `UserController` 类

2. 添加 `@RestController` 与 `@RequestMapping("/user")` 注解，注入 UserService

   - `@RequestMapping("/user")` 是这个控制器的基路由，如 `/user` 就是 `http://IP:端口/user`
   - `@RequestParam` 用于从请求的参数中获取数据，如 `http://IP:端口/user/login?value=1&value2=2` ，其中 value 和 val2 就是所带的参数
   - `@RequestBody` 用于从请求体中获取数据

   - 代码片段

     ```diff
     + @RestController
     + @RequestMapping("/user")
     public class UserController {

         // 注入UserService
     +    @Resource
     +    private UserService userService;
     }
     ```

3. 实现登录控制

   - 添加路由 `@PostMapping("/login")` ，表示处理 `Post` 请求，路由为 `http://IP:端口/user/login`

   - 代码片段

     ```java
     //登录控制
     @PostMapping("/login")
     public Result<User> loginCotroller(@RequestBody User login) {

        String username = login.getUsername();

        String password = login.getPassword();

     	User user = userService.loginService(username, password);

     	if (user != null) {
     		return Result.success(user, "登录成功！");
     	} else {
     		return Result.error("500", "账号或密码错误");
     	}
     }
     ```

4. 实现注册控制

   - 添加路由 `@PostMapping("/register")` ，表示处理 `Post` 请求，路由为 `http://IP:端口/user/register`

   - 代码片段

     ```java
     // 注册控制
     @PostMapping("register")
     public Result<User> registController(@RequestBody User newUser) {

     	User user = userService.registService(newUser);

     	if (user != null) {
     		return Result.success(user, "注册成功");
     	} else {
     		return Result.error("501", "用户名已存在");
     	}
     }
     ```

5. 完整代码

   ```java
    package com.example.postdemo.controller;

    import com.example.postdemo.domain.User;
    import com.example.postdemo.service.UserService;
    import com.example.postdemo.utils.Result;
    import jakarta.annotation.Resource;
    import org.springframework.web.bind.annotation.*;

    @RestController //
    @RequestMapping("/user")
    public class UserController {

        // 注入UserService
        @Resource
        private UserService userService;

        // 登录控制
        @PostMapping("/login")
        public Result<User> loginCotroller(@RequestBody User login) {

            String username = login.getUsername();

            String password = login.getPassword();

            User user = userService.loginService(username, password);

            if (user != null) {
                return Result.success(user,"登录成功！");
            } else {
                return Result.error("500", "账号或密码错误");
            }
        }

        // 注册控制
        @PostMapping("register")
        public Result<User> registController(@RequestBody User newUser) {

            User user = userService.registService(newUser);

            if (user != null) {
                return Result.success(user, "注册成功");
            } else {
                return Result.error("501", "用户名已存在");
            }
        }
    }

   ```

### 处理跨域问题

> 跨域问题就是前端后端的**IP 地址**和**端口**与后端的 IP 地址和**端口**不同就会导致前端无法获取数据

1.  在 `config` 目录下新建 `GlobalCorsConfig` 类

2.  添加 `@Configuration` 注解，用于标识这个类是配置类，常用于定义 `Spring` 应用程序上下文中的 `bean` 配置信息

3.  注意：**SpringBoot2.4.0** 以后下方 `allowedOrigins` 需要被 `allowedOriginPatterns` 代替！！！！

4.  完整代码

    ```java
    package com.example.postdemo.config;

    /*
        处理跨域
        SpringBoot2.4.0 以后下方 allowedOrigins 需要被 allowedOriginPatterns 代替！！！！
     */

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.CorsRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class GlobalCorsConfig {
        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")
                            .allowedOriginPatterns("*")
                            //.allowedOrigins("*")
                            .allowCredentials(true)
                            .allowedMethods("GET", "POST", "PUT", "DELETE")
                            .allowedHeaders("*")
                            .exposedHeaders("*");
                }
            };
        }
    }
    ```

**至此，所有代码就写完了**

## 测试

使用 `Postman` 进行测试

### 注册测试

1. 向路由 `http://localhost:8080/user/register` 发送 `post` 请求，并添加请求体

   ```json
   {
     "username": "test4",
     "password": "123456",
   }
   ```

2. 点击发送请求

   - 成功返回

     ```json
     {
       "code": "0",
       "msg": "注册成功",
       "data": {
         "uid": 4,
         "username": "test04",
         "password": "",
       },
     }
     ```

   - 失败返回

     ```json
     {
       "code": "501",
       "msg": "用户名已存在",
       "data": null,
     }
     ```

### 登录测试

1. 向路由 `http://localhost:8080/user/login` 发送 `post` 请求，并添加参数

   ```
   http://localhost:8080/user/login?username=test01&password=123456
   ```

2. 点击发送请求

   - 成功返回

     ```json
     {
       "code": "0",
       "msg": "登录成功！",
       "data": {
         "uid": 1,
         "username": "test01",
         "password": "",
       },
     }
     ```

   - 失败返回

     ```json
     {
       "code": "500",
       "msg": "账号或密码错误",
       "data": null,
     }
     ```
