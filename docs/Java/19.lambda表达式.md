## 基本介绍

lambda表达式是一种简洁的语法格式, 可以用来简化匿名内部类的语法

:::code-group
```java [接口]
@FunctionalInterface
public interface Swim {
    public abstract void swimming();
}
```

```java [类]
public class Demo3 {
    public static void main(String[] args) {
        //使用接口作为形参, 可以通过匿名内部类的方式传递, 但这个过程难免会有些麻烦
        method(new Swim() {
            @Override
            public void swimming() {
                System.out.println("游泳");
            }
        });
        //那么就可以使用lambda表达式的语法进行书写
        method(() -> {
                    System.out.println("游泳");
                }
        );
    }

    public static void method(Swim swim) {
        swim.swimming();
    }
}
```
:::

:::tip
1. `lambda`表达式的使用需要满足**函数式接口**
    - **函数式接口**: 有且仅有一个抽象方法的接口叫做**函数式接口**, 接口上方可以加`@FunctionalInterface`注解
:::