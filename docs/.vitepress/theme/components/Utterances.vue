<template>
    <!-- 用于加载 Utterances 评论组件的容器 -->
    <div id="comment" ref="comment"></div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue'
import { createUtterances } from '../utils/createUtterances';
import { useRouter } from "vitepress"
const { route } = useRouter();
const comment = ref();
onMounted(() => {

    createUtterances();
    watch(() => route.path, (newPath) => {
        nextTick(() => {
            //每次切换路由时，清除评论组件，重新加载
            (comment.value as HTMLElement).innerHTML = '';
          createUtterances();
        });
    })

})
</script>

<style>
.utterances {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    max-width: 760px;
    margin-left: 0;
    margin-right: auto;
}

.utterances-frame {
    position: absolute;
    left: 0;
    right: 0;
    width: 1px;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    border: 0;
}
</style>