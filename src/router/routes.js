const routes = [
  {
    path: '',
    redirect: {
      name: 'home',
    },
  },
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
  },
  {
    name: 'funnel',
    path: '/:slug',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Funnel.vue'),
  },
]

export default routes
