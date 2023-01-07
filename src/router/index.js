import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { getYPosition } from '@/util/scroll-to'
import controller from './controller'

const Layout = () => import(/* webpackChunkName: "Layout" */ '@/layout/index')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/home')
const About = () => import(/* webpackChunkName: "about" */ '@/views/about')
const Tag = () => import(/* webpackChunkName: "tag" */ '@/views/tag')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login')
const Archive = () => import(/* webpackChunkName: "archive" */ '@/views/archive')
const Category = () => import(/* webpackChunkName: "category" */ '@/views/category')
const Blog = () => import(/* webpackChunkName: "blog" */ '@/views/blog')
const Article = () => import(/* webpackChunkName: "article" */ '@/views/article')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'about',
        name: 'about',
        component: About
      },
      {
        path: 'archive',
        name: 'archive',
        component: Archive
      },
      {
        path: 'category/:id?',
        name: 'category',
        component: Category
      },
      {
        path: 'tag/:id?',
        name: 'tag',
        component: Tag
      },
      {
        path: 'blog/:id?',
        name: 'blog',
        component: Blog,
        props: true
      },
      {
        path: 'article/:id',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = controller(
  createRouter({
    history: createWebHistory(),
    scrollBehavior: async (to, from, savedPosition) => {
      await new Promise(res => setTimeout(res, 500))
      if (savedPosition) {
        return savedPosition
      } else {
        const routeName = to.name
        const routeElMap = {
          home: '.app-main-container',
          about: '.about-page',
          archive: '.archive-page',
          article: '.article-page',
          tag: '.tag-page',
          blog: '.blog-page',
          category: '.category-page'
        }
        const top = getYPosition(document.querySelector(routeElMap[routeName])) - 80
        return { top, behavior: 'smooth' }
      }
    },
    routes
  })
)

export default router
