<template>
  <div class="widget-list hidden-sm-and-up">
    <!-- article-recent -->
    <transition name="fade" appear>
      <article-recent class="widget-item"></article-recent>
    </transition>
  </div>
  <!-- main-content -->
  <router-view v-slot="{ Component, route }" class="widget-list">
    <transition :name="route.meta.transitionName">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
  <div class="widget-list hidden-sm-and-up">
    <!-- tag-list -->
    <transition name="fade" appear>
      <tag-list class="widget-item"></tag-list>
    </transition>
    <!-- category-list -->
    <transition name="fade" appear>
      <category-list class="widget-item"></category-list>
    </transition>
    <!-- article-hot -->
    <transition name="fade" appear>
      <article-hot class="widget-item"></article-hot>
    </transition>
    <!-- links -->
    <transition name="fade" appear>
      <links class="widget-item"></links>
    </transition>
  </div>
</template>

<script setup>
import ArticleRecent from '@/components/ArticleRecent.vue'
import TagList from '@/components/TagList.vue'
import CategoryList from '@/components/CategoryList.vue'
import ArticleHot from '@/components/ArticleHot.vue'
import Links from '@/components/Links.vue'
</script>

<style lang="scss" scoped>
@include fade;
@include slide-fade-left;
@include slide-fade-right;
@include widget-styl;
</style>
