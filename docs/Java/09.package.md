## 包名

包就是文件夹, 用来管理不同功能的java类

报名的规则: **公司域名反写 + 包的作用, 需要全部英文小写, 见名知意.** 例如: `com.litlewang.domain`

---

## 全类名

全类名 = 包名 + 类名

例如: `com.litlewang.domain.Student`

一般在编写代码时, 都是直接写类名, 而编译器默认为我们导包了, 所以不用写全类名.

```java
import com.littlewang.domain.Student;// [!code ++]
//全称写法
public class Test {
    public static void main(String[] args) {
        //编写起来太麻烦了, 不建议
        com.littlewang.domain.Student stu = new com.littlewang.domain.Student();// [!code --]
        Student student = new Student();// [!code ++]
    }
}
```

---

## 导包的规则

- 使用同一个包中的类时, 不需要导包
- 使用`java.lang`包中的类时, 不需要导包
- 使用其他包中的类时, 需要导包
- 使用其他包中的类时, 如果类名冲突, 需要使用全类名

:::code-group
```java [1]
//已知com.littlewang.domain包中有一个类Student
package com.littlewang.domain;

public class Test {
    public static void main(String[] args) {
        //本包的Student类, 不需要导包
        Student student = new Student();
    }
}
```

```java [2]
package com.littlewang.domain;

public class Test {
    public static void main(String[] args) {
        //可查看String源码的第一行
        String str = "我是java.lang包中的";
        System.out.println(str);
        //最终也没有导包, 因为java.lang包是默认导包的
    }
}
```

```java [3]
package com.littlewang.domain;
//导包
import a01oopPolymorphismDemo1.Person;// [!code highlight]

public class Test {
    public static void main(String[] args) {
        //Person类不来自本包, 需要导包
        Person person = new Person();
    }
}
```

```java [4]
package com.littlewang.domain;

public class Test {
    public static void main(String[] args) {
        Student student = new Student();
        //使用其他包的Student类, 如果类名冲突, 需要使用全类名
        a01oopPolymorphismDemo1.Student student1 = new a01oopPolymorphismDemo1.Student();
    }
}
```
:::


