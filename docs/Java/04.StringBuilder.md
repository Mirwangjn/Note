## StringBuilder介绍

`StringBuilder`可以看成是一个容器，创建之后里面的内容是可变的。

:::details
使用场景: 当我们在拼接字符串和反转字符串的时候会使用到
:::


基本使用
```java
public class StringBuilderDemo3 {
    public static void main(String[] args) {
        //1.创建对象
        StringBuilder sb = new StringBuilder("abc");// [!code highlight]

        //2.添加元素
        /*sb.append(1);
        sb.append(2.3);
        sb.append(true);*/

        //反转
        sb.reverse();

        //获取长度
        int len = sb.length();
        System.out.println(len);


        //打印
        //普及：
        //因为StringBuilder是Java已经写好的类
        //java在底层对他做了一些特殊处理。
        //打印对象不是地址值而是属性值。
        System.out.println(sb);
    }
}
```

---

## StringBuilder的扩容标准

1. 默认创建一个长度为`16`的字节数组
2. 添加的内容小于16, 直接存储
3. 添加的内容大于16会扩容(老容量 * 2 + 2)
4. 如果扩容之后还不够, 就会以实际长度为准

---

## 方法

| 方法名                                                     | 作用|
| --------------------------------------------------------- | ----|
| public StringBuilder append(String str)                   | 添加字符串|
| public StringBuilder reverse()                           | 反转字符串|
| public StringBuilder insert(int offset, String str)      | 在指定位置插入字符串|
| public StringBuilder delete(int start, int end)          | 删除指定位置的字符串|
| public StringBuilder replace(int start, int end, String str) | 替换指定位置的字符串|
| public String toString()                                 | 将StringBuilder转换为String|
| public int length()                                     | 获取字符串的长度|
| public int capacity()                                   | 获取容量|

``````