## Set集合

- 无序: 存取的顺序不一致
- 不可重复
- 无索引

实现类

- `HashSet`: 无序, 不重复, 无索引
- `LinkedHashSet`: 有序, 不重复, 无索引
- `TreeSet`: 可排序, 不重复, 无索引

> `Set`集合API基本与[Collection](./Collection)一致

---

### 遍历方式

可使用迭代器, 增强for, Lambda

```java
public class Demo1 {
    public static void main(String[] args) {
        //多态
        Set<String> set = new HashSet<>();
        System.out.println(set.add("hello"));
        System.out.println(set.add("hello"));
        set.add("world");
        //无序
        System.out.println(set);//[world, hello]
        //遍历方式: 迭代器
        Iterator<String> it = set.iterator();
        while (it.hasNext()) {
            String str = it.next();
            System.out.println(str);
        }
        //遍历方式: 增强for循环
        for (String str : set) {
            System.out.println(str);
        }
        //遍历方式: 匿名内部类
        set.forEach(new Consumer<String>() {
            @Override
            public void accept(String s) {
                System.out.println(s);
            }
        });

        //遍历方式: lambda表达式
        set.forEach(str -> System.out.println(str));
    }
}
```

---

### HashSet

- `HashSet`: 无序, 不重复, 无索引
- `HashSet`在`JDk8`以前底层使用了数组, 链表
- 在JDK8以后, 使用了数组, 链表, 红黑树

元素存储位置的计算公式为: `int index = (数组长度 - 1) & 哈希值`

- 哈希值就是通过`hashCode()`方法计算得来的int类型的整数
- 该方法定义在`Object`类中, **默认使用地址值进行计算**
- 一般情况下, 会重写`hashCode()`方法, 利用对象内部属性计算哈希值

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Student student = (Student) o;
    return age == student.age && Objects.equals(name, student.name);
}
//重写hashCode()方法
@Override
public int hashCode() {
    return Objects.hash(name, age);
}
```

:::info
idea中直接使用快捷键就行, 不需要直接写
:::

---

对象的哈希值特点:

1. 如果没有重写`hashCode()`方法, 不同的对象计算出的哈希值是不同的
2. 重写了`hashCode()`方法, 不同的对象只要属性值相同, 计算出的哈希值就相同
3. 在小部分情况下, 不同的属性值或者不同的地址值计算出来的哈希值有可能相同(哈希碰撞)

```java
//解释3
public class Demo2 {
    public static void main(String[] args) {
        //String类内部重写了hashCode()方法, 而下面两字符串恰好计算出的哈希值相同
        System.out.println("abc".hashCode());// 96354
        System.out.println("acD".hashCode());// 96354
    }
}
```

---

#### HashSet的底层实现原理

![alt text](../img/2.JKD8以前哈希表.png)

![alt text](../img/3.JKD8以后哈希表.png)

:::tip
如果对象使用`HashSet`不重写`equals`和`hashCode`方法, 那么就默认使用地址值计算出来的哈希值进行判断HashSet是否存在重复的元素, 这时即便属性值一致, 但地址值不一致, 也会被认为是不同的对象, 进而存储到HashSet中.
:::

---

没有重写equals和hashCode方法时

```java
//没有重写equals和hashCode方法时
public class Demo3 {
    public static void main(String[] args) {
        HashSet<Student> set = new HashSet<>();
        set.add(new Student("张三", 18));
        set.add(new Student("张三", 18));
        set.add(new Student("李四", 19));
        set.add(new Student("王五", 20));
        System.out.println(set);

    }
}
```

:::tip
- 没有重写的输出: `[Student{name = 王五, age = 20}, Student{name = 张三, age = 18}, Student{name = 张三, age = 18}, Student{name = 李四, age = 19}]`
- 重写后的输出: `[Student{name = 张三, age = 18}, Student{name = 王五, age = 20}, Student{name = 李四, age = 19}]`
:::

---

### LinkedHashSet


- `LinkedHashSet`: 有序, 不重复, 无索引
- 原理: 底层数据结构依旧使用哈希表, 只有又额外的多了一个**双链表**的机制记录存储的顺序.

```java
public class Demo4 {
    public static void main(String[] args) {
        LinkedHashSet<String> lhs = new LinkedHashSet<>();
        lhs.add("a");
        lhs.add("b");
        lhs.add("c");
        lhs.add("d");

        System.out.println(lhs);
        //[a, b, c, d] --- 取出时是有序的

    }
}
```

---

### TreeSet

- 底层数据结构是红黑树
- `TreeSet`: 可排序, 不重复, 无索引

```java
//遍历方式
public class Demo5 {
    public static void main(String[] args) {
        TreeSet<Integer> ts = new TreeSet<Integer>();
        ts.add(5);
        ts.add(3);
        ts.add(1);
        ts.add(4);
        ts.add(2);

        System.out.println(ts);
        //[1, 2, 3, 4, 5]
        //遍历方式
        Iterator<Integer> it = ts.iterator();
        while (it.hasNext()) {
            Integer i = it.next();
            System.out.println(i);
        }
        System.out.println("-------------------");
        for (Integer i : ts) {
            System.out.println(i);
        }
        System.out.println("-------------------");
        ts.forEach(i -> System.out.println(i));
    }
}
```

---

#### TreeSet的排序规则

- 数值类型: `Integer`, `Double`, 默认按照从小到大的顺序进行排序
- 字符, 字符串类型: 按照字符的`ASCII`码值进行排序

:::code-group
```java [字符串类型比较]
public class Demo1 {
    public static void main(String[] args) {
        TreeSet<String> ts = new TreeSet<>();

        ts.add("aa");
        ts.add("ab");
        ts.add("abb");
        System.out.println(ts);
        //输出结果: [aa, ab, abb]
    }
}
```

```java [数值类型比较]
public class Demo5 {
    public static void main(String[] args) {
        TreeSet<Integer> ts = new TreeSet<Integer>();
        ts.add(5);
        ts.add(3);
        ts.add(1);
        ts.add(4);
        ts.add(2);

        System.out.println(ts);
        //[1, 2, 3, 4, 5]
        //遍历方式
        Iterator<Integer> it = ts.iterator();
        while (it.hasNext()) {
            Integer i = it.next();
            System.out.println(i);
        }
        System.out.println("-------------------");
        for (Integer i : ts) {
            System.out.println(i);
        }
        System.out.println("-------------------");
        ts.forEach(i -> System.out.println(i));
    }
}

