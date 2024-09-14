# vite构建工具

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

![文件目录](img/1.文件目录.png "文件目录")

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

---

# vue指令

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

# vue3`setup`语法糖

```vue
<script lang="ts" setup name="Person1212">
  //这个name属性实际上不是vue的功能,而是通过插件配合来使用
</script>
```

> 这个脚本块将被预处理为组件的 `setup()` 函数，这意味着它将为每一个组件实例都执行。

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

---

# 工程目录

- src
  - public -- (存放公共资源)
  - components -- (存放一般组件)
  - views -- (存放路由组件)
  - store -- (创建store)
  - router -- (创建路由)
  - types -- (类型声明)
  - utils -- (工具包)
- .gitignore
- index.html
- package.json
- vite.config.js

---

## 在vue工具的呈现方式

数据在关键位置, 而函数在other的位置

![setup数据的呈现方式](img/4.%20setup数据的呈现方式.png)

---

# 配置代理服务器

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteNameExtend from "vite-plugin-vue-setup-extend"
export default defineConfig({
  plugins: [vue(), ViteNameExtend()],
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

---

# v-指令

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


---

# ref()响应式数据

在`vue2`中只要数据放在data属性中, 那么数据就是响应式的

- 作用: 定义一个响应式的数据
- 语法: ```const xxx = ref(initValue)``` 
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象`RefImpl`（reference对象，简称ref对象）</strong>。
  - JS中操作数据： ```xxx.value```
  - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的`get`与`set`完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">求助</i> 了Vue3.0中的一个新函数—— `reactive`函数。

> `ref`在`<template>`模板中有着`自动解包`的操作, 所以可以不用`.value`


```vue
  <template>
    <!-- 自动解包, 不需要.value, 因为内部已经帮你.value了 -->
    <div class="result">{{ result }}</div> 
</template>

<script lang='ts' setup name='app'>
import { ref } from "vue";
const result = ref(1);
</script>
```

---


## 基本使用

```vue
<template>
    <h1>{{ wang }}</h1>
    <button @click="useData">click me</button>
</template>

<script lang="ts" setup name="App">
import { ref } from "vue";

const wang = ref("wangjia");

function useData() {
    wang.value += "!";
    console.log(wang);
}
</script>
```


![ref实例对象](img/ref实例对象.png)

---

# reactive()

- 作用: 专门用于定义`对象类型`的响应式数据
- 语法: `const xxx = reactive(obj);`

> 数组也是对象类型

## 基本使用

```vue
<template>
<section>
    <h1 class = "person">{{ person }}</h1>
    <button @click="changeName"></button>
</section>
</template>
<script setup>
import { ref, reactive } from "vue";
const people = reactive({
    name: "wang",
    sex: "nan",
    age: "18"
})
const games = reactive([
    {id: 1, name: "王者荣耀"},
    {id: 2, name: "英雄联盟"}

])
const changeName = () => {
    person.value += "11"; 
}
</script>
```

## 内部实现

通过原生函数`Proxy`实现

![reactive的实现](img/5.reactive的实现.png)

---

## ref对比reactive

1. 宏观角度
   - `ref`定义: 基本类型, 对象类型
   - `reactive`定义: 对象类型
2. 区别
   - `ref`创建的变量必须使用`.value`
   - `reactive`重新分配一个对象, 会失去响应式(可以使用`Object.assign`进行整体替换)
   - `ref.value`重新分配一个对象时, 不会失去响应式
   - 虽然不可以为`reactive`直接分配一个对象, 但它的属性如果是对象的话, 是可以直接替换的

```vue
<script lang='ts' setup>
import { ref, watch, reactive } from "vue";
const person = ref({
    name: "wangjianian",
    age: 18
});

const changeAll = () => {
  //不会失去响应式
  person.value = {name: "llj", age: 89}
}
</script>
```

---

# toRefs与toRef

## toRefs

- 把`reactive`所定义的对象中的每一个`key-value`变为一个个的`ref`响应式对象, 并且与原来的reactive对象是相关联的
- 返回一个新对象, 且对象中的属性都是`ref`响应式对象
- 函数使用`toRefs(reactive响应式对象)`



![toRefs](img/6.toRefs使用.png)

```vue
<script lang='ts' setup name = "Person">
import { reactive, toRefs } from "vue";

const person = reactive({
    name: "wang",
    age: 18
})
const changeName = () => {
    //这种结构赋值只是将值取值, 但值并不是响应式
    // const {name, age} = person;
    // console.log(name, age);//wang 18
    //正确做法 name与person.name是相连接的, name发生改变person.name也会发生改变
    const {name, age} = toRefs(person);
    //使用时需要记得.value
    console.log(name.value, age);//这时的name和age就都是ref响应式对象
}
</script>
```

---

## toRef

对reactive中特定的属性进行加工为`ref`响应式对象

```vue
<script lang='ts' setup name = "Person">
import { ref, reactive, toRef } from "vue";
const person = reactive({
    name: "wangjianian",
    age: 18
})
const changeName = () => {
  //对特定的属性进行改造为ref响应式对象
  const name = toRef(person, "name");
  // name.value += "wan";
  console.log(name.value);
   
}

</script>
```

> 两者都是将响应式对象中的属性结构拿出, 并且此属性依然具有响应式的作用

---

# computed计算属性

- set -- 只写
- get -- 只读
- 返回值为`ComputedRefImpl`对象

`computed`有`set`和`get`函数, 但很多情况都是使用`get`

> 在调用属性时会有着一个**缓存**，如果内部重复执行这一个属性，则只会执行一次。
> 而只要所依赖的值发生改变，就会重新解析模板来获得最新的值。
>
> 普通的方法调用则会傻瓜式的重复调用

## 1.参数为函数

参数为函数形式时, computed只是用了`get`的功能

```vue
<template>
<div class="name">
    <div class="item_1">姓: <input type="text" v-model="person.surname"></div>
    <div class="item_2">名: <input type="text" v-model="person.lastName"></div>
    <div class="result">{{ result }}</div>
</div>
</template>

<script lang='ts' setup>
import { reactive, computed } from "vue";

const person = reactive({
    surname: "王",
    lastName: "加你"
})
//只有get的功能
const result = computed(() => {
    //get为只读属性, 模板的改变触发了重新解析模板
    return person.surname + "--" + person.lastName;
})
// result.value = 1; error 因为没有写set, 所以result是只读属性
```

---

## 2.参数为对象

可以运用`set`和`get`

```vue
<script lang='ts' setup>
import { reactive, computed } from "vue";
const person = reactive({
    surname: "王",
    lastName: "加你"
})
const fullName = computed({
    get: () => {
        return person.surname + person.lastName;
    },
    set: (val: any) => {//val为需要被修改的值, 但computed的值还没有被修改
        console.log(val);
    }
})

function changeFullName() {
  /* 这时的赋值并不会直接修改computed的值, 而是触发了set的调用, 计算属性依赖于所需要的值, 根据他们的变化而变化
  如同下方那样直接修改值, 根本就没有什么作用 */
  fullName.value = "111";
}

</script>
```

> 大部分情况`computed`属性只使用`get`

---

# v-bind单向数据绑定

- 全称写法: `v-bind:属性="xxx"`
- 简写写法: `:属性="xxx"`

即数据可以影响页面的呈现, 而页面的交互不会影响到数据

---

# watch监视

- 作用: 监视数据的变化
- 参数: `watch(被监视的值, (newVal, oldVal))`
- 特点: 可以监视以下`四种数据`
- 返回值: 一个函数, 这个函数的作用是**停止监视**

1. `ref`定义的数据
2. `reactive`定义的数据
3. 函数返回一个值(`getter`)
4. 一个包含上述的数组

> 结论: 监视的是对象里的属性, 那么最好写成函数式. 监视的若是对象的地址值, 则需要检测内部属性, 开启`deep`属性

---

## 使用情况1

监视`ref`定义的基本数据

```vue
<script lang='ts' setup>
import { ref, watch } from "vue";
const sum = ref(0);
const changeSum = () => {
    sum.value += 1;
}
/* sum为被监视的值(这里不需要.value); newVal为新的值, oldVal为旧的值
  返回值为一个函数, 作用为停止监视 */ 
const stopWatch = watch(sum, (newVal, oldVal) => {
    console.log(newVal, oldVal);
    if(newVal === 10) stopWatch();
})

</script>
```

---

## 使用情况2

监视`ref`定义的对象类型

watch第三个参数的配置项
- `deep` -- 开启深度监视, 可以监视到对象的属性(Boolean)
- `immediate` -- 立即监视, 在一开始即便数据没有发生改变, 也会执行一次`watch`(Boolean)


![watch的immediate属性](img/8.watch的immediate属性.png)

```vue
<script lang='ts' setup>
import { ref, watch } from "vue";
const person = ref({
    name: "wangjianian",
    age: 18
});
const changeName = () => {//修改属性不会改变地址
    person.value.name += "!";
}
const changeAge = () => {//修改属性不会改变地址
    person.value.age += 1;
}
const changeAll = () => {//修改整个对象, 地址会被改变
    person.value = {name: "llj", age: 89}
}
watch(person, (newVal, oldVal) => {
    /* 根据下方图片发现, 监视的对象person只有被整体更换后才会触发watch,
    并且更换后的值依旧是响应式对象 */
    console.log("person变化了", newVal, oldVal);
})
//开启深度监视, 这样对象的属性变化也可以监视到
watch(person, (newVal, oldVal) => {
    console.log("person变化了", newVal, oldVal);
}, {deep: true})
</script>
```

> `watch`监视`ref`定义的对象类型监视的是`它的地址`, 若想要监视对象内部的属性变化, 需要开启深度监视

> - 若修改的是`ref`定义的对象中的属性, `newVal`和`oldVal`都是新值, **因为它们是同一个对象**
>
> - 若修改的是整个`ref`的定义的对象, `newVal`是新值, `oldVal`是旧值,**因为它们不是同一个对象**

![watch的第二种情况](img/7.watch的第二种情况.png)

---

## 使用情况3

监视`reactive`, 默认开启深度监视(隐式创建深层监听), 并且无法通过`deep`关闭

```vue
<script lang='ts' setup>
import { ref, watch, reactive } from "vue";
const person = reactive({
    name: "wangjianian",
    age: 18
});
const changeName = () => {
    person.name += "!";
}
const changeAge = () => {
    person.age += 1;
}
const changeAll = () => {
    Object.assign(person, {name: "llj", age: 19});
}
watch(person, (newVal, oldVal) => {
    console.log(newVal, oldVal);
})
</script>
```

> 监视`reactive`对象, `newVal`和`oldVal`值相同, **因为它们是同一个对象**

![watch监视reactive出现的问题](img/9.watch监视reactive出现的问题.png)

---

## 使用情况4

监视`ref`或`reactive`定义的对象类型中的**某个属性**

1. 若该属性不是**对象类型**, 需要写成函数形式
2. 若该属性依然是**对象类型**, 可直接编写, 也可以写成函数, **建议写成函数**

### 监测简单类型的属性

```vue
<script lang='ts' setup>
import { ref, watch, reactive } from "vue";
const person = reactive({
    name: "wangjianian",
    age: 18,
    car: {c1: "mini", c2: "雅迪"}
});
const changeName = () => {
    person.name += "!";
}
const changeAge = () => {
    person.age += 1;
}

const changeCar = () => {
    person.car = {c1: "奥迪", c2: "bench"}
}
//如若想要监视一个简单属性, 需要以一个函数的形式返回值
watch(() => { return person.name }, (newVal, oldVal) => {
    console.log("person.name", newVal, oldVal);
})
</script>
```

---

### 监测对象类型的属性(直接编写的形式)

当监视对象类型的属性时, 监视的是这个对象里面的属性, 而对象本身被直接修改时,不会触发监视. 即便开始深度监视`deep`都没用

```vue
<script lang='ts' setup>
import { ref, watch, reactive } from "vue";
const person = reactive({
    name: "wangjianian",
    age: 18,
    car: {c1: "mini", c2: "雅迪"}
});
const changeCar1 = () => {//更改属性
    person.car.c1 = "奥迪"
}
const changeCar2 = () => {//更改属性
    person.car.c2 = "benz"
}
const changeCar = () => {//更改对象
    person.car = { c1: "莱斯莱斯", c2: "阿什顿马丁" }
}
/* 当监视对象类型的属性时, 只有这个对象里的属性才会触发监视 */
watch(person.car, (newVal, oldVal) => {
    console.log(newVal, oldVal);
    
})//使用{deep: true}也没用
</script>
```

> 细枝末节的改变可以检测到, 而整个的不行

![监视对象类型的属性](img/10.监视对象类型的属性.png)

---

### 监测对象类型的属性(函数式)

使用函数式监视对象类型的属性, 监视的是**这个对象的地址**

开启deep深度监视, 有着效果

```vue
<script>
//这时监视的是这个对象的地址值
watch(() => person.car, (newVal, oldVal) => {
    console.log(newVal, oldVal);
})//开启{deep: true}后, 可以监视内部的属性

watch(() => person.car, (newVal, oldVal) => {
    console.log(newVal, oldVal);
}, { deep: true })//开启{deep: true}后, 可以监视内部的属性
</script>
```

---

## 情况5

- 监视一个对象的多个数据
- `newVal`, `oldVal`的类型是数组

```vue
<script>
//多个数据需要使用数组
watch([() => person.car, () => person.name], (newVal, oldVal) => {
    //这时newnewVal, oldVal也是数组
    console.log(newVal, oldVal);
})
</script>
```

![watch监视多个数据](img/11.watch监视多个数据.png)

---

# watchEffect

`watch`监视只会监视传入的数据, 而`watchEffect`会自动去分析. 

- 在开始就会调用一次回调函数
- 同时响应式地追踪其依赖

```vue
<script>
watchEffect(() => {
    if(message.temp >= 90 || message.position >= 90) {
    //发送请求
    console.log("发送请求");
    
    }
})
</script>
```

---

# 打标记的ref属性

作用: 用于注册模板引用

- 当用在普通的`DOM`标签上, 获取的是`DOM`节点
- 用在组件标签上, 获取的是组件实例对象

相当于vue2里的ref, 为标签做标记

在多人协作中, 如果使用`id`可能会发生冲突, 因为`id`是唯一的

---

## 给html标签打标记

```vue
<template>
    <h1 ref="title">我被ref标记了</h1>
</template>

<script lang='ts' setup>
import { ref } from "vue";
//变量名必须与ref标签的值保持一致
const title = ref();
console.log(title);
</script>
```

![打标签的ref](img/12.打标签的ref.png)

> 多个vue组件中ref的值相等不会发生冲突

---

## 给组件标签打标记

```vue App.vue
<template>
<div class="container">
  <RefLabel ref="label"/>
  <button @click="show">点我看清真正的模样</button>
</div>
</template>

<script lang='ts' setup name = "App">
import { ref } from "vue";
import RefLabel from './components/RefLabel.vue'
const label = ref();
function show() {
    /* 返回值是组件标签的实例, 但默认情况下无法看见实例的方法和变量的(被保护起来了)
    除非使用defineExpose方法导出 */
  console.log(label.value);
}
</script>
```

```vue RefLabel.vue
<template>
    <h1 ref="title">我被ref标记了</h1>
</template>

<script lang='ts' setup>
import { ref, defineExpose } from "vue";
const title = ref();
const a = ref(0);
const b = ref(1);
const c = ref(2);
//借助defineExpose将变量导出
defineExpose({a,b,c});
</script>
```

![为组件标签打标记](img/13.为组件标签打标记.png)

---

# 在vue中使用ts

```ts
//一个接口并导出
export interface People {
    name: string, 
    age: number,
    email?: string | null
}
```

> `?`表示这个属性是可选的

```vue
<script lang='ts' setup>
import { reactive } from "vue";
//在vue中导入类型, 一定要在前面加一个type, 声明它是一个类型
import { type People } from "@/types";
//使用于普通对象 这时不添加email属性也没事,因为它是可选的
let person_1: People = {name: "wang", age: 18};
//运用于reactive就可以添加泛型约束
let person_2 = reactive<People>({
    name: "wangjianian",
    age: 18,
})
// 或者类型约束使用let person = reactive<Array<People>>
let person_3 = reactive<>([
    { name: "wang", age: 18 },
    { name: "jia", age: 15 }
])
</script>
```

> `@`表示在`src`路径下, 相当于是金字塔的塔尖

---

# props

接收**父组件**传递过来的数据

## 基本使用

```vue App.vue
<template>
<div class="container">
    // Props就是一个名字, 没有其他含义
  <Props personList="111"/>
</div>
</template>
```

---

```vue
<template>
 <h1>父组件向我传递数据</h1>
 <h1>传递的数据为: {{ personList }}</h1>
 <h1>传递的数据为: {{ x.personList }}</h1>
</template>

<script lang='ts' setup>
import { defineProps } from "vue";
//因为父组件没有传递关于a的数据, 所以a的值是undefined
const props = defineProps(['personList', "a"]);
console.log(props);
</script>
```

> 根据上述代码, 哪怕没有`x`变量, `personList`也是可以直接使用的.
>
> 当如果需要打印数据, 就需要使用变量接收

![props的返回值](img/14.props的返回值.png)

---

## 在props函数中使用ts

```vue App.vue
<template>
<div class="container">
  <Props :personList="personList"/>
</div>
</template>

<script lang='ts' setup name = "App">
import { reactive } from "vue";
import { Person } from "./types"
import Props from './components/props.vue'

const personList = reactive<Person>({
  name: "wangjianian",
  age: 18
})

</script>
```

---

```vue Props.vue
<template>
 <h1 class="props">父组件向我传递数据</h1>
 <h1>传递的数据为: {{ x.personList }}</h1>
</template>

<script lang='ts' setup>
import { defineProps } from "vue";
import { Person } from "../types";
// const x = defineProps(['personList']);
const x = defineProps<{
    personList: Person,
    //?表示这项是可选项, 可以限制属性的必要性
    nation?: string
}>()
console.log(x);
</script>
```

> 经过类型的约束, 如果传递的值类型与实际不符合就会报错

---

# vue2生命周期
组件的生命周期: `创建` ===> `挂载` ===> `更新` ===> `销毁`. 在特定的时期调用不同的钩子函数

- 创建阶段: `beforeCreate`, `created`
- 挂载阶段: `beforeMount`, `mounted`
- 更新阶段: `beforeUpdate`, `updated`
- 销毁阶段: `beforeDestroy`, `destroyed`

<!-- 1. `beforeCreate` 这时还无法通过`vm`访问data数据和methods方法
1. `created` 可以访问`vm`访问data数据和methods方法
2. `beforeMount` 挂载之前, 这时页面呈现的是未经Vue编译的`DOM`结构, 所有对DOM的操作最终都不起作用
3. `mounted` 页面中呈现Vue经过编译后的DOM
4. `beforeUpdate`
5. `updated`
6. `beforeDestroy`
7. `Destroyed` -->

![vue2生命周期](img/15.vue2生命周期.png)

---

# vue3生命周期

- 创建阶段: `setup`
- 挂载阶段: `onBeforeMount`, `onMounted`
- 更新阶段: `onBeforeUpdate`, `onUpdated`
- 卸载阶段: `onBeforeUnmount`, `onUnmounted`

> 常用的钩子: `onMounted`, `onUpdated`, `onBeforeUnmount`

> vue3并没有像vue2一样叫`beforeDestroy`销毁, 而是`onUnmounted`卸载

```vue
<template>
    //vue3在写法上可以不要求只有一个大标签 
    <h1>sum: {{ sum }}</h1>
    <button @click="changSum">点我</button>
</template>
<script lang='ts' setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from "vue";
const sum = ref(0);
function changSum() {
    sum.value += 1;
}
onBeforeMount(() =>{
    console.log("挂载前");
    
})
onMounted(() => {
    console.log("挂载后");
    
})
onBeforeUpdate(() => {
    console.log("更新前");
    
})
onUpdated(() => {
    console.log("更新后");
    
})
onBeforeUnmount(() => {
    console.log("卸载前");
    
})
onUnmounted(() => {
    console.log("卸载后");
    
})
</script>
```

---

# 自定义hooks(组合式函数)

笔记中之前的代码的功能都是在同一个地方, 这样就与vue2的形式是一致的了

`hooks`与`composition API`有着紧密的联系

<div style="width:600px;height:370px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div style="width:300px;height:370px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>

## hooks的形式

- 其文件形式通常为`usexxx.ts`, `xxx`则是一个功能.
- 此文件通常导出的是一个函数
- 好处: 1. 功能复用 2. 用多个较小且逻辑独立的单元来组合形成复杂的逻辑

```vue Person.vue
<template>
    <div class="person">
        <h1>当前求和: {{ sum }}</h1>
        <button @click="changeSum">点我加1</button>
        <h1>大帅哥的信息和图片</h1>
        <button @click="addHandsome">点我获得信息</button>
        <div class="handsomeManList">
            <img v-for="(item, index) in handsomeManList" :key="index" :src="item">
        </div>
    </div>
</template>

<script lang='ts' setup>
//导入hooks, 每个功能都在不同的.ts文件中
import useSum from '../hooks/useSum';
import useDog from "../hooks/useDog"
const { sum, changeSum } = useSum();
const { addHandsome, handsomeManList } = useDog();
</script>
```

---

```ts useDog.ts 
import { reactive } from "vue";
import axios from "axios";
//通常导出一个函数, 且这个函数通常会暴露(return)一些值
export default function() {
    const instance = axios.create({
        baseURL: "https://dog.ceo/api/breed/pembroke/images/random"
    })
    const handsomeManList = reactive<string[]>([]);
    const addHandsome = async () => {
        try {
            const res = await instance.get("");
            handsomeManList.push(res.data.message);
        } catch(err) {
            alert(err.message);
        }
    }
    //数据与函数的颜色会有着分类
    return { handsomeManList, addHandsome };
}
```

```ts useSum.ts
import { ref } from "vue";
//通常导出一个函数, 且这个函数通常会暴露(return)一些值
export default function() {
    const sum = ref(0);
    const changeSum = () => {
        sum.value += 1;
    }
    return { sum, changeSum };
}
```

> 这样每个功能都在各自的文件当中, 并且每个功能的**钩子函数**都是互不影响的

---

# 事件对象和传参

## 默认不传递参数

```html
<!-- 当方法没有传递参数时, 第一个参数默认就是事件对象 -->
<button @click="test">点我有惊喜</button>
```

```ts
const test = (x:Event) => {
    console.log(x);// PointerEvent 
}
```

---

## 传递参数

```html
<button @click="test(1,2,3)">点我有惊喜</button>
```

```ts
//而进行传递参数时, 事件对象也被弄掉了
const test = (a: number, b: number, c: number, d) => {
    console.log(a, b, c);// 1, 2, 3, undefined
}
```

> 当方法需要传参时, 需要对事件对象特殊标记, 使用`@event`占位

正确方式

```html
<button @click="test(1,2,3, $event)">点我有惊喜</button>
```

```ts
const test = (a: number, b: number, c: number, d: PointerEvent) => {
    console.log(a, b, c, d);// 1, 2, 3, PointerEvent事件对象
}
```

> [关于`@click`的原理参考自定义事件](#自定义事件)

---

# 事件修饰符

`vue`中常用的事件修饰符:

- `prevent`：阻止默认事件（常用）, 相当于事件对象中的`preventDefault()`;
- `stop`：阻止事件冒泡, 事件有冒泡阶段和捕获阶段, 冒泡阶段从内到外, 捕获阶段从外到内, 相当于事件对象中的`stopPropagation()`
- `once`：事件只触发一次
- `capture`：使用事件的捕获模式
- `self`：只有`event.target`是当前操作的元素时才触发事件
- `passive`：事件的默认行为立即执行，无需等待事件回调执行完毕

```vue
<template>
    <div class="container">
        <button type="submit" @click.prevent="changeOne">click</button>
    </div>
</template>
```


# 组件通信

## props父<->子

### 父传子

父通过`props`将信息传给儿子

```vue Father.vue
<template>
    <div class="container">
        <h3>真心话: {{ love }}</h3>
        <Child :car="car" />
    </div>

</template>
<script lang='ts' setup>
import Child from "....";
import { ref } from "vue";
const car = ref("奔驰");
</script>
```

```vue Child.vue
<template>
    <div class="talk">
        <h3>真心话: {{ car }}</h3>
    </div>
</template>
<script lang='ts' setup>
import { defineProps } from "vue"; 
//接收
defineProps(["car"]);
</script>
```

---

### 子传父(传函数)

父传给孩子一个函数, 然后孩子去调用, 随带把值带给父

```vue Father.vue
<template>
    <div class="container">
        <h3>真心话: {{ love }}</h3>
        <h3 v-show="toy">子给的玩具: {{ toy }}</h3>
        <Child :love="love" :sendToy="getToy" />
    </div>
</template>
<script lang='ts' setup>
import { ref } from "vue";
import Child from './components/Child.vue'
const love = ref("she loves him");
const toy = ref("葫芦娃");
const getToy = (val: string) => {
    console.log("孩子给我的值", val);
    toy.value = val;
}
</script>
```

```vue Child.vue
<template>
    <div class="talk">
        <h3>真心话: {{ love }}</h3>
        <h3>我最爱的玩具: {{ toy }}</h3>
        <button @click="sendToy(toy)">把玩具给father</button>
    </div>
</template>
<script lang='ts' setup>
import { defineProps, ref } from "vue"; 
const toy = ref("奥特曼");
/* sendToy是传递过来的函数, 无法直接在script中调用, 而是需要通过props.xxx才可以, 但sendToy可以直接在模板中使用, 并顺带将值给传递过去 */
const props = defineProps(["love", "sendToy"]);

</script>
```

---

## 自定义事件defineEmits

子 ---> 父

父给子绑定了一个自定义事件`@xxx`, 而子通过`defineEmits([name])`的返回值`emit(name, arg1, arg2, ...)`响应父

```html Father.vue
<!-- 绑定`自定义事件 -->
<Child @send-toy="getToy" />
```

> 自定义事件中推荐使用`kebab-case`的事件名, 即:`my-event`, 而不是`myEvent`

```vue Child.vue
<template>
    <div class="talk">
        <h1>子组件</h1>
        <h2 v-if="toy">儿子的玩具: {{ toy }}</h2>
        // 使用点击事件触发自定义事件
        <button @click="emit('send-toy', toy, 2)">点我触发自定义事件效果</button>
    </div>
</template>

<script lang='ts' setup>
import { ref, defineEmits, onMounted } from "vue";

const emit = defineEmits(["send-toy"]);

const toy = ref("奥特曼");
//在script中触发自定义事件
onMounted(() => {
    setTimeout(() => {
        //第一个参数是指定自定义事件名, 而之后的参数就是自定义的
        emit("send-toy", toy, 2);
    }, 3000)
})
</script>
```

---

## mitt

**实现任意组件通信**

与`pubsub`, 全局事件总线`$bus`一样, **创建一块公共区域**, 在那绑定事件, 等人触发. 

- 接收数据的: 提前绑定好事件(提前订阅消息)
- 提供数据的: 触发绑定事件(发布信息)

安装

```bash
npm i mitt --save
```

创建

```ts emitter.ts
//导入
import mitt from "mitt";
type Events = {
    test1: string;
    test2?: number;
    test3?: string;
};
//引用. 添加泛型会有类型提示
const emitter = mitt<Events>();
//导出
export default emitter;
```

基本使用

```ts
emitter.on("test1", () => {
    console.log("test1触发");
})
emitter.on("test2", () => {
    console.log("test2触发");
})

setTimeout(() => {
    //类型约束的是需要被传递的参数的类型
    emitter.emit("test1", "wang");
    emitter.all.clear();//清除所以事件
}, 3000)
```

`emitter`总共有4个方法. 
1. `on`绑定事件
2. `emit`触发事件 
3. `all`拿到所有事件
4. `off`解绑事件

[mitt包信息](https://www.npmjs.com/package/mitt)

---

### 在vue中使用

```vue Brother.vue
<script lang='ts' setup>
import emitter from "../utils/emitter";
//绑定事件
emitter.on("sendToy", (val: string) => {
    console.log(val);
    toy.value = val;
})
</script>
```

```vue Child.vue
<template>
    <div class="talk">
        <!-- 给兄弟传数据 -->
        <button @click="emitter.emit('sendToy', toy)">给兄弟传玩具</button>
    </div>
</template>
<script lang='ts' setup>
import { ref, onUnmounted } from "vue";
import emitter from "../utils/emitter";
const toy = ref("奥特曼");
//emit也可以在这写逻辑
//....
//解绑事件 如若组件卸载了, 那么与之对应的事件也就没意义了
onUnmounted(() =>{
    emitter.off("sendToy");
})
</script>
```

---

## v-model

当使用在组件上时, 往往需要与UI打交道

### 使用在标签上

使用双向数据绑定

```html
<input type="text" v-model="username">
```

而这句话等同于:

```html
<input type="text" :value="username" @input="username = $event.target.value">
```

> 双向数据绑定, 是`v-bind`配合`input`事件

---

### 使用在组件上

参考`el-input`

```html
<WInput v-model="username"/>
<!-- 相当于下方代码 update:modelValue是一个事件名. 组件的$event不是事件对象, 用来接收返回值的 -->
<WInput :modelValue="username" @update:modelValue="username = $event"/>
```

那么对应的接收(往往Ul组件库会使用下列接收)

```vue
<template>
    <div class="input">
        <input type="text" :value="modelValue" @input="emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from "vue";
defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);
</script>
```

1. `$event`在原生事件(使用在html标签)中, 就是一个事件对象. -- 可以使用.target
2. 对于自定义事件, `$event`就是触发事件时, 所传递的数据 -- 不能使用.target

---

### 修改modelValue

```html
<WInput v-model:xiaoxiaowang="username"/>
```

对应的接收

```vue
<template>
    <div class="input">
        <input type="text" :value="xiaoxiaowang" @input="emit('update:xiaoxiaowang', $event.target.value)">
    </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from "vue";
defineProps(["xiaoxiaowang"]);
// update: 是前缀不可以修改
const emit = defineEmits(["update:xiaoxiaowang"])
</script>
```

---

## $attrs透传

(祖)爷爷 ---> 孙子

1. 概述: `attrs`用于实现当前组件的父组件, 向当前组件的子组件通信

当父组件向子组件传递数据、方法甚至是`class`、`style`和 `id`, 但并没有使用`props`接收的哪些数据, 都会在`$attrs`那里.
那么再将`$attrs`整个传给孙组件, 这样就实现了, 祖--->孙.

```vue GrandFather.vue
<template>
    <div class="grand_father">
        <h1>I have some data</h1>
        <h3>a: {{ article.a }}</h3>
        <h3>b: {{ article.b }}</h3>
        <h3>c: {{ article.c }}</h3>
        <!-- 相当于<Father :a="article.a" :b="article.b" :c="article.c"/> -->
        <Father :a="article.a" v-bind="{ b: article.b, c: article.c }"/>
    </div>
</template>
<script lang='ts' setup>
import { reactive } from "vue";
import Father from './Father.vue'
const article = reactive({
    a: 1,
    b: 2,
    c: 3
})
</script>
```

```vue Father.vue
<template>
    <div class="father">
        <Child v-bind="$attrs" />
    </div>
</template>

<script lang='ts' setup>
import { defineProps } from "vue";
//此组件不使用props接收参数, 而是直接将整个$attrs传给子组件
</script>
```

```vue Child.vue
<template>
    <h3>a: {{ a }}</h3>
    <h3>b: {{ b }}</h3>
    <h3>c: {{ c }}</h3>
</template>

<script lang='ts' setup>
import { defineProps } from "vue";
//接收爷爷组件的数据
defineProps(["a", "b", "c"])
</script>
```

![attrs的作用](img/29.attrs的作用.png)

---

## $refs和$parent

1. 概述:
   - `$refs`用于: 父-->子
   - `$parent`用于: 子-->父

- `$refs`可以拿到所有被`ref`标记的子组件的实例对象
- `$parent`可以拿到自己父组件的实例对象

> 需注意: vue3中的组件实例, 默认是不会显示内部数据的, 除外使用`defineExpose`将一些数据导出.

### $refs

```vue Father.vue
<template>
    <div class="container">
        <Child ref="c1"/>
        <Brother ref="c2"/>
        <!--  -->
        <button @click="getChild($refs)">点我获得所有子组件实例</button>
    </div>

</template>

<script lang='ts' setup>
import Child from './components/Child.vue'
import Brother from './components/Brother.vue'
import { ref } from "vue";
const c1 = ref();
const c2 = ref();
const getChild = (refs: any) => {
    console.log(refs);
    //对子组件的数据进行操作
}
</script>
```

![defineExpose导出数据](img/30.defineExpose导出数据.png)

---

### $parent

```html
<button @click="getHouse($parent)">点我获得父组件实例</button>
```

```ts
const getHouse = (parent: any) => {
    console.log(parent);
}
```

---

## provide和inject

祖 ---> 孙

如若想实现孙传祖, 那就让祖传递一个函数就行

- `provide(name, defaultValue)`向后代(儿子,孙子,从孙,..)提供数据
- `inject`注入数据

```ts
import { provide } from "vue";
//向后代提供数据
provide("thing", article.value);
```

```ts
import { inject } from "vue";
//接收数据 第一个参数为名字, 第二个参数为默认值
const x = inject("thing", { a: 0, b:0 });
```

> 注: 当在ui组件中非常有用, 当两个组件之间没有父子关系时,但它们是标签的父子关系, 可以使`用provide`和`inject`进行通信

```vue
<!-- 两组件相互独立, 但在标签上它们是父子关系, 这样它们就可以使用provide和inject进行通信 -->
<w-menu width="160px">
    <w-menu-item index="1" :is-route="false">
        <svg-icon name="logout"></svg-icon>
        <span>logout</span>
    </w-menu-item>
</w-menu>
```

---

## 通信方式汇总

1. 父传子
   1. `props`
   2. `v-model`
   3. `$refs`
   4. 默认插槽, 具名插槽
2. 子传父
   1. `props`
   2. 自定义事件
   3. `v-model`
   4. `$parent`
   5. 作用域插槽
3. 祖传孙-孙传祖
   1. `$attrs`
   2. `provide`, `inject`
4. 兄弟间, 任意组件间
   1. `mitt`
   2. `pinia`

---

# 插槽Slots

组件能够接收任意类型的 JavaScript 值作为`props`, 而插槽可以接收**模板内容**

## 插槽内容与出口(默认插槽)

```vue
<template>
<FancyButton>
  <h2 style="color: red;">click me?</h2> <!-- 插槽内容 -->
</FancyButton>
</template>
```



而 `FancyButton` 的模板是这样的：

```vue
<template>
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口提供放置位置 -->
</button>
</template>
```

---

## 渲染作用域

插槽内容本身是在父组件模板中定义的, 所以可以访问到父组件的数据作用域, 
这样就通过插槽实现了一种通信方式(父->子)

```vue
<template>
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
</template>
```
插槽内容无法访问子组件的数据。Vue 模板中的表达式只能访问其定义时所处的作用域，这和 JavaScript 的词法作用域规则是一致的。换言之:

> 父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。

---

## 具名插槽

有时在一个组件中包含多个插槽出口, 这时候就需要**具名插槽**

带 `name` 的插槽被称为具名插槽。没有提供 `name` 的 `<slot>` 出口会隐式地命名为`default`。

在使用时, 传递插槽内容的代码需要使用`<template>`标签包裹, 并使用`v-slot:name`或者`#name`进行标识.

```vue UseSlot.vue
<template>
<div class="useSlot">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <!-- 当使用具名插槽后, 没有标识名字的默认就是default -->
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
</template>
```

```vue App.vue
<template>
    <div class="container">
        <!-- 使用具名插槽,需要使用template标签包裹 -->
        <SlotUse>
            <!-- 也可以写成v-slot:header -->
            <template #header>
                <h1>我是头部</h1>
            </template>

            <template #default>
                <h1>我是主体, 且插槽并没有使用name, 所以默认就是default</h1>
            </template>
            <template #footer>
                <h1>I am footer, and my name is footer</h1>
            </template>
        </SlotUse>
    </div>
</template>
```

---

## 作用域插槽

通信:子 ---> 父

在上面的**渲染作用域**中我们讨论到，插槽的内容无法访问到子组件的状态。

然而在某些场景下插槽的内容可能想要且同时使用父组件域内和子组件域内的数据。要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。

在写法上类似于`props`:

```vue 子组件
<template>
<div class="container">
    <!-- 像props一样传递数据 -->
    <slot :data="message" :fangzi="house" />
</div>
</template>
```

```vue 父组件
<template>
    <div class="container">
        <!-- 作用域插槽接收数据 -->
        <SlotUse v-slot="slotProps">
            <h1>房子的数量: {{ slotProps.fangzi }}</h1>
            <h2>子组件向我传递的信息</h2>
            <h2>玩具:{{ slotProps.data.toy }}</h2>
            <h2>玩具数量: {{ slotProps.data.num }}</h2>
        </SlotUse>
    </div>
</template>
```

> `slotProps`是一个对象, 那么就可以使用结构赋值的方式接收数据

```vue
<template>
    <SlotUse v-slot="{ data, fangzi }">
        <h1>房子的数量: {{ fangzi }}</h1>
        <h2>子组件向我传递的信息</h2>
        <h2>玩具:{{ data.toy }}</h2>
        <h2>玩具数量: {{ data.num }}</h2>
    </SlotUse>
</template>
```

---

## 具名作用域插槽

插槽 `props` 可以作为 `v-slot` 指令的值被访问到: `v-slot:name="slotProps`

```vue 父组件
<template>
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
</template>
```

```vue
<template>
<slot name="header" message="hello"></slot>
</template>
```

> 注意插槽上的 `name` 是一个 `Vue` 特别保留的 `attribute`，不会作为 `props` 传递给插槽。因此最终 `headerProps` 的结果是 `{ message: 'hello' }`

---

## 具名插槽与默认插槽混用

如果你同时使用了具名插槽与默认插槽，则需要为默认插槽使用显式的`<template>`标签。尝试直接为组件添加 `v-slot` 指令将导致编译错误。这是为了避免因默认插槽的 `props` 的作用域而困惑。举例:

```vue
<!-- 该模板无法编译 -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message 属于默认插槽，此处不可用 -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

为默认插槽使用显式的`<template>`标签有助于更清晰地指出 `message` 属性在其他插槽中不可用:

```vue
<template>
  <MyComponent>
    <!-- 使用显式的默认插槽 -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

---

# 自定义指令

自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。

使用中需注意: 在`script`标签需要使用`vName`的变量名书写, 而在模板`template`中需要使用`v-name`的书写形式

```vue
<template>
  <input v-focus type="text"/>
</template>
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

```

> 只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令。

---

## 全局注册指令

```ts main.ts
//挂载
const app = createApp(App)
// 使 v-focus 在所有组件中都可用
app.directive("focus", {
    /* ... */
})
app.mount('#app')
```

> 注: 全局注册不需要加`v-xxx`, 而在模板中使用时, 需要加上`v-xxx`

---

## 指令钩子

一个指令定义的对象都有着几种生命周期钩子(可选)

```js
const vFocus = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

> [更多细节参考vue官网自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html)

---

# shallowReactive与shallowRef

- `shallowReactive`: 只处理对象最外层属性(根级别的属性)的响应式(浅响应式)。
- `shallowRef`: 只处理**基本数据类型**的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> `shallowReactive`.
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> `shallowRef`.
  
```js
const test = shallowReactive({
    a: {
        b: {
            c: 1
        }
    }
})
```

> `c`的改变不会触发响应式

---

# readonly 与 shallowReadonly

接受一个对象(不论是响应式还是普通的)或是一个 `ref`, 返回一个原值的只读代理

- `readonly`: 让一个响应式数据变为只读的(深只读).
- `shallowReadonly`: 让一个响应式数据变为只读的(浅只读).
- 应用场景: 不希望数据被修改时。 

```vue
<script lang='ts' setup>
import { reactive, watchEffect } from "vue";

const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})
// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!

