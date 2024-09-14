## 配置代理服务器

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteNameExtend from "vite-plugin-vue-setup-extend"
export default defineConfig({
  plugins: [vue()],
  //启用代理服务器
  server: {
    proxy: {//做映射
      // 路径为/api开头的走这里
      "/api": {
        //代理目标地址
        target: "http://localhost:3000",
        //控制是否修改来源, 通常ip访问服务器时, 会获得你的ip, 通过反向代理会将请求的来源地址更改为代理目标地址，以确保目标服务器正确处理请求。
        changeOrigin: true,
        //对请求路径进行重写。当路径为/api开头时, 将/api替换为空, 想后端发去
        rewrite: (path) => {
          return path.replace(/^\/api/, '');//前端请求时需要需要前缀api, 而后端接口不需要
        }
      }
    }
  }
})
```

- `target`: 代理目标地址，即请求将会被转发到的地址。可以是一个字符串，也可以是一个函数。
- `changeOrigin`: 控制是否修改来源。当此选项为 `true` 时，反向代理会将请求的来源地址更改为代理目标地址，以确保目标服务器正确处理请求。通常在跨域请求时需要设置为 `true`。在示例中，`changeOrigin: true` 表示会修改请求的来源地址。
- `rewrite`: 对请求路径进行重写。可以是一个函数，用于修改请求路径。在示例中，`rewrite: (path) => path.replace(/^\/api/, '')`表示将请求路径中的 `/api` 部分替换为空字符串，以符合目标服务器的接口规则。
