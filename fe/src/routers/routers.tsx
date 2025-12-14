import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingPage from "../layouts/LoadingPage";
import CommonLayout from "../layouts/CommonLayout";
import ErrorPage from "../layouts/ErrorPage";
import { lazy } from "react";
import { ProtectedRouteWithSession } from "./protected-route";

const CoursesPage = lazy(() => import("@/components/demo/courses/CoursesPage"));
const CourseCreatePage = lazy(
  () => import("@/components/demo/courses/CourseCreatePage")
);
const CourseDetailsPage = lazy(
  () => import("@/components/demo/courses/CourseDetailsPage")
);

const SignInPage = lazy(() => import("@/components/demo/auth/SignInForm"));
const SignUpPage = lazy(() => import("@/components/demo/auth/SignUpForm"));

const routers = createBrowserRouter([
  {
    path: "/demo",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <CommonLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "courses/create",
        element: <CourseCreatePage />,
        loader: ProtectedRouteWithSession,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetailsPage />,
      },
      {
        path: "auth/login",
        element: <SignInPage />,
      },
      {
        path: "auth/register",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default routers;
