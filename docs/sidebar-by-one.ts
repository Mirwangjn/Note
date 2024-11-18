//根据目录生成侧边栏
import fs, { link } from "node:fs";
import { type DefaultTheme } from "vitepress";
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




export function sidebar(path: string) {
  const arr: any = [];
  const result: DefaultTheme.SidebarItem = {
    text: path,
    collapsed: false,
    items: arr
  }


  const setDir = (path: string, curArr: DefaultTheme.SidebarItem[]) => {
    const absolutePath = basePath + "/" + path;
    //获取当前文件夹的文件
    const dir = fs.readdirSync(absolutePath);
    //过滤白名单
    const dirFilter = filter(dir);
    for (let i = 0; i < dirFilter.length; i++) {
      const item = dirFilter[i];
      const tempArr: DefaultTheme.SidebarItem[] = [];
      if (isDirectory(absolutePath + "/" + item)) {
        //是文件夹的情况
        const tempObj: DefaultTheme.SidebarItem = {
          text: item.replace(".md", ""),
          collapsed: false,
          items: tempArr
        }
        curArr.push(tempObj);
        //回溯递归
        setDir(path + "/" + item, tempArr);
      } else {
        //不是文件夹
        if (item.indexOf(".md") === -1) continue;
        //否 ==> 添加curArr数组中
        curArr.push({ text: item.replace(".md", ""), link: '/' + path + '/' + item.replace(".md", "") });
      }
    }



  }

  setDir(path,arr)

  return result;
}

// const result = sidebar("java")
// console.log(result);

