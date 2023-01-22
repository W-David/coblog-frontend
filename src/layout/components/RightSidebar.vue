<template>
  <div class="right-sidebar-container">
    <div class="widget-list">
      <!-- article-hot -->
      <transition name="slide-fade-right" appear>
        <article-hot class="widget-item"></article-hot>
      </transition>
    </div>
    <div class="widget-list is-sticky">
      <!-- tag-list -->
      <transition name="slide-fade-right" appear>
        <tag-list class="widget-item"></tag-list>
      </transition>
      <!-- category-list -->
      <transition name="slide-fade-right" appear>
        <category-list class="widget-item"></category-list>
      </transition>
    </div>
  </div>
</template>

<script setup>
import TagList from '@/components/TagList.vue'
import CategoryList from '@/components/CategoryList.vue'
import ArticleHot from '@/components/ArticleHot.vue'
import { defineProps, toRefs } from 'vue'
</script>

<style lang="scss" scoped>
@include widget-styl;
@include slide-fade-right;
</style>
