<template>
    <div :class="$style['tip-container']">
        <svg t="1729151887798" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5243" width="1em" height="1em">
            <path
                d="M512 896c212.0768 0 384-171.9232 384-384s-171.9232-384-384-384-384 171.9232-384 384 171.9232 384 384 384z m0 128c-282.7712 0-512-229.2288-512-512S229.2288 0 512 0s512 229.2288 512 512-229.2288 512-512 512zM448 448h128v320H448V448z m0-192h128v128H448V256z"
                fill="currentColor" p-id="5244"></path>
        </svg>

        <slot>tip</slot>
    </div>
</template>

<script lang='ts' setup>
defineOptions({
    name: 'Tip'
})


</script>

<style module>
.tip-container {
    display: flex;
    align-items: center;
    column-gap: 7px;
}
</style>