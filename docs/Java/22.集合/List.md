## List集合

List集合是Collection的一种. 所以Collection中的方法`List`都继承下来了

1. 有序
2. 有索引
3. 可重复

---

### 基本方法

| 方法名                           | 说明 |
| :------------------------------- | :--- |
| `void add(int index, E element)` | 增   |
| `E remove(int index)`            | 删   |
| `E get(int index)`               | 改   |
| `E set(int index, E element)`    | 查   |


```java
public class A01_ListDemo1 {
    public static void main(String[] args) {
        /*
        * void add(int index, E element)	增
        E remove(int index)	删
        E get(int index)	改
        E set(int index, E element)	查
        * */
        List<String> list = new ArrayList<>();
        list.add(0, "aaa");
        list.add(1, "bbb");
        list.add(2, "ccc");
        System.out.println(list);// [aaa, bbb, ccc]
        //元素添加到指定的索引处, 索引位置之后的元素都向后移动一位
        list.add(1, "ddd");
        System.out.println(list);// [aaa, ddd, bbb, ccc]
        list.remove(2);

        String str = list.get(1);
        System.out.println(str);
        list.set(1, "wjn");

    }
}
```

---

### 遍历方式

在包含之前四种遍历(迭代器, 增强for, Lambda, 普通遍历)的情况下, 新增的列表迭代器

#### 列表迭代器

| 方法名                  | 说明                                                           |
| :---------------------- | :------------------------------------------------------------- |
| `void add(E e)`         | 在列表中的指定位置上添加元素, 索引位置之后的元素都向后移动一位 |
| `boolean hasNext()`     | 继承自Collection                                               |
| `E next()`              | 继承自Collection                                               |
| `void remove()`         | 继承自Collection                                               |
| `void set(E e)`         | 替换当前元素                                                   |
| `boolean hasPrevious()` | 判断是否还有上一元素(了解)                                     |
| `E previous()`          | 返回上一元素, 并且指针向前移动一位(了解)                       |
| `int nextIndex()`       | 返回下一个元素的索引(了解)                                     |
| `int previousIndex()`   | 返回上一个元素的索引(了解)                                     |


```java
public class A02_ListDemo2 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        list.add("aaa");
        list.add("bbb");
        list.add("ccc");

        ListIterator<String> it = list.listIterator();
        while (it.hasNext()) {
            String str = it.next();
            if("bbb".equals(str)) {
                //迭代器遍历时, 不能使用集合的方法进行增加和删除, 不然报错ConcurrentModificationException
//                list.add("qqq");
                //但可以使用迭代器本身的方法去添加
                it.add("qqq");
            }
        }
        System.out.println(list);

    }
}
```

---