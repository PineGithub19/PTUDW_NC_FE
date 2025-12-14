import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusCircle,
  faCrown,
  faArrowLeft,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import {
  useCreateCourse,
  useFetchInstructors,
  useFetchLevels,
} from "@/hooks/demo/course-hooks";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "../custom-ui/toast";
import { Link } from "react-router-dom";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  image_url: z.url("Invalid URL format"),
  instructor_id: z.string().min(1, "Instructor is required"),
  rating: z
    .number({ message: "Rating must be a number" })
    .min(0, "Rating must be at least 0.0")
    .max(5, "Rating cannot exceed 5.0"),
  total_reviews: z
    .number({ message: "Total Reviews must be a number" })
    .min(0, "Total Reviews cannot be negative"),
  total_hours: z
    .number({ message: "Total Hours must be a number" })
    .min(0, "Total Hours cannot be negative"),
  total_lectures: z
    .number({ message: "Total Lectures must be a number" })
    .min(0, "Total Lectures cannot be negative"),
  level_id: z.string().min(1, "Level is required"),
  current_price: z
    .number({ message: "Current Price must be a number" })
    .min(0, "Current Price cannot be negative"),
  original_price: z
    .number({ message: "Original Price must be a number" })
    .min(0, "Original Price cannot be negative"),
  is_bestseller: z.boolean().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

function CourseCreatePage() {
  const { data: instructors } = useFetchInstructors();
  const { data: levels } = useFetchLevels();
  const { mutate } = useCreateCourse();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const handleResetForm = () => {
    reset();
  };

  const onSubmit = (data: CourseFormData) => {
    mutate(data, {
      onSuccess: () => {
        toastSuccess("Course created successfully!");
        handleResetForm();
      },
      onError: (error) => {
        toastError(error);
      },
    });
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="mr-2 text-blue-600"
            />
            Create New Course
          </h1>
          <p className="text-gray-600">
            Fill in the information below to create a new course
          </p>
        </div>

        <form
          id="courseForm"
          className="bg-white rounded-lg shadow-md p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              autoFocus
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Complete Python Programming MasterclassName 2025"
              required
              {...register("title")}
            />
            {errors.title && (
              <p className="text-destructive text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Course Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what students will learn in this course..."
              required
              {...register("description")}
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">Minimum 50 characters</p>
            {errors.description && (
              <p className="text-destructive text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Course Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/course-image.jpg"
              required
              {...register("image_url")}
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter a valid image URL
            </p>
            {errors.image_url && (
              <p className="text-destructive text-xs">
                {errors.image_url.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Instructor <span className="text-red-500">*</span>
            </label>
            <select
              id="instructorId"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              {...register("instructor_id")}
            >
              <option value="">-- Select Instructor --</option>
              {instructors &&
                instructors.length > 0 &&
                instructors.map((instructor) => (
                  <option
                    key={instructor.instructor_id}
                    value={instructor.instructor_id}
                  >
                    {instructor.name}
                  </option>
                ))}
            </select>
            {errors.instructor_id && (
              <p className="text-destructive text-xs">
                {errors.instructor_id.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="rating"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="4.5"
                required
                {...register("rating", { valueAsNumber: true })}
              />
              <p className="text-sm text-gray-500 mt-1">From 0.0 to 5.0</p>
              {errors.rating && (
                <p className="text-destructive text-xs">
                  {errors.rating.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Total Reviews <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="totalReviews"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="150"
                required
                {...register("total_reviews", { valueAsNumber: true })}
              />
              {errors.total_reviews && (
                <p className="text-destructive text-xs">
                  {errors.total_reviews.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Total Hours <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="totalHours"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10.5"
                required
                {...register("total_hours", { valueAsNumber: true })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Course duration in hours
              </p>
              {errors.total_hours && (
                <p className="text-destructive text-xs">
                  {errors.total_hours.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Total Lectures <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="totalLectures"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="45"
                required
                {...register("total_lectures", { valueAsNumber: true })}
              />
              {errors.total_lectures && (
                <p className="text-destructive text-xs">
                  {errors.total_lectures.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Course Level <span className="text-red-500">*</span>
            </label>
            <select
              id="level"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              {...register("level_id")}
            >
              <option value="">-- Select Level --</option>
              {levels &&
                levels.length > 0 &&
                levels.map((level) => (
                  <option key={level.level_id} value={level.level_id}>
                    {level.name}
                  </option>
                ))}
            </select>
            {errors.level_id && (
              <p className="text-destructive text-xs">
                {errors.level_id.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Current Price (VND) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₫
                </span>
                <input
                  type="text"
                  id="currentPrice"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="279000"
                  required
                  {...register("current_price", { valueAsNumber: true })}
                />
                {errors.current_price && (
                  <p className="text-destructive text-xs">
                    {errors.current_price.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Original Price (VND) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₫
                </span>
                <input
                  type="text"
                  id="originalPrice"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="399000"
                  required
                  {...register("original_price", { valueAsNumber: true })}
                />
                {errors.original_price && (
                  <p className="text-destructive text-xs">
                    {errors.original_price.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="isBestseller"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                {...register("is_bestseller")}
              />
              <span className="ml-3 text-gray-700 font-semibold">
                <FontAwesomeIcon
                  icon={faCrown}
                  className="text-yellow-500 mr-1"
                />
                Mark as Bestseller
              </span>
            </label>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link
              to="/demo/courses"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back
            </Link>
            <button
              type="reset"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Reset Form
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseCreatePage;
