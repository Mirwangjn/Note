## Math

- `Math`是一个`工具类`, 所以它的方法可以通过**类名.方法名**调用

### 属性

| 类型 | 属性名 | 说明 |
| ------------- | :-----------: | ----: |
| `static double`      | `E` | 数学中的`E` |
| `static double`      | `PI` | 数学中的`PI` |    

---

### 方法

| 类型 | 方法名 | 说明 |
| ------------- | :-----------: | ----: |
| `static int`      | `abs(int a)` | 返回`int`值的绝对值 |
| `static double`      | `ceil(double a)` |  |
| `static double`      | `floor(double a)` |  |
| `static int`      | `max(int a, int b)` | 返回`int`类型的最大值 |
| `static int`      | `min(int a, int b)` | 返回`int`类型的最小值 |
| `static double`      | `random()` | 返回带正号的`double`值，该值`[0.0, 1.0)` |
| `static long` | `round(double a)` | 四舍五入 |

```java
package Math;

public class Demo1 {
    public static void main(String[] args) {
        System.out.println(Math.PI);//3.14159265358979323846
        System.out.println(Math.E);//2.7182818284590452354

        System.out.println(Math.abs(-11));//11

        System.out.println(Math.ceil(1.5));// 2.0
        System.out.println(Math.ceil(-1.5));// -1.0

        System.out.println(Math.floor(1.5));//1
        System.out.println(Math.floor(-1.5));//-2.0

        System.out.println(Math.max(1, 2));//2
        System.out.println(Math.min(1, 2));//1

        System.out.println(Math.random());

        System.out.println(Math.round(1.6));//2
        System.out.println(Math.round(1.1));//1
    }
}
```

---

## System

- `System`是一个`工具类`, 提供了一些与系统相关的方法

### 方法

| 类型 | 方法名 | 说明 |
| ------------- | :-----------: | :----: |
| `static void`      | `exit(int status)` | 终止当前运行的Java虚拟机，非零表示异常终止 |
| `static long`      | `currentTimeMillis()` | 返回当前时间(以毫秒为单位) |
| `static void`      | `arraycopy(数据源数组, 起始索引, 目的地数组, 起始索引, 拷贝个数)` | 将数组从指定源数组复制到目标数组 |

:::details `currentTimeMillis`的使用场景
`currentTimeMillis`可以测试当前程序运行时间的毫秒值

```java 
public class Test1 {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();// [!code highlight]
        for (int i = 0; i < 10000; i++) {
            boolean flag = isPrime(i);
            if(flag) {
                System.out.println(i);
            }
        }

        long end = System.currentTimeMillis();// [!code highlight]
        System.out.println(end - start);
    }
    //判断number是不是质数(只能被1和背身整除的数)
    public static boolean isPrime(int number) {
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if(number % i == 0) {
                return false;
            }
        }
        return true;
    }
}
```
:::

---

#### `arraycopy`使用与基本类型

1. 如果数据源数组与目的地数组都是基本类型数组, 那么数据源数组与目的地数组的数据类型必须一致, 否则会报错.
2. 在拷贝的时候需要考虑数组的长度, 如果超出范围就会报错.

:::code-group
```java [基本类型]
public class Test2 {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3, 4, 5, 6};
        int[] arr2 = new int[10];
        //1. 目标源
        //2. 源数组起始索引
        //3. 目标数组
        //4. 目标数组起始索引
        //5. 拷贝个数
        System.arraycopy(arr1, 0, arr2, 0, 2);// {1, 2, 0, 0, 0, 0, 0, 0, 0, 0}
    }
}
```

```java [类型不一致的情况]
public class Test2 {
    public static void main(String[] args) {
        //如果数据源数组与目的地数组都是基本类型数组, 那么数据源数组与目的地数组的数据类型必须一致, 否则会报错.
        int[] arr1 = {1, 2, 3, 4, 5, 6};
        double[] arr3 = new double[10];
        System.arraycopy(arr1, 0, arr3, 0, 3);//报错can not copy int[] into double[] // [!code error]
    }
}
```
:::

---

#### `arraycopy`使用与引用类型

---

## Runtime

`Runtime`的构造方法私有化了, 不可以直接`new`, 而是需要`getRuntime`方法获取当前系统的运行环境对象

| 类型 | 方法名 | 说明 |
| ------------- | :-----------: | :----: |
| `public static`      | `Runtime getRuntime()` | 当前系统的运行环境对象 |
| `public void`      | `exit(int status)`  | 停止虚拟机 |
| `public int`      | `availableProcessors()` | 获得CPU的线程数 |
| `public long`      | `maxMemory()` | JVM能从系统中获取总内存大小(单位byte) |
| `public long`      | `totalMemory()` | JVMn已经从系统中获取的内存大小(单位byte) |
| `public long`      | `freeMemory()` | Java虚拟机中的剩余内存量 |
| `public Process`      | `exec(String command)` | 执行`cmd`命令 |

```java
public class Test2 {
    public static void main(String[] args) {
        Runtime r1 = Runtime.getRuntime();
        Runtime r2 = Runtime.getRuntime();
        System.out.println(r1 == r2);// true

        //System.exit方法底层调用的就是下列语句
        Runtime.getRuntime().exit(0);
        System.out.println("我不会执行");
    }
}
```

