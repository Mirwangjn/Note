# 起步配置ts

```bash
npm i nodmeon ts-node -g
```

> `nodemon` 用于监听文件变化，自动重启服务
>
> `ts-node` 用于运行 `ts` 文件, 而不需要转化成js文件, 而是直接运行ts文件

---

## 安装express

```bash
npm i express --save
npm i "@types/express -D
```

开启express服务监听

```ts
//在ts中引入包时, 还需要引入它们的声明文件 @types/xxx
import express from 'express';
const app = express();
//使用nodemon --exec ts-node app.ts 直接运行ts文件而不需要转换为js文件之后再运行
app.listen(8080, () => {
    console.log(`http://localhost:8080`);
})
```

在`package.json`中配置启动命令

```json
  "scripts": {
    "start": "nodemon --exec ts-node ./app.ts"
  },
```

> `--exec`作用是, 同时运行多个命令



---

# 配置环境变量env

安装

```bash
npm i dotenv dotenv-expand --save
```

配置

```ts
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
//增强dotenv,并在.env中可以使用${}操作
const env = dotenvExpand.expand(dotenv.config()).parsed as dotenvExpand.DotenvParseOutput;

app.listen(env.APP_PORT, () => {
    console.log(`http://localhost:${env.APP_PORT}`);
})
```

这时环境变量`.env`中可以使用`${}`语法

```
# 配置环境变量
SERVER_HOST=localhost
SERVER_PORT=3000
API_URL=https://${SERVER_HOST}:${SERVER_PORT}/api
```

---

## 配置日志消息

安装

```bash
npm i morgan --save
```

配置


---

# sql文件路径

`C:\Users\wang\AppData\Roaming\JetBrains\IntelliJIdea2020.1\consoles\db\c9e2bf51-a0f0-4db0-8787-7b0c82cd0c4f`