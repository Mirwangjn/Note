## toRefs

- 把`reactive`所定义的对象中的每一个`key-value`变为一个个的`ref`响应式对象, 并且与原来的reactive对象是相关联的
- 返回一个新对象, 且对象中的属性都是`ref`响应式对象
- 函数使用`toRefs(reactive响应式对象)`

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
