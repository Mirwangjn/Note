# Java

## Arrays

Arrays是一个工具类

| 方法名 | 作用 |
| --- | --- |
| `static String toString(Object[] a)` | 数组转字符串 |
| `static void sort(Object[] a)` | 数组排序 |
| `static Object[] copyOf(Object[] original, int newLength)` | 数组拷贝, 返回新数组 |
| `copyOfRange(Object[] original, int from, int to)` | 数组拷贝 |
| `fill(Object[] a, Object val)` | 数组填充 |
| `binarySearch(Object[] a, Object key)` | 二分查找, 返回索引 |
| `asList(Object[] a)` | 数组转List |
| `sort(Object[] a, Comparator<? super Object> c)` | 数组排序 |


```java
import java.util.Arrays;

public class Demo1 {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        String str = Arrays.toString(arr);
        System.out.println(str);// [1, 2, 3, 4, 5]
        int[] arr2 = {3, 1, 7, 6, 9, 0, 3};
        Arrays.sort(arr2);
        System.out.println(Arrays.toString(arr2));// [0, 1, 3, 3, 6, 7, 9]

        int[] arr3 = {3, 1, 7, 6, 9, 0, 3};
        //返回新数组
        int[] newArr = Arrays.copyOf(arr3, 5);
        System.out.println(Arrays.toString(newArr));// [3, 1, 7, 6, 9]
        //binarySearch: 二分查找元素
        //细节1: 查找的数组必须是有序的, 并且还是升序的
        //细节2: 如果查找的元素是存在的, 则返回真实的索引
        // 如果查找的元素不存在, 返回 (-插入点 - 1) --- 插入点就是该元素应该在的位置, 例如: 10应该在arr4数组的最后一个位置也就是5, 然后计算(-5 - 1) = -6
        //解释为什么要-1? --- 如果此时查找的数字是0, 那么返回值是(-插入点), 就会出现问题
        //如果查找的元素是0, 而0而不存在于数组中, 如果返回(-插入点)也就是-0, 那么就会造成误解, 以为查找的索引位置在0的值, 而实际上并没有
        int[] arr4 = {1, 2, 3, 4, 5};
        int index1 = Arrays.binarySearch(arr4, 3);
        System.out.println(index1);
        int index2 = Arrays.binarySearch(arr4, 10);// -6
        System.out.println(index2);
    }
}
```