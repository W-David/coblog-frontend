<template>
	<div class="waline-comp-container">
		<!-- <div id="waline"></div> -->
		<waline
			:server-u-r-l="serverURL"
			:path="path"
			:lang="lang"
			:dark="dark"
			:reaction="reaction"
			:copyright="copyright"></waline>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, watch, computed } from 'vue'
import { Waline } from '@waline/client/dist/component'
import { init } from '@waline/client'

const route = useRoute()
const serverURL = process.env.VUE_APP_WALINE_API
const lang = 'zh-CN'
const dark = '.dark'
const reaction = true
const copyright = false
const path = computed(() => route.path)

// const waline = { instance: null }
// const generateWaline = () =>
//   init({
//     el: '#waline',
//     serverURL: process.env.VUE_APP_WALINE_API,
//     lang: 'zh-CN',
//     reaction: true,
//     dark: '.dark'
//   })
// onMounted(() => {
//   waline.instance = generateWaline()
// })
// onUnmounted(() => {
//   waline.instance.destroy()
//   waline.instance = null
// })

// watch(
//   () => route.params.id,
//   () => waline.instance.update()
// )
</script>

<style lang="scss" scoped>
.waline-comp-container {
	@include layout(100%, auto, $main-margin 0 0 0, 8px 12px);
	@include border(1px solid #eee, 8px);
	@include box-shadow(4px 4px 16px rgba(0, 0, 0, 0.1));
	@include bg-color(#fafafa, #1f1f1f);
}
</style>
