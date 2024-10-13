//根据目录生成侧边栏
import fs from "node:fs";
//设置白名单
const whiteList = [".vitepress", "components", "config", "public", "auto-sidebar.ts", 'sidebar-by-one.ts', "img"]
//lstatSync函数的作用是同步地获取文件或目录的状态信息, isDirectory判断当前文件是否为文件夹
const isDirectory = (path: string) => fs.lstatSync(path).isDirectory();
//__dirname获取当前文件所在目录的绝对路径
//获取当前目录信息
const root = fs.readdirSync(__dirname);
//过滤白名单函数
const filter = (arr: string[]) => {
  return arr.filter(val => !whiteList.includes(val));
}
//最终的目录结构
const config: any = {};
//将/java/转换为java
const replaceRule = /^\/(.+)\/$/g;
//将/java/转换为java
const prefixReplace = (prefix: string) => prefix.replaceAll(/^\/(.+)\/$/g, "$1");


/**
 * //递归遍历每一层文件
 * @param arr 需要遍历的数组
 * @param prefix /Java/
 * @param path D:\\use-vitepress\\docs
 */
const setDir = (arr: string[], prefix: string, path: string) => {
  //文件夹的结构
  const items: any[] = [];
  config[prefix] = [
    {
      text: prefixReplace(prefix), 
      collapsed: false,
      items
    }
  ];
  //1. 过滤白名单
  arr = filter(arr);
  //2. 遍历每个文件
  arr.forEach(item => {
    //2 判断当前文件是否为文件夹
    if (isDirectory(path + "/" + item)) {
      //2.1 是 ==> 继续递归下去
      //2.1.1获取当前文件夹的详细信息
      const currentPath = path + "/" + item;
      const currentDir = fs.readdirSync(currentPath);
      setDir(currentDir, prefix + item + "/", currentPath);
    } else {
      //最终确定下来的路径, 作为text的参数
      const finalText = item.replace(".md", "");
      //2.2 不是 ==> 添加到结果中
      const result = { text: finalText, link: prefix + finalText };
      (items as object[]).push(result);
    }
  })
}
/*
    生成结构
    {
        "name": [{}, {}],
        "name": [],
    }

    '/Java/': [
        {
          text: 'Java',
          collapsed: false,
          items: javaConfig,
        }
    ],
*/

setDir(root, "/", __dirname);

/*
    最终组成
{
  '/': [
    { text: 'index', link: '/index' },
    { text: 'Pinia', link: '/Pinia' },
    { text: 'tip', link: '/tip' },
    { text: 'vue3note', link: '/vue3note' }
  ],
  '/Java/': [
    { text: 'ArrayList', link: '/Java/ArrayList' },
    { text: 'final', link: '/Java/final' },
    { text: 'interface', link: '/Java/interface' },
    { text: 'Javabean', link: '/Java/Javabean' },
    { text: 'lambda表达式', link: '/Java/lambda表达式' },
    { text: 'package', link: '/Java/package' },
    { text: 'Scanner', link: '/Java/Scanner' },
    { text: 'static', link: '/Java/static' },
    { text: 'StringBuilder', link: '/Java/StringBuilder' },
    { text: 'StringJoiner', link: '/Java/StringJoiner' },
    { text: '内部类', link: '/Java/内部类' },
    { text: '工具类', link: '/Java/工具类' },
    { text: '常用API', link: '/Java/常用API' },
    { text: '常见算法', link: '/Java/常见算法' },
    { text: '抽象类', link: '/Java/抽象类' },
    { text: '接口多态', link: '/Java/接口多态' },
    { text: '数据结构', link: '/Java/数据结构' },
    { text: '时间API', link: '/Java/时间API' },
    { text: '权限修饰符', link: '/Java/权限修饰符' },
    { text: '正则表达式', link: '/Java/正则表达式' },
    { text: '泛型', link: '/Java/泛型' },
    { text: '编译方式', link: '/Java/编译方式' },
    { text: '集合', link: '/Java/集合' },
    { text: '静态代码块', link: '/Java/静态代码块' },
    { text: '面向对象', link: '/Java/面向对象' }
  ],
  '/vue/': [
    { text: 'proxyServer', link: '/vue/proxyServer' },
    { text: 'setup', link: '/vue/setup' },
    { text: 'toRef', link: '/vue/toRef' },
    { text: 'useVite', link: '/vue/useVite' },
    { text: 'vue3笔记', link: '/vue/vue3笔记' },
    { text: 'vue指令', link: '/vue/vue指令' },
    { text: '响应式对象', link: '/vue/响应式对象' }
  ]
}
*/
console.log(config);


export default config;



