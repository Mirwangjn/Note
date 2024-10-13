import { DefaultTheme } from "vitepress";

export const navConfig: DefaultTheme.NavItem[] = [
    {
        text: '首页',
        link: '/'
    },
    {
        text: '前端',
        items: [
            { text: 'Vue', link: '/vue/vue3笔记' },
        ]
    },
    {
        text: '后端',
        items: [
            { text: 'Java', link: '/Java/Javabean' },

        ]
    },
    {
        text: '其他',
        items: [
            { text: 'vitepress', link: '/vitepress/addIcon' }
        ]
    }
]