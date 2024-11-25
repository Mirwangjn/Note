# Java

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