```
:::

:::tip 举例
1. `aa`与`ab`, 两者第一位都是`a`, 那么则会比较第二位, 而第二位`a < b`, 则`ab`大排在后面
2. `aa`与`aab`, 两者前二位相同, 而到第三位的时候, 字符串1后面没有了, 那么默认按照`aab`大排在后面

总结: 字符与字符串的比较方式, 是两个字符按照`ASCII`码值从左到右一一比较, 相等则两者都向右移动一位
:::

---

#### 对象类型作为TreeSet的泛型

```java
public class Demo1 {
    public static void main(String[] args) {

        Student s1 = new Student("zhangsan", 23);
        Student s2 = new Student("lisi", 24);
        Student s3 = new Student("wanwu", 25);

        TreeSet<Student> ts = new TreeSet<>();
        ts.add(s1);// [!code error]
        ts.add(s2);
        ts.add(s3);
        System.out.println(ts);
    }
}
```

:::danger 最终会报错
`Exception in thread "main" java.lang.ClassCastException: class knowSet.Student cannot be cast to class java.lang.Comparable`

`TreeSet`的泛型类型必须是实现`Comparable`接口的类, 因为自定义对象类型并没有比较大小的规则, 所以对此我们需要实现`Comparable`接口
:::

#### 比较方式1实现`Comparable`接口

:::code-group
```java [实现接口形式一]
//Comparable<E>, 中的E指的是要比较的是谁, 同时也对应着compareTo的第一个参数类型
public class Student implements Comparable<Student> {

