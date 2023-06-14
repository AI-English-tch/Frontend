import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import BaseLayout from '../layout/BaseLayout.vue';
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: BaseLayout,
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('../views/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/public/login.vue'),
    },
  ],
});

export const setupRouter = (app: App) => {
  app.use(router);
};

export default router;
