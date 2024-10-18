## Date

| 构造函数 | 说明 |
| ------------- | :-----------: |
| public Date()   |   从运行程序的此时此刻到时间原点经历的毫秒值   |
| public Date(long date) |  | 

```java
import java.util.Date;

public class Demo01Date {
    public static void main(String[] args) {
        // 创建日期对象，把当前的时间
        System.out.println(new Date()); // Tue Jan 16 14:37:35 CST 2020
        // 创建日期对象，把当前的毫秒值转成日期对象
        System.out.println(new Date(0L)); // Thu Jan 01 08:00:00 CST 1970
    }
}
```

:::tip
在使用`println`方法时，会自动调用`Date`类中的`toString`方法。Date类对Object类中的toString方法进行了覆盖重写，所以结果为指定格式的字符串。
:::

---

### 常用方法

| 方法名 | 说明 |
| ------------- | :-----------: |
| `public long getTime()` |   返回自1970年1月1日0时0分0秒（UTC时间）起至当前系统时间的毫秒数   |
| `public void setTime(long time)` |   设置此Date对象的时间值，以从1970年1月1日0时0分0秒（UTC时间）起至time毫秒数表示 |

```java
import java.util.Date;

public class Demo1 {
    public static void main(String[] args) {
        Date date2 = new Date(1000L);
        System.out.println(date2);// Thu Jan 01 08:00:01 CST 1970
        //从时间原点到date2的毫秒值
        long time = date2.getTime();
        System.out.println(time);// 1000

        date2.setTime(2000L);
        System.out.println(date2);// Thu Jan 01 08:00:02 CST 1970
    }
}
```

---

## SimpleDateFormat

`java.text.SimpleDateFormat` 是日期/时间格式化类，我们通过这个类可以帮我们完成日期和文本之间的转换,也就是可以在Date对象与String对象之间进行来回转换。

| 构造方法 | 说明 |
| ------------- | :-----------: |
| public SimpleDateFormat() |   使用默认模式   |
| public SimpleDateFormat(String pattern) |   使用给定的模式   |

| 标识字母（区分大小写） | 含义 |
| ---------------------- | ---- |
| `y`                      | 年   |
| `M`                      | 月   |
| `d`                      | 日   |
| `H`                      | 时   |
| `m`                      | 分   |
| `s`                      | 秒   |

---

### 常用方法

| 方法名 | 说明 |
| ------------- | :-----------: |
| `public String format(Date date)` |   将日期格式化成日期/时间字符串   |
| `public Date parse(String source)` |   将字符串解析为日期对象   |

```java
public class Demo2 {
    public static void main(String[] args) {
        //1.利用空参构造创建simpleDateFormat对象，默认格式
        SimpleDateFormat sdf = new SimpleDateFormat();
        Date date = new Date();
        //使用默认格式将Date对象转换为String对象
        String result = sdf.format(date);
        //默认格式打印
        System.out.println(result);// 2024/9/29 上午9:49

        //2. 带参构造
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日HH:mm:ss");
        Date date2 = new Date();
        String result2 = sdf2.format(date2);
        //按照指定格式打印
        System.out.println(result2);// 2024年09月29日09:49:11
        
    }
}
```

```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Demo3 {
    public static void main(String[] args) throws ParseException {
//        public Date parse(String source)` |   将字符串解析为日期对象   |
        //注: 创建对象的格式要跟字符串的格式完全一致
        String time = "2023-10-11 11:11:11";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date result = sdf.parse(time);

        System.out.println(result);
    }

}
```

:::warning
`parse`函数使用需要捕获异常, 如果创建对象的格式跟字符串的格式不一致, 就会报错
:::

---

## Calendar

`java.util.Calendar`类表示一个"日历类"，可以进行日期运算。它是一个抽象类，不能创建对象，我们可以使用它的子类：`java.util.GregorianCalendar类`.

有两种方式可以获取`GregorianCalendar`对象：

- 直接创建`GregorianCalendar`对象；
- 通过Calendar的静态方法`getInstance()`方法获取GregorianCalendar对象【本次课使用】

| 方法名                                | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| `public static Calendar getInstance()`  | 获取一个它的子类GregorianCalendar对象。                      |
| `public int get(int field)   `          | 获取某个字段的值。field参数表示获取哪个字段的值，<br />可以使用Calender中定义的常量来表示：<br />Calendar.YEAR : 年<br />Calendar.MONTH ：月<br />Calendar.DAY_OF_MONTH：月中的日期<br />Calendar.HOUR：小时<br />Calendar.MINUTE：分钟<br />Calendar.SECOND：秒<br />Calendar.DAY_OF_WEEK：星期 |
| `public void set(int field,int value)`  | 设置某个字段的值                                             |
| `public void add(int field,int amount)` | 为某个字段增加/减少指定的值                                  |

---

### `get`方法使用

```java
import java.util.Calendar;
import java.util.GregorianCalendar;

