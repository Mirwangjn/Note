import { DefaultTheme } from "vitepress";

export const navConfig: DefaultTheme.NavItem[] = [
    {
        text: '📗首页',
        link: '/'
    },
    {
        text: '前端',
        items: [
            { text: 'Vue', link: '/vue/toRef' },
        ]
    },
    {
        text: '后端',
        items: [
            { text: 'Java', link: '/Java/02.Javabean' },
            { text: 'nodejs', link: '/nodejs/node文档' }
        ]
    },
    {
        text: '其他',
        items: [
            { text: 'vitepress', link: '/vitepress/01.自动生成侧边栏' },
            { text: 'linux', link: '/linux/01.安装' }
        ]
    }
]