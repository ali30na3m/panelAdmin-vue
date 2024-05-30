import { createRouter, createWebHistory } from 'vue-router';
import type { Component } from 'vue'; 
import Home from '@/views/HomePanel.vue';
import Product from '@/views/ProductPanel.vue';
import Comments from '@/views/CommentsPanel.vue';
import Users from '@/views/UsersPanel.vue';
import Orders from '@/views/OrdersPanel.vue';
import Offs from '@/views/OffsPanel.vue';

interface RouterInfo {
    path: string;
    name: string;
    component: Component;
}

const routes: RouterInfo[] = [
    {
        path: '/',
        name: 'HomePanel',
        component: Home as Component
    },
    {
        path: '/products',
        name: 'ProductsPanel',
        component: Product as Component
    },
    {
        path: '/comments',
        name: 'CommentsPanel',
        component: Comments as Component
    },
    {
        path: '/users',
        name: 'UsersPanel',
        component: Users as Component
    },
    {
        path: '/orders',
        name: 'OrdersPanel',
        component: Orders as Component
    },
    {
        path: '/offs',
        name: 'OffsPanel',
        component: Offs as Component
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
