import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import { vueConfig } from '../config/vue.config';
import { javaConfig } from '../config/java.config';
import { navConfig } from '../config/nav.config';
import { vitepressConfig } from "../config/vittepress.config"
import autoSidebar from "../auto-sidebar";
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'


// https://vitepress.dev/reference/site-config
export default defineConfig({
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
    sidebar: {
      // 当用户位于 `Java` 目录时，会显示此侧边栏
      '/Java/': [
        {
          text: 'Java',
          collapsed: false,
          items: javaConfig,
        }
      ],
      '/vue/': [
        {
          text: 'vue',
          collapsed: false,
          items: vueConfig
        }
      ],
      '/vitepress/': [
        {
          text: 'vitepress',
          collapsed: false,
          items: vitepressConfig
        }
      ]
    },
    // sidebar: autoSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mirwangjn/C' },
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
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [MarkdownPreview(), groupIconVitePlugin()],
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


