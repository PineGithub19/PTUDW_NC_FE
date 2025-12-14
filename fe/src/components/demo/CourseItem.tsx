function CourseItem({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mb-6 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <img
            src={data.image_url}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <i className="fas fa-book-open text-white text-2xl drop-shadow-lg"></i>
            <i className="fas fa-bullhorn text-white text-2xl drop-shadow-lg"></i>
          </div>
          <div className="absolute bottom-4 left-4">
            <i className="fas fa-chart-line text-white text-2xl drop-shadow-lg"></i>
          </div>
          <div className="absolute bottom-4 right-4">
            <i className="fab fa-youtube text-white text-3xl drop-shadow-lg"></i>
          </div>
        </div>

        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {data.title}
            </h2>
            <p className="text-gray-600 mb-3">{data.description}</p>
            <p className="text-sm text-gray-700 mb-2">{data.instructor_name}</p>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-600 font-bold">4.7</span>
              <div className="flex text-orange-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="text-gray-600 text-sm">(337)</span>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span>{data.total_hours} total hour</span>
              <span>•</span>
              <span>{data.total_lectures} lectures</span>
              <span>•</span>
              <span>{data.level_name}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-2xl font-bold text-gray-900">
              ₫{data.current_price}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ₫{data.original_price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
