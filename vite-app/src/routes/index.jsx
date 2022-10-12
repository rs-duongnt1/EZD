import { Suspense } from "react";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Repository from "../pages/repository";
import Overview from "../pages/repository/overview";
import Sources from "../pages/repository/sources";

const routes = () => [
  {
    path: "/login",
    element: (
      <Suspense fallback={"Loading..."}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={"Loading..."}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={"Loading..."}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/:org/:repo",
        element: (
          <Suspense fallback={"Loading..."}>
            <Repository />
          </Suspense>
        ),
        children: [
          {
            path: "overview",
            element: (
              <Suspense fallback={"Loading..."}>
                <Overview />
              </Suspense>
            ),
          },
          {
            path: "sources",
            element: (
              <Suspense fallback={"Loading..."}>
                <Sources />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export default routes;
