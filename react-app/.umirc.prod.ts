export default {
  // routes: [{ path: '/', component: 'index' }],
  plugins: ['@umijs/plugins/dist/dva'],
  dva: {
    immer: {
      enableES5: true,
      enableAllPlugins: true,
    },
  },
  define: {
    API_ENDPOINT: 'http://rsdn.site:8080',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/app',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
        },
        {
          path: 'new',
          component: '@/pages/new/index',
        },
        {
          path: '/:team/',
          component: '@/layouts/team',
          routes: [
            {
              path: '/:team/',
              component: '@/pages/$team/index',
            },
            {
              path: '/:team/settings',
              component: '@/pages/$team/settings',
            },
          ],
        },
        {
          path: '/:team/:project',
          component: '@/layouts/project',
          routes: [
            {
              path: '/:team/:project/',
              component: '@/pages/$team/$project/index',
            },
            {
              path: '/:team/:project/deployments',
              component: '@/pages/$team/$project/deployments/index',
            },
            {
              path: '/:team/:project/settings',
              component: '@/pages/$team/$project/settings/index',
            },
          ],
        },
      ],
    },
  ],
};
