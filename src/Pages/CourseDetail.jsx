// CourseDetail.jsx
import React from "react";
import toast from "react-hot-toast";
import courses from "../Data/courseData";

const CourseDetail = ({ id, onBack }) => {
  const course = courses.find((c) => c.id === id);

  if (!course) return <h2 className="text-center text-red-500">Course not found!</h2>;

  const handleEnroll = () => {
    let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    if (enrolled.find((c) => c.id === course.id)) {
      toast.error("You have already enrolled!");
    } else {
      enrolled.push(course);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
      toast.success("Enroll Successfully!");
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-6">
      {/* Course Image */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-xl"
      />

      {/* Course Info */}
      <div className="mt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          {course.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
          {course.description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
        <button
          onClick={onBack}
          className="w-full sm:w-1/2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white 
                     font-semibold py-2 px-4 rounded-xl shadow hover:bg-gray-300 dark:hover:bg-gray-600 
                     transition"
        >
          Back
        </button>
        <button
          onClick={handleEnroll}
          className="w-full sm:w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                     font-semibold py-2 px-4 rounded-xl shadow hover:from-indigo-600 hover:to-blue-500 
                     transition"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
