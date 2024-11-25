# Java

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

---