public class Demo1 {
    public static void main(String[] args) {
        //获取GregorianCalendar的方式
        //1. 创建对象
        GregorianCalendar gc = new GregorianCalendar();
        //2. 通过Calendar的静态方法getInstance()方法获取GregorianCalendar对象
        Calendar instance = Calendar.getInstance();
        //今天的日期: 2024-9-29 10:40 星期日
        int year = instance.get(Calendar.YEAR);// 2024
        //范围: 0-11 , 例如:本月是9月, 那么输出的结果就是8
        int month = instance.get(Calendar.MONTH);// 8
        int day = instance.get(Calendar.DAY_OF_MONTH);// 29

        int hour = instance.get(Calendar.HOUR);// 10
        int minute = instance.get(Calendar.MINUTE);// 40
        int second = instance.get(Calendar.SECOND);// 8
        // 1对应星期天 返回值范围：1--7，分别表示："星期日","星期一","星期二",...,"星期六"
        int week = instance.get(Calendar.DAY_OF_WEEK);// 1
        System.out.println(year + "年" + month + "月" + day + "日" +
                hour + ":" + minute + ":" + second);
    }
}
```

---

### set方法使用

```java
import java.util.Calendar;

public class UseSet {
    public static void main(String[] args) {
        //1. 获取实例
        Calendar c1 = Calendar.getInstance();
        //班长的出生日期: 1998年3月18日
        c1.set(Calendar.YEAR, 1998);
        //月份范围: 0-11 对应的需要-1
        c1.set(Calendar.MONTH, 3 - 1);
        c1.set(Calendar.DAY_OF_MONTH, 18);
        int w = c1.get(Calendar.DAY_OF_WEEK);
        System.out.println(getWeek(w));//星期三
    }

    //查表法，查询星期几
    public static String getWeek(int w) {//w = 1 --- 7
        //做一个表(数组)
        String[] weekArray = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        //            索引      [0]      [1]       [2]      [3]       [4]      [5]      [6]
        //查表
        return weekArray[w - 1];
    }
}
```

---

### `add`方法使用

```java
import java.util.Calendar;

public class Demo1 {
    public static void main(String[] args) {
        //计算200天以后是哪年哪月哪日，星期几？
        Calendar c = Calendar.getInstance();
        //当前日期时间加上两百
        c.add(Calendar.DAY_OF_MONTH, 200);
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int date = c.get(Calendar.DAY_OF_MONTH);
        System.out.println(year + "-" + month + "-" + date);// 2025-3-17
        //今天时间: 2024-9-29
    }
}
```

---

## JDk8时间相关类

代码层面: JDk7代码书写麻烦; 而JDk8简单

安全层面: JDK7在多线程下会导致数据安全问题(例如: 时间可以修改); 而JDk8中的时间日期对象不可以修改.

| JDK8时间类类名    | 作用                   |
| ----------------- | ---------------------- |
| ZoneId            | 时区                   |
| Instant           | 时间戳                 |
| ZoneDateTime      | 带时区的时间           |
| DateTimeFormatter | 用于时间的格式化和解析 |
| LocalDate         | 年、月、日             |
| LocalTime         | 时、分、秒             |
| LocalDateTime     | 年、月、日、时、分、秒 |
| Duration          | 时间间隔（秒，纳，秒） |
| Period            | 时间间隔（年，月，日） |
| ChronoUnit        | 时间间隔（所有单位）   |

:::tip
- `ZoneId`, `Instant`, `ZoneDateTime`与Date类相关; 
- `DateTimeFormatter`与`SimpleDateFormat`相关;
- `LocalDate`, `LocalTime`, `LocalDateTime`与`Calendar`类相关;
- 工具类与`Duration`, `Period`, `ChronoUnit`相关;
:::

---

### ZoneId 时区

| 静态方法 | 描述 |
| ------ | ---- |
| `static Set<String> getAvailableZoneIds()` | 获取Java中支持的所有时区 |
| `static ZoneId systemDefault()` | 获取系统默认时区 |
| `static ZoneId of(String zoneld)` | 获取一个指定时区 |

```java
public class UseZoneId {
    public static void main(String[] args) {
        /*
        static Set<string> getAvailableZoneIds() 获取Java中支持的所有时区
        static ZoneId systemDefault() 获取系统默认时区
        static Zoneld of(string zoneld) 获取一个指定时区
        */
        //获取Java中支持的所有时区
        Set<String> zondIds = ZoneId.getAvailableZoneIds();
        //[Asia/Aden, America/Cuiaba, Etc/GMT+9, Etc/GMT+8, Africa/Nairobi, America/Marigot, ...]
        System.out.println(zondIds);
        // 599, JDK版本不同对应的市区长度也会不一样
        System.out.println(zondIds.size());
        //获取系统默认时区
        ZoneId zoneId = ZoneId.systemDefault();
        System.out.println(zoneId);// Asia/Shanghai

        // 获取一个指定时区
        ZoneId zone = ZoneId.of("Europe/London");
        System.out.println(zone);//Europe/London
    }
}
```

---

### Instant 时间戳