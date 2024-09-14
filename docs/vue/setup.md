## vue3`setup`语法糖

```vue
<script lang="ts" setup name="Person1212">
  //这个name属性实际上不是vue的功能,而是通过插件配合来使用
</script>
```

:::tip
这个脚本块`script`将被预处理为组件的 `setup()` 函数，这意味着它将为每一个组件实例都执行。
:::

插件安装以及使用: `npm i vite-plugin-vue-setup-extend`

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteNameExtend from "vite-plugin-vue-setup-extend"
export default defineConfig({
    plugins: [
        vue(), 
        ViteNameExtend()
    ]
})
```