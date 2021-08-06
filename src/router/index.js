import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import index from '@/views/index.vue'

import scan from '@/views/scan.vue'
import ArticleList from '@/views/articleList.vue'
import ArticleDetail from '@/views/articleDetail.vue'
import personCenter from '@/views/personCenter.vue'
import Personinfo from '@/views/Personinfo.vue'
import BookDetail from '@/views/BookDetail.vue'
import login from '@/views/login.vue'
import BookList from '@/views/BookList.vue'
import booktags from '@/views/booktags.vue'
import AboutMe from '@/views/AboutMe.vue'
import ListPage from '@/components/game/ListPage'
import RunPage from '@/components/game/RunPage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect: '/home',
    children:[
      {
        path: 'home',
        name: 'home',
        component: Home
      },{
        path: 'bookDetail',
        name: 'bookDetail',
        component: BookDetail
      },{
        path: 'bookList',
        name: 'bookList',
        component: BookList
      },
      {
        path: 'articleList',
        name: 'articleList',   
        component: ArticleList
      },
      {
        path: 'articledetail',
        name: 'articleDetail',
        props: true,
        component: ArticleDetail
      },
      {
        path: 'gameListPage',
        name: 'gameListPage',
        component: ListPage
      },
      {
        path: 'run/:rom',
        name: 'RunPage',
        component: RunPage
      },
      {
        path: 'aboutMe',
        name: 'aboutMe',   
        component: AboutMe
      },
      {
        path: 'personCenter',
        name: 'personCenter',   
        component: personCenter,
        children:[
    
          {
          path: 'personinfo',
          name: 'personinfo',   
          component: Personinfo
        },{
          path: 'booktags',
          name: 'booktags',   
          component: booktags
          }
        ]
      },
      {
        path: 'aboutMe',
        name: 'aboutMe',   
        component: AboutMe
      },
      {
        path: 'scan',
        name: 'scan',
        component: scan
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  
 
]

const router = new VueRouter({
  routes,
  linkActiveClass:'active'
})

export default router
