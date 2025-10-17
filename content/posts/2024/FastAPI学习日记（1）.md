---
title: FastAPI学习日记（1）
tags:
  - Python
  - 学习
  - FastAPI
  - 后端
categories:
  - - 后端
  - - Python
cover: "https://i.p-i.vip/43/20241016-670fd23d0bb8c.webp"
abbrlink: 3c84aa18
date: 2024-10-16 22:36:46
---

### 学习 **FastAPI** 的格式化架构

项目目录下分别有

- **文件夹**

- `Api` -- 用于存放 api
- `Common` -- 用于存放公共类
- `EXception` -- 用于存放自定义错误信息
- `Model` -- 用于存放自定义模板
- `Service` -- 用于存放连接数据库部分
- **文件**
- `.env` -- 配置文件，记录 ip 地址端口之类的
- `main.py` -- 入口文件，用于启动 python 程序

### 如何从 .env 配置文件读取配置

- 在项目目录下新建 `.env` 文件

  ```env
  HOST = "0.0.0.0"
  PORT = "8000"

  MYSQL_HOST = "localhost"
  MYSQL_PORT = 3306
  MYSQL_USER = "root"
  MYSQL_PASSWORD = "root"
  MYSQL_DATABASE = "fastApiDemo"
  MYSQL_CHARSET = "utf8mb4"
  ```

- 在 `Common` 文件夹新建 `config.py`

  ```python
  # -*- coding: utf-8 -*-
  # @Time    : 2024/10/16 上午10:43
  # @Author  : Quenan
  # 获取配置

  import os  # 导入os模块，用于访问操作系统相关功能
  from pathlib import Path  # 导入Path类，用于处理文件路径
  from dotenv import load_dotenv  # 从dotenv库导入load_dotenv函数，用于加载.env文件中的环境变量


  # 定义一个配置类，用于加载和存储环境变量
  class Config:
      def __init__(self):  # 构造函数，在实例化时自动调用
          # 获取.env文件的路径，假设它位于当前文件的上级目录中
          env_path = Path(__file__).parent.parent / '.env'
          # 加载.env文件中的环境变量到系统环境变量中
          load_dotenv(dotenv_path=env_path)
          # 将系统环境变量保存为字典，存储到实例属性_env中
          self._env = dict(os.environ)

      # 定义只读属性env，返回保存的环境变量字典
      @property
      def env(self):
          return self._env


  # 创建Config类的实例，并加载环境变量
  config = Config()

  ```

- 在 `Common` 文件夹新建 `constant.py`

  ```python
  # -*- coding: utf-8 -*-
  # @Time    : 2024/10/16 上午10:43
  # @Author  : Quenan
  # 常量
  from Common.config import config

  Host = config.env.get('HOST')
  Port = config.env.get('PORT')

  # 数据库
  MySql_Host = config.env.get('MYSQL_HOST')
  MySql_Port = config.env.get('MYSQL_PORT')
  MySql_User = config.env.get('MYSQL_USER')
  MySql_Password = config.env.get('MYSQL_PASSWORD')
  MySql_Database = config.env.get('MYSQL_DATABASE')
  MySql_Charset = config.env.get('MYSQL_CHARSET')
  ```

- 使用示例

  ```python
  # -*- coding: utf-8 -*-
  # @Time    : 2024/10/16 上午10:43
  # @Author  : Quenan

  import uvicorn

  from Api import app
  from Common.constant import Host, Port  # 获取配置文件中的IP地址和端口

  if __name__ == "__main__":
      uvicorn.run(app, host=Host, port=Port)
  ```

### 定义返回模板

- 在 `Common` 文件夹新建 `result.py`

  ```python
  # -*- coding: utf-8 -*-
  # @Time    : 2024/10/16 上午10:47
  # @Author  : Quenan
  # 返回
  from pydantic import BaseModel


  class ResultBase:
      # 模板
      code: str
      msg: str
      data: dict


  class ResultModel(BaseModel, ResultBase):
      ...


  class Result(ResultBase):
      def __init__(self, code, msg, data):
          self.code = code
          self.msg = msg
          self.data = data

      @classmethod
      def success(cls, data: object = None, code: str = '200', msg: str = '请求成功'):
          """
          请求成功模板
          :param data: 返回数据
          :param code: 返回码
          :param msg: 返回提示
          :return:
          """
          if not data:
              data = {}
          return cls(code, msg, data)

      @classmethod
      def error(cls, data: object = None, code: str = '500', msg: str = '请求失败'):
          """
          请求失败
          :param data: 返回数据
          :param code: 返回码
          :param msg: 返回提示
          :return:
          """
          if not data:
              data = {}
          return cls(code, msg, data)
  ```

- 使用示例

  ```python
  # -*- coding: utf-8 -*-
  # @Time    : 2024/10/16 上午11:07
  # @Author  : Quenan
  from Api import app
  from Common.result import Result
  from Model.demoModel import loginModel
  from Service.demoService import DomeService


  @app.post('/user/login')
  async def login(loginBody: loginModel):
      return Result.success(DomeService.login(loginBody.username, loginBody.password))
  ```
