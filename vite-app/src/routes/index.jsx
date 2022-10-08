import { Suspense } from 'react';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';

const routes = () => [
  {
    path: '/login',
    element: (
      <Suspense fallback={'Loading...'}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={'Loading...'}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={'Loading...'}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
