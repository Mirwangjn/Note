## 安装

```bash
npm create vite@latest
```

更多的方式参考[Vite官网](https://cn.vitejs.dev/guide/)

## 命令行界面

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

## vite文件目录解读

```
.
├─ node_modules 依赖包
├─ public 公共文件
│  └─ vite.svg
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  └─ HelloWorld.vue
│  ├─ main.ts
│  └─ vite-env.d.ts
├─ index.html
├─ .gitignore
├─ pack-lock.json
├─ vite.config.ts
└─ package.json
```

- .vscode
  - `extensions.json` -- 作用是检查自己的vscode是否安装了某些插件,如果没有会给一个提示
  - `settings.json` -- 配置`
- node_modules -- 依赖包
- public -- 公共文件
  - ...放置在里面的文件(使用类似于express.static)
- src 
  - components 放置组件
  - App.vue
  - main.ts
  - `vite-env.d.ts` -- 声明文件后缀,作用是认识像.txt, .jpg..., 因为ts本身并不认识这些文件
- .gitignore -- 忽略文件
- index.html 主页面
- pack-lock.json -- 包版本控制
- package.json -- 包配置,使用`npm i`会通过这个文件下载使用的依赖包
