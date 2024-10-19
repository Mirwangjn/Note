import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import { vueConfig } from '../config/vue.config';
import { javaConfig } from '../config/java.config';
import { navConfig } from '../config/nav.config';
import { vitepressConfig } from "../config/vittepress.config"
import autoSidebar from "../auto-sidebar";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Note/',
  // 项目标题
  title: "小小汪",
  description: "小小汪",

  themeConfig: {
    outlineTitle: '页面导航',
    //右侧目录深度化
    outline: {
      level: "deep"
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: navConfig,
    // sidebar: {
    //   '/': [
    //     {
    //       text: '/',
    //       collapsed: false,
    //       items: [
    //         {
    //           text: 'pinia',
    //           link: '/Pinia'

    //         }
    //       ]
    //     }
    //   ],
    //   // 当用户位于 `Java` 目录时，会显示此侧边栏
    //   '/Java/': [
    //     {
    //       text: 'Java',
    //       collapsed: false,
    //       items: javaConfig,
    //     }
    //   ],
    //   'vue': [
    //     {
    //       text: 'vue',
    //       collapsed: false,
    //       items: vueConfig
    //     }
    //   ],
    //   'vitepress': [
    //     {
    //       text: 'vitepress',
    //       collapsed: false,
    //       items: [
    //         { text: '开始', link: "/vitepress/addIcon" },
    //         {
    //           text: 'test',
    //           items: [
    //             { text: '测试', link: "/vitepress/code/index" }
    //           ]
    //         }
    //       ]
    //     }
    //   ],
    // },
    sidebar: autoSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mirwangjn/C' },
      {
        icon: {
          svg: '<svg t="1728790502927" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4247" width="32" height="32"><path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" fill="#20B0E3" p-id="4248"></path><path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" fill="#20B0E3" p-id="4249"></path></svg>'
        },
        link: 'https://space.bilibili.com/388336816?spm_id_from=333.1007.0.0',
      }
    ],
    // 添加搜索框
    search: {
      provider: 'local'
    },
  },
  markdown: {
    // 代码块开启行号
    // lineNumbers: true,
    // 开启数学环境, 但首先需要下载markdown-it-mathjax3包
    math: true,
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    container: {
      tipLabel: '<Tip>提示</Tip>',
      warningLabel: '警告',
      dangerLabel: '<Danger>危险</Danger>',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      MarkdownPreview(), 
      groupIconVitePlugin({
        customIcon: {
          '.java': localIconLoader(import.meta.url, "../assets/java.svg"),
          // '.java': 'vscode-icons:file-type-java'
        }
      })
    ],
  },
  /*
    当设置./src作为源目录时, 对应的
    src/index.md -->  /index.html (可以通过 / 访问)
    src/getting-started.md  -->  /getting-started.html
  */
  // srcDir: "./src",
  //路径重写
  // rewrites: {
  //   'markdown-examples.md': 'example.md'
  // }
  // 如果站点在子路径中提供服务就需要配置下列选项, 访问路径为: http://localhost:5173/litlelitlewang/
  // base: '/litlelitlewang/'
  // 更改markdown自定义容器的标题内容
  // markdown: {
  //   container: {
  //     tipLabel: '提示',
  //     warningLabel: '警告',
  //     dangerLabel: '危险',
  //     infoLabel: '信息',
  //     detailsLabel: '详细信息'
  //   }
  // }

})


