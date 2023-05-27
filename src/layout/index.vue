<template>
	<div class="app-container">
		<header class="header-container">
			<nav-bar
				:active-page="activePage"
				:menu-list="menuList"></nav-bar>
		</header>
		<div class="content-container">
			<section class="main-container">
				<app-main></app-main>
			</section>
			<footer class="footer-container">
				<h-footer></h-footer>
			</footer>
		</div>
	</div>
</template>

<script setup>
import useDevice from '@/hooks/useDevice'
import useWindowResize from '@/hooks/useWindowResize'
import {computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import AppMain from './components/AppMain.vue'
import HFooter from './components/HFooter.vue'
import NavBar from './components/NavBar.vue'

useDevice()
useWindowResize()

const store = useStore()
const route = useRoute()
const isAdminLogin = computed(() => store.getters.isAdminLogin)
const isUserLogin = computed(() => store.getters.isUserLogin)
const isLogin = isAdminLogin.value || isUserLogin.value
const activePage = computed(() => '/' + route.name)

const loginMenu = [
	{id: 0, name: '首页', path: '/home'},
	{id: 1, name: '归档', path: '/archive'},
	{id: 2, name: '标签', path: '/tag'},
	{id: 3, name: '分类', path: '/category'},
	{id: 4, name: '关于', path: '/about'}
]

const unLoginMenu = [
	{id: 0, name: '首页', path: '/home'},
	{id: 1, name: '标签', path: '/tag'},
	{id: 2, name: '分类', path: '/category'},
	{id: 3, name: '关于', path: '/about'}
]

const menuList = isLogin ? loginMenu : unLoginMenu
onMounted(async () => {
	store.commit('article/CLEAR_ARTICLES')
	await Promise.all([
		store.dispatch('category/GetCategories'),
		store.dispatch('tag/GetTags'),
		store.dispatch('article/GetArticlesHot', {pageSize: 5}),
		store.dispatch('article/GetArticlesRecent', {pageSize: 5})
	])
})
</script>

<style lang="scss" scoped>
.app-container {
	@include layout(100%, 100%);

	.header-container {
		@include position(fixed, 0, 0, 0);
		width: 100%;
		z-index: 1005;
	}

	.content-container {
		@include flex-box(column);
		@include layout;

		.main-container {
			position: relative;
			margin-top: $header-height;
		}

		.footer-container {
			margin-top: auto;
		}
	}
}
</style>
