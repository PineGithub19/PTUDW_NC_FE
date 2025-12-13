import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingPage from "../layouts/LoadingPage";
import CommonLayout from "../layouts/CommonLayout";
import ErrorPage from "../layouts/ErrorPage";
import { lazy } from "react";

const CoursesPage = lazy(() => import("@/components/demo/CoursesPage"));
const CourseCreatePage = lazy(
  () => import("@/components/demo/CourseCreatePage")
);
const CourseDetailsPage = lazy(
  () => import("@/components/demo/CourseDetailsPage")
);

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
      },
      {
        path: "courses/:courseId",
        element: <CourseDetailsPage />,
      },
    ],
  },
]);

export default routers;