---

## object和Objects

`object`是所有类的父类

构造方法:

| 类型 | 方法名 | 说明 |
| ------------- | :-----------: | :----: |
| `public`      | `Object()` | 默认构造方法 |

方法:

| 类型 | 方法名 | 说明 |
| ------------- | :-----------: | :----: |
| `public String`      | `toString()` | 返回对象的字符串表示形式 |
| `public boolean`      | `equals(Object obj)` | 比较两个对象是否相等 |
| `protected Object` | `clone()` | 创建此对象的一个新实例 |

---

### toString

```java
package Test;
public class Test3 {
    public static void main(String[] args) {
        Person person = new Person("wjn", 18);
        System.out.println(person.toString());// Test.Person@6e8dacdf
    }
}
```

:::details toString
`Test`是包名; `Person`是类名; `@`作为一个分隔符; `6e8dacdf`是hashCode值, 也就是地址值.

因为`Person`类并没有`toString`方法, 而任何类都默认直接或者间接继承`Object`类, 因此使用的是`Object`类的`toString()`方法.

```java
// Object类中默认的toString方法
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```
:::

---

如果`toString`方法不能满足我们的要求, 就可以重写`toString`方法, 输出本类的信息

:::code-group
```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java
public class Test3 {
    public static void main(String[] args) {
        Person person = new Person("wjn", 18);
        // Person{name='wjn', age=18}
        System.out.println(person.toString());
    }
}
```
:::

---

### equals

`equals`方法默认比较的是两个对象的地址值, 而不是内容值, 如果默认`equals`方法不能满足需求就可以重写比较两个对象的内容值

```java
public class Test3 {
    public static void main(String[] args) {
        Person person1 = new Person("wjn", 18);
        Person person2 = new Person("wjn", 18);
        //两个对象各自开辟了不同的空间, 因此返回false
        System.out.println(person1.equals(person2));//false

    }
}
```

:::details 比较内容值
```java
@Override
    public boolean equals(Object o) {
        //例如: person1.equals(person1) ==> true
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age &&
                Objects.equals(name, person.name);
    }
```
:::

---

### clone

`clone`方法默认是浅拷贝, 如果需要深拷贝, 就需要重写`clone`方法.

- 浅拷贝: 拷贝对象中的基本类型数据, 拷贝对象中的**引用类型数据地址值**
- 深拷贝: 拷贝对象中的基本类型数据, 拷贝引用类型的数据并额外开辟一块空间存放这些数据. 特殊的是**字符串**, 因为直接赋值的字符串是存放在串池中的, 而再次为一个变量赋值时, 会去串池中寻找该字符串, 如果串池中有, 则直接返回串池中的地址值.

:::details
- 浅拷贝: 不管对象内部的属性时基本类型数据还是引用类型数据都完全拷贝过来
- 深拷贝: 基本数据类型拷贝过来, 字符串复用, 引用数据类型会重新创建新的
:::


:::code-group
```java
public class Test3 {
    public static void main(String[] args) throws CloneNotSupportedException {
        Person person = new Person("wjn", 18);

        Person clone = (Person) person.clone();
        System.out.println(person);// Person{name='wjn', age=18} // [!code highlight]
        System.out.println(clone);// Person{name='wjn', age=18} // [!code highlight]
    }
}
```

```java
//如果一个接口里面没有任何的抽象方法, 则称此接口为标记接口
public class Person implements Cloneable {
    private String name;
    private int age;

    public Person() {
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age &&
                Objects.equals(name, person.name);
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        //调用父类的clone方法
        return super.clone();
    }
}
```
:::

:::tip 书写细节
1. 重写Object类中的clone方法
2. 让javabean实现Cloneable接口
3. 调用clone方法
:::

深拷贝:

```java 引入第三方Gson包
public class Test3 {
    public static void main(String[] args) throws CloneNotSupportedException {
        Person person = new Person("wjn", 18);
        Gson gson = new Gson();
        //把对象变成字符串
        String str1 = gson.toJson(person);
        Person person2 = gson.fromJson(str1, Person.class);

        
    }
}
```

---

## Objects

Objects是一个工具类

| 方法名 | 作用 |
| --- | --- |
| `equals(Object a, Object b)` | 比较两个对象是否相等 |
| `isNull(Object obj)` | 判断对象是否为null |
| `nonNull(Object obj)` | 判断对象是否不为null |

```java
import java.util.Objects;// [!code ++]

public class Test4 {
    public static void main(String[] args) {
        //有时person1这个对象可能不是自己写的
        Person person1 = null;
        Person person2 = new Person("wjn", 18);
        //运行时会报错Method invocation 'equals' will produce 'NullPointerException'
        System.out.println(person1.equals(person2));

        Objects.equals(person1, person2);// false 不会报错 // [!code ++]
    }
}
```

:::details Objects.equals源码
```java
    public static boolean equals(Object a, Object b) {
        return (a == b) || (a != null && a.equals(b));
    }
```
:::








