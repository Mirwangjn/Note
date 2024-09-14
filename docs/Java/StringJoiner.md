
## StringJoiner

在Java中，`StringJoiner`是一个创新的实用工具类，可以用来构造一个带有分隔符的字符串。这个类在Java 8中被引入。

要使用`StringJoiner`，你只需简单地创建一个`StringJoiner`对象，然后可以添加任何你想加入的文本。

以下是基本使用方式：
```java
StringJoiner joiner = new StringJoiner(", ");
joiner.add("Hello");
joiner.add("World");
System.out.println(joiner.toString()); // 结果：Hello, World
```

在这个例子中，我们创建了一个StringJoiner对象，并设置它的分隔符为一个逗号和一个空格。然后我们添加两个字符串："Hello"和"World"，它们会用分隔符连接起来。

你也可以在创建StringJoiner的时候定义一个前缀和后缀:
```java
StringJoiner joiner = new StringJoiner(", ", "[", "]");

joiner.add("One");

joiner.add("Two");

joiner.add("Three");

System.out.println(joiner.toString()); // 结果：[One, Two, Three]
```

| 构造方法       |      说明     |
| ------------- | :-----------: | 
| public StringBuilder(间隔符号)      | 创建一个StringBuilder对象,指定拼接的间隔符号 | 
| public StringBuilder(间隔符号, 开始符号, 结束符号)      |       | 

---

## 字符串存储的内存原理

