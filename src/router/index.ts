import { createRouter, createWebHistory } from 'vue-router';
import type { Component } from 'vue'; 
import Home from '@/views/HomePanel.vue';
import Product from '@/views/Product/ProductPanel.vue';
import Comments from '@/views/comments/CommentsPanel.vue';
import Users from '@/views/users/UsersPanel.vue';
import Orders from '@/views/orders/OrdersPanel.vue';
import Offs from '@/views/offs/OffsPanel.vue';
import {
  CommentOutlined,
  DollarOutlined,
  FallOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

export const routes = [
    {
        path: '/',
        name: 'خانه',
        component: Home as Component ,
        meta : {
            isSideBar : true,
            icon: HomeOutlined
        }
    },
    {
        path: '/products',
        name: 'محصولات',
        component: Product as Component,
        meta : {
            isSideBar : true,
            icon: DollarOutlined 
        }
    },
    {
        path: '/comments',
        name: 'کامنت ها',
        component: Comments as Component,
        meta : {
            isSideBar : true,
            icon: CommentOutlined 
        }
    },
    {
        path: '/users',
        name: 'کاربران',
        component: Users as Component,
        meta : {
            isSideBar : true,
            icon: UserOutlined 
        }
    },
    {
        path: '/orders',
        name: 'سفارشات',
        component: Orders as Component,
        meta : {
            isSideBar : true,
            icon: DollarOutlined 
        }
    },
    {
        path: '/offs',
        name: 'تخفیفات',
        component: Offs as Component,
        meta : {
            isSideBar : true,
            icon: FallOutlined
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
