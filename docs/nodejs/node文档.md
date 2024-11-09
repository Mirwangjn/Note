# nodejs介绍

nodejs是js的一个独立的运行环境，有着其内置的API(没有浏览器的dom，bom)

---

# npm指令

1. `npm init -y` -- 对`package.json`进行初始化
2. `npm i` -- 安装`dependencies`中所有的依赖
3. `npm i 包名` -- 安装指定包
4. `npm i 包名 -S` -- 安装到`dependencies`中
5. `npm i 包名 --save` -- 安装到`dependencies`中
6. `npm i 包名 -D` -- 安装到`devDependencies`中
7. `npm i 包名 -g` -- 全局安装
8. `npm uninstall 包名` -- 卸载包
9. `npm uninstall 包名 -g` -- 卸载全局包
10. `npm i 包名@版本号` -- 安装指定版本的包
11. `npm i 包名@版本号 -g` -- 安装指定版本的包
12. `npm i 包名@版本号 -S` -- 安装指定版本的包到`dependencies`中
13. `npm i 包名@版本号 -D` -- 安装指定版本的包到`devDependencies`中
14. `npm list -g --depth=0` -- 查看全局第三方包
15. `npm config set registry <镜像地址>` -- 切换下载第三方包镜像

> - `devDependencies`中的依赖包不会直接影响生产环境，但在开发过程中非常有用. 例如: `nodmeon`
> - `dependencies`用于于表示项目运行时需要的依赖。这些依赖项直接影响生产环境，通常包括项目的主要功能和库, 例如: `axios`

---

# require()导入

基本使用

```js
const fs = require("fs");
```

当使用`require`导入不写扩展名时, 会分别尝试加载文件后缀

1. 按照确切文件名加载
2. 补全`.js`
3. 补全 `.json`
4. 补全 `.node`
5. 加载失败

---

# fs文件操作模块

fs模块是nodejs内置的模块, 可以直接使用`require`导入

```js
const fs = require("fs");
```

下面会介绍它的方法以及使用

## readFile

- 作用: 读取文件
- 声明: `readFile(path, BufferEncoding, (err, data) => void): void`
- `path`: 路径
- `BufferEncoding`: 字符集, 通常是`utf-8`
- `err`: 错误信息
- `data`: 读到的数据

```js file.js
//path can use relative path or absolute path
fs.readFile("../成绩.txt", "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);
})
//使用绝对路径
fs.readFile(path.join(__dirname, "../", "/成绩.txt"), "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);
})
```

> 假设`file.js`为当前文件所处目录, 例如: 当前路径为`C:\Users\wang\Desktop\nodeJs\axios\file.js`,

- `__dirname` ---> `C:\Users\wang\Desktop\nodeJs\axios`
- `__filename` ---> `C:\Users\wang\Desktop\nodeJs\axios\file.js`

---

## writeFile

- 作用: 写入文件
- 声明: `writeFile(path, data, (err) => void): void`
- `path`: 路径, 可以是绝对路径, 也可以是相对路径
- `data`: 需要写入到文件的数据
- `err`: 错误信息

1. 方法只能用来创建文件，不能创建路径。
2. 重复用此方法写入同一文件，新写的内容会覆盖之前旧的内容

```js file.js
//写入内容 "123"
fs.writeFile("../成绩.txt", "123", (err) => {
    if(err) throw err;
    console.log("ok");
})
```

## mkdir和rmdir

- 作用: 创建文件夹和删除文件夹
- 声明: `mkdir(path, (err) => void): void`
- `path`: 路径, 可以是绝对路径, 也可以是相对路径
- `err`: 错误信息

```js
//当前文件的外部添加一个文件夹, 名为test1
fs.mkdir("../test1", (err) => {
    if(err) throw err;
    console.log("ok");
})
fs.rmdir("/test1", (err) => {
    if(err) throw err;
    console.log("ok");
})
```

---

## readdir

- 作用: 阅读一个文件夹的目录结构
- 声明: `readdir(path, (err, files) => void): void`

```js files返回值
[
  '1.express-session中间件.js',
  'cookie-parser.js',
  'demo.ejs',
  'ejs.js',
  'joi.js',
  'jwt.js',
  'login.js',
  'mysql2.js',
  'nodemailer.js',
  'proxy.js',
  'static1.js'
]
```

---

# path路径模块

导入模块

```js
const path = require("path");
```

## join

- 拼接路径, 返回值为`string`
- 声明: `join(...paths: string[]): string`

```js
fs.readFile(path.join(__dirname, "../", "/成绩.txt"), (err, data) => {/* ... */})
```

