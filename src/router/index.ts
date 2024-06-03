import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'
import Product from '@/views/Product/ProductPanel.vue'
import Comments from '@/views/comments/CommentsPanel.vue'
import Users from '@/views/users/UsersPanel.vue'
import Orders from '@/views/orders/OrdersPanel.vue'
import Offs from '@/views/offs/OffsPanel.vue'
import { faBasketShopping, faComment, faUser, faArrowRightArrowLeft, faDollar } from '@fortawesome/free-solid-svg-icons' 

export const routes = [
  {
    path: '/products',
    name: 'محصولات',
    component: Product as Component,
    icon:faBasketShopping,
    meta: {
      isSideBar: true
    }
  },
  {
    path: '/comments',
    name: 'کامنت ها',
    component: Comments as Component,
    icon:faComment,
    meta: {
      isSideBar: true
    }
  },
  {
    path: '/users',
    name: 'کاربران',
    component: Users as Component,
    icon:faUser,
    meta: {
      isSideBar: true
    }
  },
  {
    path: '/orders',
    name: 'سفارشات',
    component: Orders as Component,
    icon:faArrowRightArrowLeft,
    meta: {
      isSideBar: true
    }
  },
  {
    path: '/offs',
    name: 'تخفیفات',
    component: Offs as Component,

    icon:faDollar,
    meta: {
      isSideBar: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