    @Override
    public int compareTo(Student o) {
        return 0;
    }
}
```

```java [实现接口形式二]
public class Student<E> implements Comparable<E> {
    @Override
    public int compareTo(E o) {
        return 0;
    }
}
```
:::

:::tip
如果已经知道要比较的对象类型，那么可以直接使用**形式一**; 反之使用**形式二**
:::

:::code-group
```java [javabean类]
//javabean类
public class Student implements Comparable<Student> {
    private String name;
    private int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    /* getter setter */

    public String toString() {
        return "Student{name = " + name + ", age = " + age + "}";
    }

    @Override
    public int compareTo(Student o) {
        //this: 当前需要添加的元素
        //o: 已经添加到红黑树中的元素
        //返回值规则
        //返回负数: 认为要添加的元素是小的, 存左边
        //正数: 认为哟添加的元素是大的, 存右边
        //0: 认为要添加的元素已经存在, 舍弃
        int result = this.getAge() - o.getAge();
        return result;
    }
}
```

```java [测试]
public class Demo1 {
    public static void main(String[] args) {

        Student s1 = new Student("zhangsan", 23);
        Student s2 = new Student("lisi", 24);
        Student s3 = new Student("wanwu", 25);
        Student s4 = new Student("zhaoliu", 26);

        TreeSet<Student> ts = new TreeSet<>();
        ts.add(s1);
        ts.add(s2);
        ts.add(s3);
        ts.add(s4);
        System.out.println(ts);
        //返回结果: [Student{name = zhangsan, age = 23}, Student{name = lisi, age = 24}, Student{name = wanwu, age = 25}, Student{name = zhaoliu, age = 26}]
    }
}
```
:::

:::tip 提示
- `this`: 当前需要添加的元素
- `o`: 已经添加到红黑树中的元素
- 返回值规则
  - **返回负数**: 认为要添加的元素是小的, 存左边
  - **正数**: 认为哟添加的元素是大的, 存右边
  - **0**: 认为要添加的元素已经存在, 舍弃
- 第一次调用`compareTo()`是当前元素与自己去比较, 自己与自己比较, 那么返回值一定是`0`, 这时集合中没有元素, 因此会添加. 这时一个例外, 与返回值的第三条规则不同.
:::

---

#### 比较方式2比较器

比较器的使用需要提及到`TreeSet`的二个构造方式`TreeSet(Comparator<? super E> comparator)`, 而`Comparator`是一个函数式接口

```java 
public class Demo2 {
    public static void main(String[] args) {
        //需求1: 字符串按照长度排序, 如果一样长则按照字母排序
        TreeSet<String> ts = new TreeSet<>(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                //o1:  当前需要添加的元素
                //o2: 已经添加到集合中的元素
                int result = o1.length() - o2.length();
                //如果长度一致按照原来字符串的排序形式(String内部已经实现了Comparable接口也重写了compareTo方法)排序, 否则先按照长度进行排序
                return result == 0 ? o1.compareTo(o2) : result;
            }
        });

        // 也可以使用lambda表达式
        /*
                TreeSet<String> ts = new TreeSet<>((o1, o2) -> {
                //o1:  当前需要添加的元素
                //o2: 已经添加到集合中的元素
                int result = o1.length() - o2.length();
                //如果长度一致按照原来字符串的排序形式(String内部已经实现了Comparable接口也重写了compareTo方法)排序, 否则先按照长度进行排序
                return result == 0 ? o1.compareTo(o2) : result;

        });
        */
        
        ts.add("123");
        ts.add("1234");
        ts.add("123456");
        ts.add("1235");
        System.out.println(ts);
        //输出结果为: [123, 1234, 1235, 123456]
    }
}
```

:::tip 如何选择比较方式
首选第一种比较方式, 如果第一种比较方式不可以满足我们的需要就使用第二种

不满足的情况例如: 字符串的排序规则Java已经帮我们写好了, 如果我想要按照长度排序, 我不可能去手动更改源码. 而且String类是
最终类无法继承, 若不使用比较器`Comparator`, 就无计可施了.

如果比较方式一和比较方式二都存在, 则以方式二为准. 例如, `String`类已经在内部定义好了比较规则, 而我们定义了`Comparator`比较对象, 最终是按照`Comparator`比较规则排序.
:::

---