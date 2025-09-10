import React from "react";

const CourseList = ({ courses, setCourses, setEditIndex }) => {
  const handleDelete = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  return (
    <div className="mt-6 p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        📚 Available Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No courses available. Add a new course to get started!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col"
            >
              {/* Thumbnail */}
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}

              {/* Course Info */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex-1">
                {course.desc}
              </p>

              <div className="flex items-center gap-3 mt-3 text-sm">
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-lg text-xs">
                  {course.level}
                </span>
                <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-lg text-xs">
                  {course.category}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setEditIndex(index)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg shadow hover:from-emerald-600 hover:to-green-500 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg shadow hover:from-pink-600 hover:to-red-500 transition"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