</script>
```

---

# customRef

- 作用：创建一个自定义的 `ref`，并对其依赖项跟踪和更新触发进行显式控制。
- 使用场景: 例如, 模板更新, 先等3秒再触发更新模板

```vue 
<script lang='ts' setup>
import SlotUse from './components/SlotUse.vue'
import { customRef } from "vue";
let initValue = "你好"
const msg = customRef((track, trigger) => {
    return {
        //msg被读取时调用
        get: () => {
            //告诉Vue数据msg很重要, 你要对msg进行一个持续关注
            track();
            return initValue;
        },
        //msg被修改时调用
        set: (val: string) => {
            console.log("customRef", val);
            initValue = val;
            //通知Vue数据msg发生变化, 然后去更新模板
            trigger();
        }
    }
})
function changeCustomRef() {
    msg.value = "我是纱布"
}
</script>
```

实现防抖

```ts useTimer.ts
import { customRef } from "vue";
//实现防抖, 频繁发生事件，只执行最后一次去
export function useTimer(value: any, delay: number) {
    let timer: number;
    return customRef((track, trigger) => {
        return {
            get: () => {
                track();
                return value;
            },
            set: (newVal: string) => {
                clearTimeout(timer);
                setTimeout(() => {
                    value = newVal;
                    //通知Vue数据msg发生变化, 然后去更新模板
                    trigger() //告诉Vue去更新界面
                }, delay);
            }
        }
    })
}
```

---

# Teleport

`Teleport`是一个内置API组件

`Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

可以使用在模态框中, 因为有时一些属性可能让同级的元素受到一些影响

```vue
<template>
    <!-- 可以是body, 类选择器, ID选择器, ... -->
<teleport to="移动的位置">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
</template>
```

---

# Suspence

- 使用场景: 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