> `../`会抵消前面的一层目录. 例如, 当前目录为: `C:\Users\wang\Desktop\nodeJs\join.js`, 使用`../`之后, 就是`C:\Users\wang\Desktop\nodeJs`
>
> 然后在`/成绩.txt`, 最终路径就是`C:\Users\wang\Desktop\nodeJs\成绩.txt`

---

## basename

- 获得文件存放路径
- 声明: `basename(path, suffix): string`
- `suffix`是后缀

```js
path.basename("成绩.txt", ".txt");// 成绩
```

---

## extname

- 作用: 获取路径中的扩展名
- 声明: `extname(path): string`

```js
path.extname("成绩.txt")// .txt
```

---

# http与https模块

## 创建服务器并开启监听

- `req`包含许多客户端请求发来的信息
- `res`包含许多服务器响应发来的信息

```js
const http = require('http');
// 创建服务器
const server = http.createServer((req, res) => {
  // 处理请求
  res.statusCode = 200;//设置状态码
  //设置响应请求头
  res.setHeader('Content-Type', 'text/plain');
    // 原生nodejs中end方法只可以发送string类型, 如果是其他类型会报错
  res.end(JSON.stringify({a: "我是傻逼"}));
});
// 监听端口
const port = 3000;
server.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
```

> 访问`http://localhost:3000`会放回字符串`{a: "我是傻逼"}`, 一般来说前端会对JSON字符串进行转换

---

## get和post发送网络请求

```js
const http = require('http');
const https = require("https");
// 创建服务器
const server = http.createServer((req, res) => {
    let str = "";
    //一个https的网站, 对应的就要使用https模块发请求, chunk其实就相当于req的功能
    https.get("https://developer.mozilla.org/api/v1/whoami",(chunk) => {
        //data流, 对方服务器向我们传递的数据, 而这个数据会像流一样流到我们这, 所以on方法可能会触发好几次
        chunk.on("data", (data) => {
            str += data;
        });
        //当data数据流结束时, 这回调用这个函数
        chunk.on("end", () => {
            console.log(JSON.parse(str));
            res.end(str);
        })
    })
})
```

> http中的`get`与`post`函数参数一致

```js 最终响应的结果
{
  geo: { country: 'China', country_iso: 'CN' },
  username: null,
  is_authenticated: null,
  email: null,
  avatar_url: null,
  is_subscriber: null,
  subscription_type: null,
  settings: null
}
```

---

## request发送请求

http中的`request`方法可以发送任何类型的请求, 例如: `get`, `post`, `delete`, `put`, `putch`, 等等.

- 声明: `request(options, (res) => void): void`

`options`的参数有:

1. `hostname` -- 请求的主机名
2. `port` -- 请求的端口
3. `path` -- 请求的路径
4. `method` -- 请求的方法
5. `headers` -- 请求的头部信息
6. `auth`
   1. `user` -- 用户名
   2. `password` -- 密码

```js
let str = "";
https.request({
  hostname: "localhost",
  port: 3000,
  path: "/test",
  method: "get",
  headers: { "Content-type": "application/json" },
  auth: {
    user: 'username',
    pass: 'password',
  }
} , (chunk) => {
chunk.on("data", () => {
  str += chunk;
})
chunk.on("end", () => {
  console.log(str);
})

})
```


---

# 各类请求头以及参数

## Content-Type

指定信息体的类型, 例如: `query`, `params`, `body`

消息体包含HTML内容、JSON数据、图像、文件等各种类型的数据

1. 指示接收者如何处理消息体：`Content-Type`告诉接收者如何解析、处理消息体的数据格式。通过指定适当的`Content-Type`，接收者可以根据该类型来决定如何正确解析和处理传输的数据.
2. 控制浏览器行为：在Web开发中，通过设置适当的`Content-Type`，可以控制浏览器的行为。例如，C`ontent-Type: image/jpeg`会告诉浏览器显示接收到的数据作为`JPEG`图像。不同的`Content-Type`类型会触发浏览器采取不同的处理方式，如显示图像、下载文件等。
3. 内容协商：当客户端向服务器发送请求时，可以使用`Accept`头部指定可接受的`Content-Type`类型，服务器可以根据这些信息来选择合适的响应类型。通过内容协商，客户端和服务器可以就请求和响应的内容类型达成一致，提供更适合的数据格式。
4. 防止安全漏洞：在文件上传和处理表单数据时，正确设置`Content-Type`可以帮助防止潜在的安全问题。例如，在接收文件上传时，要确保把正确的`Content-Type`与文件的实际类型匹配，以防止恶意上载的文件被错误地解释和执行。

