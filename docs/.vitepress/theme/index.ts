import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import 'virtual:group-icons.css'
import Layout from './Layout.vue'
import Test from "../../components/test.vue";
import Tip from '../../components/Tip.vue'
import Danger from '../../components/Danger.vue'



export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp({ app }) {        
        app.component("Test", Test);
        app.component("Tip", Tip);
        app.component("Danger", Danger);
    },
} satisfies Theme

