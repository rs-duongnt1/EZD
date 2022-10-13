import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Repository from "../pages/repository";
import Deployment from "../pages/repository/deployment";
import Overview from "../pages/repository/overview";
import Sources from "../pages/repository/sources";
import Lozenge from "@atlaskit/lozenge";
import Spinner from "@atlaskit/spinner";
import CreateOrg from "../pages/org/create";
import CreateRepo from "../pages/repository/create";

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
      <Suspense fallback={<Spinner size="medium" />}>
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
        path: "org/create",
        element: (
          <Suspense fallback={"Loading..."}>
            <CreateOrg />
          </Suspense>
        ),
      },
      {
        path: "repo/create",
        element: (
          <Suspense fallback={"Loading..."}>
            <CreateRepo />
          </Suspense>
        ),
      },
      {
        path: "/:org/:repo",
        element: (
          <Suspense fallback={<Spinner size="small" />}>
            <Repository />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="overview" replace />,
          },
          {
            path: "overview",
            element: (
              <Suspense fallback={"Loading..."}>
                <Overview />
              </Suspense>
            ),
          },
          {
            path: "deployments",
            element: (
              <Suspense fallback={"Loading..."}>
                <Deployment />
              </Suspense>
            ),
          },
          {
            path: "sources",
            element: (
              <Suspense fallback={<Spinner size="small" />}>
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