参数如下:

1. `application/x-www-form-urlencoded` -- 用于在HTTP请求中传输表单数据, 数据形式为键值对`key1=value1&key2=value2&...`, 并在请求的正文中作为**纯文本**传输。
2. `application/json` -- 发送JSON字符串, 对应的后端或者前端都会做对应的处理
3. `text/plain` --  纯文本文件
4. `text/html` -- HTML文档
5. `text/css` -- CSS样式表
6. `application/xml` -- XML数据
7. `image/jpeg`: JPEG图像文件，
8. `image/png`: PNG图像文件，
9. `image/gif`: GIF图像文件，
10. `audio/mpeg`: MPEG音频文件
11. `audio/ogg`: Ogg音频文件
12. `video/mp4`: MP4视频文件
13. `video/ogg`: Ogg视频文件

---

## Content-Length

Content-Length是HTTP消息头的一个字段，用于指示请求或响应中的消息体的长度，以字节为单位。它告诉接收方要接收的实体主体的长度，以便正确解析和处理消息。

对于请求，Content-Length字段通常出现在具有消息体（如POST请求）的请求中，它告诉服务器要读取的数据的长度。

对于响应，Content-Length字段通常出现在具有消息体（如响应主体）的响应中，它告诉客户端接收的数据的长度。


---

# 模块作用域以及module

模块作用域保证模块内定义的成员不在外界被访问(防止变量冲突，解决全局变量的污染)

而`module.export`方法可以将变量导出, 供其他模块使用. 而`module.export`本身就是一个**对象**

导出

```js 
module.export.a = 1;
```

使用接收

```js
const { a } = require('./module.js');
```

---

# dotenv

```bash
npm i dotenv -- save
```

`dotenv`通常配合`.env`文件一起使用, 作用是配置环境变量, 例如: `.env`文件中的`NODE_ENV=development`

```js app.js
const dotenv = require('dotenv');
//配置完之后就可以访问process.env了
dotenv.config();
console.log(process.env.APP_PORT);// 1

```

```
APP_PORT = 1
```

> 注: 在`.env`文件中只有`string`类型

---

# morgan搭配chalk

`morgan`是一个日志工具, 可以记录请求信息, 而`chalk`是一个美化日志的工具, 可以让日志显示不同的颜色

1. 安装

```bash
npm i morgan chalk@4 --save
```

> 注意: `chalk5`版本是`ESM`, 如果你想要在node环境下使用, 或者`typescript`中搭建项目, 你需要使用`chalk4`

```ts
import express from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
app.use(morgan(`${chalk.yellowBright(":method")} - ${chalk.greenBright("{:url}")} - ${chalk.green(":status")} - ${chalk.red(":response-time ms")} - :res[content-length] - ${chalk.yellow(":remote-addr")}`));
```

## morgan的功能

Morgan中间件有着几种模式, 同时你也可以自定义模式(以上chalk和morgan搭配就是自定义模式)

固定模式

1. `combined`
2. `common`
3. `dev`
4. `tiny`
5. `short`

// :method :url :status :res[content-length] - :response-time ms
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" 
// :status :res[content-length] ":referrer" ":user-agent"

