## 对pinia的理解

`pinia`是一个集中式状态(数据)管理, 他与`redux`、`vuex`对标.

组件与组件之间将**需要共享的数据**放在集中式管理中

> `git`是分布式控制系统

## 安装和注册

```bash
npm install pinia
```

```ts
import { createApp } from 'vue'

import App from './App.vue'
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App)
//挂载
app.use(pinia);
app.mount('#app')
```

> 配置好之后, 可以在**vue开发者工具**中看见.
>
> `pinia`像`vuex`一样, 大部分文件写在`store`文件夹中


## 创建store

`state`是存放数据的地方. 在`pinia`中拿到的数据**可以直接进行修改**, 而在`vuex`中数据必须在特定的方法中调用才可以修改, 并且开发者工具中也会有着呈现

1. 创建一个`store`

```ts
import { defineStore } from "pinia";
//官方建议使用hooks这种方式命名, usexxx. 而状态管理中最好使用use + 功能名 + store
export const useSumStore = defineStore("sum", {
    //储存数据的地方
    state: () => {
        //最好返回一个对象形式的结果, 如果是数组则在引用上会出一些问题
        return {
            sum: 9
        };
    }, 
})
```

2. 在一个组件中使用该 `store`

```vue
<script lang='ts' setup>
import { ref } from "vue";
import { useSumStore } from "../store/sum";
const sumStore = useSumStore();
console.log(sumStore);
// console.log(sumStore.sum.value);乃是错误写法, 具体参考下方注意点
//以下两种都可以拿到数据
console.log(sumStore.sum);//正确写法 9
console.log(sumStore.$state.sum);

const number = ref<number>(1);

const addSum = () => {
    //pinia拿到的数据直接就可以进行修改
    sumStore.sum += number.value;
}

const subtractSum = () => {
    sumStore.sum -= number.value;
}
</script>
```

> `sumStore.$state`就是数据`Proxy(Object) {sum: 9}`

![ref的小细节](img/25.ref的小细节.png)

---

## 使用注意点

```vue
<script lang='ts' setup>
import { ref, reactive } from "vue";
//如果直接就是写在外侧的需要 .value
let x = ref(0);
//在reactive里的ref会自动帮你拆包
const test = reactive({
    a: 1,
    b: 2,
    c: ref(2)
})
console.log(test.a);
console.log(test.b);
console.log(test.c);//正确写法
console.log(x.value)
// console.log(test.c.value);//报错
</script>
```

![ref的小细节](img/25.ref的小细节.png)

---

## 修改state数据的方式

1. 直接修改

```vue
<script lang='ts' setup>
import { useSumStore } from "../store/sum";
const sumStore = useSumStore();
const number = ref<number>(1);
const addSum = () => {
    //pinia拿到的数据直接就可以进行修改
    sumStore.sum += number.value;
}
const subtractSum = () => {
    sumStore.sum -= number.value;
}
</script>
```

---

2. (推荐使用)使用`$patch`

```ts Sum.vue
import { useSumStore } from "../store/sum";
const sumStore = useSumStore();
sumStore.$patch({
    sum: 888
})
```

> 两者区别在于, 开发者工具中的呈现不一致

3. 使用`actions`配置

首先在`store`中添加配置

```ts
//与vuex的actions差不多 里面放置的是一个一个的动作函数, 用于响应组件的动作
actions: {
    //名字是自定义的, 如果叫xiaoxiaowang, 那么就使用sumStore.xiaoxiaowang(...)
    increment(val: any) {//val值是自定义的, 传什么数据接什么数据, 传递值为1, 那么val就是1
        console.log("incremnet的val", val);
        //修改数据(this就是当前的store, 说白点就是useSumStore)
        this.sum += val;
    }
}
```

开始修改值

```ts
sumStore.increment(number.value);
```

---

## storeToRefs

在模板当中使用`sumStore.xxx`往往有点复杂, 这时我们就会想到使用解构赋值`const { ... } = xxx`,
当响应式对象如果直接进行解构就会失去响应式功能, 可能我们会想到`toRefs`. 虽然`toRefs`可以实现我们想要的功能,
但是代价可能会有些大, `toRefs`会对此`store`的数据、**方法**都添加了响应式. 而`pinia`对此提供了一个方法`storeToRefs`, 此方法只会对**store中的数据**添加响应式的功能, 不会对方法进行包裹.

```ts
const sumStore = useSumStore();
//使用toRefs进行包裹
const { sum, school, address } = toRefs(sumStore);
// console.log(toRefs(sumStore));
```

