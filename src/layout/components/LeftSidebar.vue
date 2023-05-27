<template>
	<div class="widget-list">
		<!-- article-hot -->
		<transition
			name="slide-fade-left"
			appear>
			<article-hot class="widget-item hidden-lg-and-up"></article-hot>
		</transition>
		<!-- links -->
		<transition
			name="slide-fade-left"
			appear>
			<links class="widget-item"></links>
		</transition>
	</div>
	<div class="widget-list is-sticky">
		<!-- toc -->
		<transition
			name="slide-fade-left"
			appear>
			<toc
				v-if="isArticlePage"
				class="widget-item"></toc>
		</transition>
		<!-- article-recent -->
		<transition
			name="slide-fade-left"
			appear>
			<article-recent class="widget-item"></article-recent>
		</transition>
		<!-- tag-list -->
		<transition
			name="slide-fade-left"
			appear>
			<tag-list class="widget-item hidden-lg-and-up"></tag-list>
		</transition>
		<!-- category-list -->
		<transition
			name="slide-fade-left"
			appear>
			<category-list class="widget-item hidden-lg-and-up"></category-list>
		</transition>
	</div>
</template>

<script setup>
import ArticleRecent from '@/components/ArticleRecent.vue'
import TagList from '@/components/TagList.vue'
import CategoryList from '@/components/CategoryList.vue'
import ArticleHot from '@/components/ArticleHot.vue'
import Toc from '@/components/Toc.vue'
import Links from '@/components/Links.vue'

import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

const store = useStore()
const isArticlePage = computed(() => useRoute().name === 'article')
const isXS = computed(() => store.getters.devicesize === 'xs')
</script>

<style lang="scss" scoped>
@include widget-styl;
@include slide-fade-left;
</style>
