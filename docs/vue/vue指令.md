## v-for

格式: `v-for="xxx in obj"`

```vue
<template>
 <h1 class="props">父组件向我传递数据</h1>
 <ul>
    <li v-for="(item, index) in personList" :key="item.id">
    姓名: {{ item.name }} -- 年龄: {{ item.age }}
    </li>
 </ul>
</template>

<script lang='ts' setup>
import { defineProps } from "vue";
import { type People } from "../types";
// const x = defineProps(['personList']);
const x = defineProps<{
    personList: People,
}>()
console.log(x);

</script>
```

---

## v-bind

单项数据绑定, 其形式为`v-bind:属性名="表达式"`, 同时也可以缩写为`:属性名="表达式"`. 进行绑定后,属性值就不再是普通字符串, 而是可以访问**数据的表达式**.

简单使用

```vue
<template>
    <div class="test">
        <!-- 最终页面呈现 src="http://xxxxx"-->
        <img :src="url">
    </div>
</template>
<script lang='ts' setup>
import { ref } from "vue";
const url = ref("http://xxxxx");
</script>
```

---

### v-bind的第二种用法

- `v-bind`的第二种用法的作用是传递`props`, 而且其后不跟冒号
- 形式: `v-bind="{ ... }"`

```vue
<template>
<!-- 相当于<Father :a="article.a" :b="article.b" :c="article.c"/> -->
<Father :a="article.a" v-bind="{ b: article.b, c: article.c }"/>
</template>
```

---

## v-model双向绑定

数据和页面相互连通

- 全称写法: `v-model:value="xxx"`
- 简写写法: `v-model="xxx"`

```vue
<template>
    <div class="item_1">姓: <input type="text" v-model="person.surname"></div>
</template>
<script lang='ts' setup>
import { reactive } from "vue";

const person = reactive({
    surname: "王",
})
</script>
```

> [更多细节参考组件通信中的v-model](#v-model)

---

## v-show

条件为真显示; 条件为假就使用`display: none`隐藏

```js
<h2 v-show="toy">兄弟的玩具: {{ toy }}</h2>
```

```js
const toy = ref("");//空字符串为false, 所以隐藏.
```

---

## v-if

条件为真添加; 条件为假直接**销毁**

```js
<h2 v-show="toy">兄弟的玩具: {{ toy }}</h2>
```

```js
const toy = ref("");//空字符串为false, 所以直接销毁掉
```