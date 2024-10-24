<template>
  <Layout>
    <template #doc-after>
      <div id="gitalk-container"></div>
    </template>
  </Layout>

</template>

<script type="ts" setup>
import DefaultTheme from 'vitepress/theme'
// import mediumZoom from 'medium-zoom'

const { Layout } = DefaultTheme
import { watch, nextTick, onMounted } from "vue";
import "gitalk/dist/gitalk.css";
import { useRouter } from "vitepress";
import createGitalk from "../gitalk";

let { route } = useRouter(); // 页面路由对象

// 初始化 Gitalk
const initGitalk = () => {
  if (typeof window !== 'undefined') {
    const container = document.getElementById('gitalk-container');
    if (container) {
      container.innerHTML = '';
      createGitalk(route.path);
    }
  }
};

// const initZoom = () => {
//   mediumZoom('img', { background: 'var(--vp-c-bg)' });
// }

onMounted(() => {
  // 初次加载时初始化 Gitalk
  initGitalk();
  // initZoom();

  // 监听路由变化
  watch(() => route.path, (newPath) => {
    nextTick(() => {
      initGitalk();
      // initZoom();
    });
  }
  );
});
</script>

<style>
.gt-container .gt-header-textarea {
  color: #000;
}
.dark .gt-container .gt-header-textarea {
  background-color: #1a1a1a;
}
.dark .gt-container .gt-header-preview {
  background-color: #1a1a1a;
  color: #fff;
}
.dark .gt-container .gt-header-textarea {
  color: #fff;
}
.dark .gt-container .gt-comment-admin .gt-comment-content {
  background-color: #1a1a1a;
}
.dark .gt-container .gt-comment-body {
  color: #fff !important;
}
</style>