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