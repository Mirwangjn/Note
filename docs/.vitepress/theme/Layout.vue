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

// import mediumZoom from 'medium-zoom'
const { Layout } = DefaultTheme
</script>
