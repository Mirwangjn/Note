## Collection

`Collection`是一个接口, 无法直接创建对象使用, 需要通过实现类来使用

![集合类体系结构图](../img/1.%20集合类体系结构图.png)

- `Collection`集合概述

  - 是单例集合的顶层接口,它表示一组对象,这些对象也称为`Collection`的元素
  - `JDK` 不提供此接口的任何直接实现.它提供更具体的子接口(如`Set`和`List`)实现

- 创建`Collection`集合的对象

  - 多态的方式
  - 具体的实现类`ArrayList`

### 基本方法

| 方法名                     | 说明                               |
| :------------------------- | :--------------------------------- |
| boolean add(E e)           | 添加元素                           |
| boolean remove(Object o)   | 从集合中移除指定的元素             |
| boolean removeIf(Object o) | 根据条件进行移除                   |
| void   clear()             | 清空集合中的元素                   |
| boolean contains(Object o) | 判断集合中是否存在指定的元素       |
| boolean isEmpty()          | 判断集合是否为空                   |
| int   size()               | 集合的长度，也就是集合中元素的个数 |


基本使用

```java
import java.util.ArrayList;
import java.util.Collection;

public class Demo1 {
    public static void main(String[] args) {
        //Collection是一个接口,如果想要使用, 就需要实现类配合实现多态的效果才可以使用
        Collection<String> coll = new ArrayList<>();

        coll.add("wang");
        coll.add("jia");
        coll.add("nian");

        coll.remove("jia");

        boolean flag = coll.contains("wang");
        System.out.println(flag);

        coll.clear();
        boolean empty = coll.isEmpty();
        System.out.println(empty);
        System.out.println(coll);
    }
}
```

---

#### `contains`方法的比较方式

在ArrayList集合中, `contains`方法默认情况下, 是根据元素的`equals()`方法进行比较的。

:::details 源码细节
```java
public boolean contains(Object o) {
        return indexOf(o) >= 0;
}

public int indexOf(Object o) {
    return indexOfRange(o, 0, size);
}

int indexOfRange(Object o, int start, int end) {
    Object[] es = elementData;
    if (o == null) {
        for (int i = start; i < end; i++) {
            if (es[i] == null) {
                return i;
            }
        }
    } else {
        for (int i = start; i < end; i++) {
            if (o.equals(es[i])) {// [!code focus]
                return i;
            }
        }
    }
    return -1;
}
```
:::


```java
//Student类没有重写equals()
import java.util.ArrayList;
import java.util.Collection;

public class Demo2 {
    public static void main(String[] args) {

        Collection<Student> list = new ArrayList<>();

        list.add(new Student("zhangsan", 21));
        list.add(new Student("lisi", 25));
        list.add(new Student("wangwu", 30));
        list.add(new Student("zhangsan", 21));

        boolean result = list.contains(new Student("zhangsan", 21));
        //Student类没有重写equals方法, 那么默认使用的就是继承下来的方法, 默认就是比较地址值
        System.out.println(result);// false
    }
}
```

:::tip
`Student`类没有重写equals方法, 那么默认使用的就是继承下来的方法, **默认就是比较地址值**. 重写`equals`方法用于比较属性值
:::

---

### Collection的遍历方式

#### 迭代器

迭代器常用方法:

| 方法名              | 说明                                       |
| :------------------ | :----------------------------------------- |
| `boolean hasNext()` | 判断集合中是否还有元素可以取出             |
| `E next()`          | 返回指针指向的元素，并且指针指向下一个元素 |
| `void remove()`     | 删除指针指向的元素，并且指针指向下一个元素 |

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class Demo1 {
    public static void main(String[] args) {
        // 创建一个存储字符串的集合
        Collection<String> coll = new ArrayList<>();
        // 向集合中添加三个字符串
        coll.add("hello");
        coll.add("world");
        coll.add("java");

        // 创建一个迭代器，用于遍历集合
        Iterator<String> it = coll.iterator();
        // 遍历集合中的每个元素
        while (it.hasNext()) {
            // 获取指针指向的元素, 并且移动指针指向下一个元素
            String str = it.next();
            // 输出当前元素
            System.out.println(str);
        }
        //1. 报错NoSuchElementException
        it.next();// [!code --]

        System.out.println("-------------------");
        //如果需要第二次遍历集合的元素, 就需要获取一个新的遍历器对象
        Iterator<String> it2 = coll.iterator();
        while (it.hasNext()) {
            if("333".equals(it.next())) {
                it.remove();// [!code highlight]
            }
        }
    }
}

```

:::tip
1. 迭代器遍历集合时, 指针所指向的位置越界, 还强制访问会报错`NoSuchElementException`
2. 迭代器遍历完毕后, 指针不会复位, 如果想要再次遍历就需要重新获取迭代器对象
3. 循环中只使用一次`next()`, 如果集合数量是奇数, 那么多次使用会报错`NoSuchElementException`, 导致越界访问
4. 迭代器遍历时, **不能使用集合的方法**进行增加和删除
:::

---

#### 增强for循环

- 增强`for`底层就是迭代器, 为了简化迭代器的书写
- `JDK5`之后出现, 其内部就是一个迭代器
- 所有的单列集合和数组才能用增强`for`循环

格式: `for(集合/数组的数据类型 变量名 : 集合/数组名) {}`

```java
import java.util.ArrayList;
import java.util.Collection;

public class Demo3 {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();

        coll.add("111");
        coll.add("222");
        coll.add("333");
        coll.add("444");
        coll.add("555");
        //str相当于一个第三方变量, 在循环的过程中依次表示每一个数据
        for(String str: coll) {
            System.out.println(str);
        }
    }
}
```

:::tip
可使用`集合.for`快捷键一件生成循环代码
:::

---

#### Lambda表达式遍历

| 方法名                                             | 说明                             |
| :------------------------------------------------- | :------------------------------- |
| `default void forEach(Consumer<? super E> action)` | 对集合中的每个元素执行指定的操作 |


注: `Consumer`是一个函数式接口

```java
public class Demo3 {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();
        coll.add("111");
        coll.add("222");
        coll.add("333");
        coll.add("444");
        coll.add("555");
        //1. 使用匿名内部类
        coll.forEach(new Consumer<String>() {
            //s依次表示集合中的每一个数据
            @Override
            public void accept(String s) {
                System.out.println(s);
            }
        });
        //Lambda表达式
        coll.forEach((String s) -> {
            System.out.println(s)
        });
        //Lambda表达式删减版, 类型可以省略, 只有一个参数小括号可以省略, 只能一句话{}可以省略
        coll.forEach(s -> System.out.println(s));

    }
}

```

---