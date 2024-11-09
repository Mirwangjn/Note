<template>
  <Layout>
    <template #doc-after>
      <!-- <Gitalk /> -->
       <Utterances />
    </template>
  </Layout>
</template>

<script type="ts" setup>
import DefaultTheme from 'vitepress/theme'
import Utterances from './components/Utterances.vue';
import Gitalk from './components/Gitalk.vue';
import { useRouter } from "vitepress";
import nprogress from "nprogress"
//引入进度条样式
import "nprogress/nprogress.css";
// import mediumZoom from 'medium-zoom'
const { Layout } = DefaultTheme
//取消小圆圈
nprogress.configure({ showSpinner: false });

const router = useRouter();

router.onBeforePageLoad = (to) => {
  nprogress.start(); 
}

router.onAfterRouteChanged = () => {
  nprogress.done();
}
</script>
