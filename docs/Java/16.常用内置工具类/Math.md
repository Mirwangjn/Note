# Java

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