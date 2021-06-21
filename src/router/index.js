import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ArticleList from '@/views/articleList.vue'
import ArticleDetail from '@/views/articleDetail.vue'
import BookDetail from '@/views/BookDetail.vue'
import BookList from '@/views/BookList.vue'
import AboutMe from '@/views/AboutMe.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },{
    path: '/bookDetail',
    name: 'bookDetail',
    component: BookDetail
  },{
    path: '/bookList',
    name: 'bookList',
    component: BookList
  },
  {
    path: '/articleList',
    name: 'articleList',
   
    component: ArticleList
  },
  {
    path: '/articledetail',
    name: 'articleDetail',
    props: true,
    component: ArticleDetail
  },
  {
    path: '/aboutMe',
    name: 'aboutMe',
   
    component: AboutMe
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass:'active'
})

export default router
