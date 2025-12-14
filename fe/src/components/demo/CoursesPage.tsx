import { Link } from "react-router-dom";
import CourseItem from "./CourseItem";
import {
  useFetchCourses,
  useFetchInstructors,
  useFetchLevels,
} from "@/hooks/demo/course-hooks";

function CoursesPage() {
  const { data: courses } = useFetchCourses();
  const { data: instructors } = useFetchInstructors();
  const { data: levels } = useFetchLevels();

  const data =
    courses && instructors && levels
      ? courses.map((course) => {
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
      : [];

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
        <Link
          to="/demo/courses/create"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <i className="fas fa-plus-circle"></i>
          <span>Create New Course</span>
        </Link>
      </div>

      {data &&
        data.length > 0 &&
        data.map((course) => <CourseItem key={course.id} data={course} />)}

      <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mt-10 text-sm">
        <span className="text-gray-600">Showing 1-7 of 42 courses</span>
        <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <button className="px-4 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
            <i className="fas fa-chevron-left mr-2 text-xs"></i>
            Previous
          </button>

          <div className="flex divide-x divide-gray-200 text-gray-700">
            <button className="px-4 py-2 font-semibold bg-blue-50 text-blue-600">
              1
            </button>
            <button className="px-4 py-2 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 hover:bg-gray-50 transition-colors">
              3
            </button>
            <span className="px-4 py-2 text-gray-400">...</span>
            <button className="px-4 py-2 hover:bg-gray-50 transition-colors">
              6
            </button>
          </div>

          <button className="px-4 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
            Next
            <i className="fas fa-chevron-right ml-2 text-xs"></i>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default CoursesPage;
