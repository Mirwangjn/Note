//根据目录生成侧边栏
import fs, { link } from "node:fs";
import path from "node:path";

//输入格式  "name": setDir(relative path)

/*
生成目录:
      '/vitepress/': [
        {
          text: 'vitepress',
          collapsed: false,
          items: [
            { text: '开始', link: "/vitepress/..." },
            {
              text: 'code',
              items: [
                { text: '测试', link: "/vitepress/code/..." }
              ]
            }
          ]
        }
      ]

      最终目的:
        {
          text: 'vitepress',
          collapsed: false,
          items: vitepressConfig
        }

*/
//基础路径
const basePath = __dirname;
//设置白名单
const whiteList = [".vitepress", "components", "config", "public", "auto-sidebar.ts", "img"];
//lstatSync函数的作用是同步地获取文件或目录的状态信息, isDirectory判断当前文件是否为文件夹
const isDirectory = (path: string) => fs.lstatSync(path).isDirectory();
//过滤白名单函数
const filter = (arr: string[]) => arr.filter(val => !whiteList.includes(val));






export const setDir = (path: string) => {
  //当前路径下的所有文件
  let arr = fs.readdirSync(basePath + path);
  const items: any[] = [];
  const result = {
    text: path.replace("/", ""),
    collapsed: false,
    items
  };
  //过滤白名单
  arr = filter(arr);
  arr.forEach((file) => {
    //2 判断当前文件是否为文件夹
    if (isDirectory(path + "/" + file)) {
      //2.1 是 ==> 继续递归下去

    } else {
      //2.1.1获取当前文件夹的详细信息, 并存放在result数组中
      items.push({
        text: file,
        link: path + "/" + file
      })
    }
  })

}

setDir("/Java");