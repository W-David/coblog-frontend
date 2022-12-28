<template>
  <div class="widget-list">
    <!-- article-hot -->
    <transition name="slide-fade-left" appear>
      <article-hot class="widget-item hidden-lg-and-up" :list="articlesHot"></article-hot>
    </transition>
    <!-- links -->
    <transition name="slide-fade-left" appear>
      <links class="widget-item" :links="links"></links>
    </transition>
  </div>
  <div class="widget-list is-sticky">
    <!-- article-recent -->
    <transition name="slide-fade-left" appear>
      <article-recent class="widget-item" :list="articlesRecent"></article-recent>
    </transition>
    <!-- tag-list -->
    <transition name="slide-fade-left" appear>
      <tag-list class="widget-item hidden-lg-and-up" :list="tagList"></tag-list>
    </transition>
    <!-- category-list -->
    <transition name="slide-fade-left" appear>
      <category-list class="widget-item hidden-lg-and-up" :list="categoryList"></category-list>
    </transition>
  </div>
</template>

<script setup>
import ArticleRecent from '@/components/ArticleRecent.vue'
import TagList from '@/components/TagList.vue'
import CategoryList from '@/components/CategoryList.vue'
import ArticleHot from '@/components/ArticleHot.vue'
import Links from '@/components/Links.vue'
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  articlesRecent: Array,
  articlesHot: Array,
  tagList: Array,
  categoryList: Array,
  links: Array
})
const { articlesRecent, articlesHot, tagList, categoryList, links } = toRefs(props)
</script>

<style lang="scss" scoped>
@include widget-styl;
@include slide-fade-left;
</style>
