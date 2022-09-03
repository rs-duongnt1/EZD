import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        {
          path: 'dashboard',
          component: '@/pages/dashboard',
        },
        {
          path: 'new',
          component: '@/pages/new',
        },
        {
          path: ':team/:project_name',
          component: '@/pages/projects/detail',
        },
        {
          path: 'settings',
          component: '@/pages/settings/index',
        },
      ],
    },
  ],
  fastRefresh: {},
});
