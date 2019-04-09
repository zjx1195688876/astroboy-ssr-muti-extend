import Vue from 'vue';
import Router from 'vue-router';

// 代码分割
const Index = () => import('./container/Index.vue');
const Detail = () => import('./container/Detail.vue');
const TestPage = () => import('./container/test-page/index.vue');

const routes = [
  {
    path: '/test-spa/index',
    name: 'index',
    component: Index
  },
  { 
    path: '/test-spa/detail',
    name: 'detail',
    component: Detail
  },
  { 
    path: '/test-spa/test-page',
    name: 'test-page',
    component: TestPage
  },
];

Vue.use(Router);

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes
  });

  return router;
};
