import { Link, useNavigate } from "react-router-dom";
import CourseItem from "./CourseItem";
import {
  useFetchCourses,
  useFetchInstructors,
  useFetchLevels,
} from "@/hooks/demo/course-hooks";
import { useState, useMemo } from "react";
import CustomPagination from "../../custom-ui/custom-pagination";
import { useSignOut } from "@/hooks/auth-session-hooks";

function CoursesPage() {
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 7;
  const [page, setPage] = useState(0);

  const { data: courses, isLoading } = useFetchCourses(page, ITEMS_PER_PAGE);
  const { data: instructors } = useFetchInstructors();
  const { data: levels } = useFetchLevels();

  // Combine course data with instructor and level names
  const data = useMemo(
    () =>
      courses && courses.data && instructors && levels
        ? courses.data.map((course) => {
            const instructor = instructors.find(
              (inst) => inst.instructor_id === course.instructor_id
            );
            const level = levels.find((lv) => lv.level_id === course.level_id);

            return {
              ...course,
              instructor_name: instructor
                ? instructor.name
                : "Unknown Instructor",
              level_name: level ? level.name : "Unknown Level",
            };
          })
        : [],
    [courses, instructors, levels]
  );

  const totalPages = Math.ceil((courses?.count ?? 0) / ITEMS_PER_PAGE);

  // Logout
  const { mutate } = useSignOut();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/demo/auth/login");
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <i className="fas fa-graduation-cap text-blue-600 mr-2"></i>
            All Courses
          </h1>
          <p className="text-gray-600">
            Browse and explore our collection of courses
          </p>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="text-md font-bold text-white bg-black px-4 py-3 rounded-md mr-4"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link
            to="/demo/courses/create"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <i className="fas fa-plus-circle"></i>
            <span>Create New Course</span>
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="text-center text-gray-600">Loading courses...</div>
      )}
      {!isLoading &&
        data &&
        data.length > 0 &&
        data.map((course) => (
          <CourseItem key={course.course_id} data={course} />
        ))}

      <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mt-10 text-sm">
        <span className="text-gray-600">
          Showing {page * ITEMS_PER_PAGE + 1}-
          {Math.min((page + 1) * ITEMS_PER_PAGE, data.length)} of{" "}
          {courses?.count} courses
        </span>
        <CustomPagination
          className="inline-flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </nav>
    </div>
  );
}

export default CoursesPage;
