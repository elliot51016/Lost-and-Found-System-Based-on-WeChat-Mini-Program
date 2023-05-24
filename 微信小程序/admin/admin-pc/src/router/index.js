import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home',
  },
  {
    path: '/login',
    name: 'login',
    //懒加载对性能优化
    component: ()=> import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: ()=> import('../views/Home.vue'),
    redirect:'/findPerson',
    children:[
      {
        path: '/findGoods',
        name: 'findGoods',
        // component: ()=> import('../views/FindGoods.vue'),
        component: ()=> import('../views/FindGoods.vue'),
      },
      {
        path: '/findPerson',
        name: 'findPerson',
        // component: ()=> import('../views/FindPerson.vue'),
        component: ()=> import('../views/FindPerson.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: ()=> import('../views/User.vue'),
      },
      {
        path: '/admin',
        name: 'admin',
        component: ()=> import('../views/Admin.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
