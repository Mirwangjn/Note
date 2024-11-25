# Java

## 介绍

`Collections`是一个集合工具类

---

## 常用方法

| 方法名                                                                                     | 描述                                                                                   |
| :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `boolean addAll(Collection<? super T> c, T[] elements)`                                    | 将数组中的元素添加到集合中，如果集合为空，则创建一个新集合，返回新集合，否则返回原集合 |
| `boolean removeIf(Collection<T> c, Predicate<? super T> filter)`                           | 根据过滤器删除集合中的元素，返回是否删除成功                                           |
| `boolean replaceAll(List<T> list, Predicate<? super T> filter, UnaryOperator<T> operator)` | 根据过滤器替换集合中的元素，返回是否替换成功                                           |  |
| `void sort(List<T> list, Comparator<? super T> c) `                                        | 对集合中的元素进行排序，默认使用自然排序                                               |
| `void sort(List<T> list)`                                                                  | 对集合中的元素进行排序，默认使用自然排序                                               |
| `void shuffle(List<?> list)`                                                               | 将集合中的元素随机打乱                                                                 |
| `int binarySearch(List<? extends Comparable<? super T>> a, T key)`                         | 二分查找，集合中的元素必须实现`Comparable`接口，否则会抛出`ClassCastException`异常     |
| `void swap(List<?> list, int i, int j)`                                                    | 交换集合中两个元素的位置                                                               |
| `int fill(List<?> list, Object element)`                                                   | 将集合中的元素填充为指定元素，返回填充的个数                                           |


```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;

public class Demo5 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        HashSet<String> set = new HashSet<>();
        //一次性添加多个元素
        Collections.addAll(list, "1", "2", "3", "4");

        Collections.addAll(set, "1", "2", "3", "4");
        System.out.println(list);// [1, 2, 3, 4]
        System.out.println(set);// [1, 2, 3, 4]
        //打乱list集合的元素, 此方法不可用于Set集合, 因为Set集合本来就是无序的
        Collections.shuffle(list);
        System.out.println(list);
        //Collections.sort(list);
        //不填第二个参数, 默认按照自然排序的规则排序
        Collections.sort(list, (String o1, String o2) -> {
                int result = o1.length() - o2.length();
                return result == 0 ? o1.compareTo(o2) : result;
        });
        System.out.println(list);// [1, 2, 3, 4]
        //交换两个元素的位置
        Collections.swap(list, 0, 3);
        System.out.println(list);// [4, 2, 3, 1]
    }
}
```

---

### binarySearch返回值注意点

`Collections.binarySearch(list, key)`如果`key`存在于集合中, 那么正常返回值是`key`在集合中的下标, 但是如果`key`不存在于集合中, 那么返回值是`-(插入点+1)`. 

插入点的意思就是`key`应该插入到集合中的位置. 比如集合是`[1, 2, 3, 4]`, 那么`Collections.binarySearch(list, 5)`返回值是`-(4+1) = -5`. 因为`5`应该插入到集合中的位置是`4`的后面, 也对应了索引4的位置, 那么最终结果就是
`-(4+1) = -5`


```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "1", "2", "3", "4");
int index1 = Collections.binarySearch(list, "3");// 2
int index2 = Collections.binarySearch(list, "5");// -5
System.out.println(index1);
System.out.println(index2);
```