> [更多的功能参考官网Morgan](https://www.npmjs.com/package/morgan)

---

# chalk

`chalk`可以改变控制台中字体的颜色

---

# express

安装模块

```bash
npm i express --save
```

## 基本使用

```js
const express = require("express");
const app = express();
app.get("/test", (req, res) => {
  res.send("Hello World!");
}
app.listen(8080, () =>{
    console.log("127.0.0.1:8080");
})
```

> 使用`get`请求访问`http://localhost:8080/test`, 返回`Hello World!`


---

# express-session

`session`在网络应用中称为“会话控制”，是服务器为了保存用户状态而创建的一个特殊的对象。简而言之，`session`就是一个对象，用于存储信息。 
服务器会为每一个游览器(客户端)创建一个唯一的session。这个session是服务器端共享，每个游览器(客户端)独享的。我们可以在session存储数据，实现数据共享。


安装模块

```bash
npm i express-session --save
```


```js
//设置session中间件
app.use(session({
  //服务器生成的session签名
  secret: "handsome",
  //向前端发送cookie的name
  name: "wangjia",
  resave: true,
  //强制将初始化的cookie存储, 即一开始就把cookie发送过去
  saveUninitialized: false,
  /*
    在每次请求时强行设置 cookie，这将重置 cookie 过期时间
    为true时, 超时前刷新, cookie会重新计时, 为false表示在超时前刷新几次, 都是按照第一次刷新开始计时
  */
  rolling: true,
  cookie: {
    //是否仅通过HTTP传输cookie
    httpOnly: true,
    // cookie的过期时间, 按照毫秒计算
    maxAge: 9999,
    //为true时, 表示只有https协议才可以访问cookie. 是否只通过HTTPS传输cookie
    secure: false,
  }
}))
```

---

# mysql的连接以及使用

1. 安装

```bash
npm i mysql2 --save
```

> `mysql2`有着更多的功能

2. 使用

```ts
//导入mysql2, 这里的promise指的是方法返回值为promise对象
import mysql  from "mysql2/promise";
//创建连接池
const db = mysql.createPool({
  //主机ip地址
  host: "localhost",
  //mysql账号
  user: "root",
  //mysql密码
  password: "root",
  //需要进行操作的数据库名称
  database: "manage_system",
  //端口
  port: 3306
})
//测试连接是否成功
async function test(sql: string) {
    try {
        const [result, field] = await db.query(sql);
        console.log("连接成功");
    } catch (error) {
        throw error;
    }
    
}
test("select 1");
//导出
export default db;
```

> [更多请参考文档mysql2](https://sidorares.github.io/node-mysql2/zh-CN/docs#using-connection-pools)

---

# jsonwebtoken

## JWT机制

`token`实际上就是一个字符串, 它有着三个部分: `header`, `payload`, `signature`. 而它的作用是防止数据被伪造和篡改

那么首先就需要说没有`jwt`的时代下, 前端发送给服务器的信息, 我们是不知道这数据是正常的, 被伪造的, 还是被修改过的.

而`jwt`的生成需要数据(data)和密钥(secret), 生成过后发送给前端, 前端在发送数据给给服务器时, 会携带着token, 服务器会根据密钥(secret)和发送过来的数据(data)重新生成一个`token`, 如果生成的`token`和发送过来的`token`一致, 那么说明数据没有被篡改, 如果不一致, 那么说明数据被篡改了.

最终token的形式为:

```
header.payload.signature
```

- header: `header`中存储的是`token`的类型和加密方式, 一般为`JWT`和`HS256`, 经过base64格式转换(不是加密, 经过`btoa`方法转换, `atob`方法解码)

- payload: `payload`中存储的是数据, 一般存储用户的id, 用户名等, 经过base64格式转换(不是加密)

- signature: `signature`是`header`和`payload`通过密钥(secret)加密生成的, 用于验证数据的完整性和真实性

```
//header经过base64转换后的数据
{ "alg": "HS256", "typ": "JWT" } ===> headers
{ "name": "12222" } ===> payload
header.payload 通过秘密加载生成了签名 ===> signature
```

1. 安装

```bash
npm i jsonwebtoken --save
npm i @types/jsonwebtoken -D
```

2. 使用

生成签名: `jwt.sign(payload, secret, options)`

options配置:

1. `algorithm` -- 算法, 默认为`HS256`
2. `expiresIn` -- 过期时间, 默认为`14d`
3. `notBefore` -- 在什么时间之前不可用, 默认为`0`
4. `audience` -- 接收人
5. `issuer` -- 发送人
6. `jwtid` -- `JWT`的`ID`

```ts
import jwt from "jsonwebtoken";
//通过sign方法生成token

```

# redis使用方式

1. 安装

```bash
npm i ioredis --save
npm i @types/ioredis -D
```

2. 使用

```ts
import Redis from "ioredis";
/* 使用redis代替session的使用, 因为session是存储在服务器当中, 当访问量足够大时, 服务器负载就很吃力.
而redis是在内存中运行的, 同时数据也是可以共享的
1. 首先需确保key的唯一性
2. 方便携带
如果我们采用phone：手机号这个的数据来存储当然是可以的，但是如果把这样的敏感数据存储到redis中并且从页面中带过来毕竟不太合适，
所以我们在后台生成一个随机串token，然后让前端带来这个token就能完成我们的整体逻辑了
*/
const redis = new Redis({
    host: '192.168.159.134',
    port: 6379,
    password: 123456
})   
//导出redis
export default redis;
```

:::tip
使用`redis`代替`session`的使用, 因为`session`是存储在服务器当中, 当访问量足够大时, 服务器负载就很吃力. 而redis是在内存中运行的, 同时数据也是可以共享的
:::

数据库的数据会发生变化, 这时需要确保redis中的数据是最新的

**对此应该先操作数据库, 再删除缓存**.