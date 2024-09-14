# readonly 与 shallowReadonly

接受一个对象(不论是响应式还是普通的)或是一个 `ref`, 返回一个原值的只读代理

- `readonly`: 让一个响应式数据变为只读的(深只读).
- `shallowReadonly`: 让一个响应式数据变为只读的(浅只读).
- 应用场景: 不希望数据被修改时。 

::: code-group

```vue{4} [app.vue]
<script lang='ts' setup>
import { reactive, watchEffect } from "vue";

const original = reactive({ count: 0 })

const copy = readonly(original) // [!code --]

watchEffect(() => {// [!code ++]
  // 用来做响应性追踪
  console.log(copy.count)
})
// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!

</script>
```

```js [config.js]
const test = shallowReactive({
    a: {
        b: {
            c: 1
        }
    }
})
```

```js [utils.js]
const test = shallowReactive({
    a: {
        b: {
            c: 1
        }
    }
})
```

:::

> `c`的改变不会触发响应式

---

## test

::: tip 注意
[参考example](./api-examples){target="_self"}

[vue3官网](https://cn.vuejs.org/){target="_blank"}
:::



> 注: 链接跳转最好不要写后缀, 但也可以写

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |


:tada: :100:

[[toc]]


> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。


<!--@include: ./tip.md-->