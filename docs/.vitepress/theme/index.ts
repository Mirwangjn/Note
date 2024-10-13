// // 1. 导入 vitepress 主题
// import Theme from '@escook/vitepress-theme'
// // 2. 导入配套的 CSS 样式（此步骤不能省略）
// import '@escook/vitepress-theme/style.css'

// // 3. 把“导入”的主题“默认导出”即可
// export default Theme

// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import 'virtual:group-icons.css'
import Layout from './Layout.vue'



export default {
    extends: DefaultTheme,
    Layout,
}

// export default DefaultTheme;