![对store使用toRefs](img/26.对store使用toRefs.png)

正确使用

```ts
import { storeToRefs } from "pinia";
const sumStore = useSumStore();
const { sum, school, address } = storeToRefs(sumStore);
```

![storeToRefs](img/27.storeToRefs的使用.png)

---

## state, actions, getters

- `state` -- 存放数据的地方, 相当于`data`.
- `actions` -- 放置的是一个一个的动作函数, 用于响应组件的动作, 相当于`methods`
- `getters` -- 相当于计算属性`computed`中的`getter`形式


```ts
import { defineStore } from "pinia";
//官方建议使用hooks这种方式命名, usexxx. 而状态管理中最好使用use + 功能名 + store
export const useSumStore = defineStore("sum", {
    //储存数据的地方
    state: () => {
        return {
            sum: 9,
            school: "汉口学院",
            address: "武汉"
        };
    }, 
    //与vuex的actions差不多 里面放置的是一个一个的动作函数, 用于响应组件的动作
    actions: {
        increment(val: any) {
            console.log("incremnet的val", val);
            //修改数据(this就是当前的store, 说白点就是useSumStore)
            this.sum += val;
        },
    },
    getters: {
        bigSum(state) {// 如果想要使用this, 记得不要使用箭头函数
            // this指向store
            console.log("getters中的", this);
            return state.sum * 100;
            // return this.sum * 10
        }
    }
})
```

```vue
<template>
    <div class="sum">
        <h1>当前和为: {{ sum }} -- 放大的和: {{ bigSum }}</h1>
        <h1>学校坐落于: {{ school }}</h1>
        <h1>学校地址: {{ address }}</h1>
        <ul class="sum_list">
            <li class="sum_item">
                <select v-model.number="number">
                    <option value="0">请选择数字</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </li>
            <li class="sum_item"><button @click="addSum">点我加</button></li>
            <li class="sum_item"><button @click="subtractSum">点我减</button></li>
        </ul>
    </div>
</template>

<script lang='ts' setup>
import { ref, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useSumStore } from "../store/sum";

const sumStore = useSumStore();
// bigSum是getter提供的属性, 直接引入使用即可
const { sum, school, address, bigSum } = storeToRefs(sumStore);
const number = ref<number>(1);
const addSum = () => {
    //修改数据方法1
    // sumStore.sum += number.value;
    //修改数据方法2 patch碎片, 传递碎片信息, 
    // sumStore.$patch({
    //     sum: 888
    // })
    //修改数据方法3 提前在store中配置actions属性, 并添加一个函数increment(自己取得)
    sumStore.increment(number.value);
    sumStore.$patch({
        school: "湖北水利水电职业技术学院",
        address: "湖北"
    })
}
const subtractSum = () => {
    sumStore.sum -= number.value;
}
</script>
```

---

## $subscribe订阅

- 作用以及写法都非常像`watch`监视.
- 作用: 侦听`state`及其变化。

```vue
<script lang='ts' setup>
import { storeToRefs } from "pinia";
import { useLoveWordStore } from "../store/loveWord";
const loveWordStore = useLoveWordStore();
const { talkList } = storeToRefs(loveWordStore)

//很像watch监视
loveWordStore.$subscribe((mutation, state) => {
    //state就是最近的结果
    console.log(mutation, state);
    //本地存储只可以存储字符串类型, 如果是其他类型, 底层会调用toString()
    localStorage.setItem("talkList", JSON.stringify(state));
})
```

![mutation和state参数](img/28.mutation和state参数.png)

```ts
import { defineStore } from "pinia";

export const useLoveWordStore = defineStore("love-word", {
    state: () => {
        return {
            talkList: JSON.parse(localStorage.getItem("talkList") as string) || []
        }
    }
})
```

---

## Setup Store组合式写法

与 Vue 组合式 API 的 setup 函数 相似

在`Setup Store`中:

- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

```ts
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
export const useSumStore = defineStore("sum", () => {
    const talkList = reactive({
        sum: 9,
        school: "汉口学院",
        address: "武汉"
    })

    const bigSum = computed(() => {
        return talkList.sum * 10;
    })

    function increment(val: number) {
        console.log(val);
        
        talkList.sum += val;
    }
    return { talkList, bigSum, increment }
})
```

```ts
import { useSumStore } from "../store/sum";
import { storeToRefs } from "pinia";
const sumStore = useSumStore();
const { talkList, bigSum } = storeToRefs(sumStore);
```

> 需注意: 组合式的`sum`, `school`, `address`无法直接通过解构的方式引用




