import { createRouter, createWebHashHistory, RouterView } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      children: [
        {
					path: '/home',
					name: 'home',
					component: () => import('@/views/home/index.vue'),
        },
			]
		}
  ],
});
  
export default router;
