import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Topbar from '../Components/Topbar'
import courses from '../Data/courseData'
import CourseDetail from './CourseDetail'

const AllCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex-1 overflow-y-auto">
          <h2 className="p-4 sm:p-6 text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            All Courses
          </h2>

          {!selectedCourse ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 pb-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl 
                             transform hover:scale-105 transition cursor-pointer overflow-hidden"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-40 sm:h-48 w-full object-cover rounded-t-2xl"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                      {course.title}
                    </h3>
                    <p className="text-sm sm:text-md text-gray-600 dark:text-gray-400 mt-1">
                      {course.instructor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 sm:px-6 pb-6">
              <CourseDetail
                id={selectedCourse}
                onBack={() => setSelectedCourse(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllCourses
