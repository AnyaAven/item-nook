import { BaseLayout } from '@/layouts/BaseLayout'
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RouteLoading } from "@/components/RouteLoading";
import { NotFound } from "@/pages/NotFound"

const Home = React.lazy(() => import('@/pages/Home'));
const Other = React.lazy(() => import('@/pages/Other'));
// const Login = React.lazy(() => import('@/pages/Login'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<BaseLayout />}
        >
            <Route
                index
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <Home />
                    </React.Suspense>
                }
            />
            <Route
                path="other"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <Other />
                    </React.Suspense>
                }
            />
            {/*<Route*/}
            {/*    path="/login"*/}
            {/*    element={*/}
            {/*        <React.Suspense fallback={<RouteLoading />}>*/}
            {/*            <Login />*/}
            {/*        </React.Suspense>*/}
            {/*    }*/}
            {/*/>*/}
            <Route
                path="*"
                element={<NotFound />}
            />
        </Route>
    )
);

export default router;
