// MyCourses.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [completedLessons, setCompletedLessons] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar state

  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(storedCourses);

    const storedProgress =
      JSON.parse(localStorage.getItem("courseProgress")) || {};
    setProgress(storedProgress);

    const storedLessons =
      JSON.parse(localStorage.getItem("completedLessons")) || {};
    setCompletedLessons(storedLessons);
  }, []);

  // update progress for local MP4
  const handleProgress = (courseId, e) => {
    const video = e.target;
    const percent = (video.currentTime / video.duration) * 100;

    setProgress((prev) => {
      const updated = { ...prev, [courseId]: percent };
      localStorage.setItem("courseProgress", JSON.stringify(updated));
      return updated;
    });
  };

  // mark lesson completed (YouTube)
  const handleLessonClick = (courseId, lesson) => {
    setActiveLesson(lesson.url);

    setCompletedLessons((prev) => {
      const courseLessons = prev[courseId] || [];
      if (!courseLessons.includes(lesson.id)) {
        const updatedLessons = {
          ...prev,
          [courseId]: [...courseLessons, lesson.id],
        };

        const course = enrolledCourses.find((c) => c.id === courseId);
        if (course && course.lessons) {
          const percent =
            (updatedLessons[courseId].length / course.lessons.length) * 100;

          setProgress((prevProg) => {
            const updatedProg = { ...prevProg, [courseId]: percent };
            localStorage.setItem(
              "courseProgress",
              JSON.stringify(updatedProg)
            );
            return updatedProg;
          });
        }

        localStorage.setItem("completedLessons", JSON.stringify(updatedLessons));
        return updatedLessons;
      }
      return prev;
    });
  };

  const getYoutubeEmbedUrl = (url) => {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Topbar with toggle */}
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center md:text-left">
            My Enrolled Courses
          </h2>

          {enrolledCourses.length === 0 ? (
            <p className="text-center text-gray-600">No courses enrolled yet.</p>
          ) : (
            <>
              {/* COURSE CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border p-4 rounded-xl shadow-md bg-white flex flex-col"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-40 sm:h-48 object-cover rounded mb-2"
                    />
                    <h3 className="font-bold text-base sm:text-lg">
                      {course.title}
                    </h3>
                    <p className="text-sm sm:text-md text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4">
                      Instructor: {course.instructor}
                    </p>

                    {/* Progress Bar */}
                    <div className="bg-gray-200 h-2 rounded mb-4">
                      <div
                        className="bg-blue-500 h-2 rounded"
                        style={{ width: `${progress[course.id] || 0}%` }}
                      ></div>
                    </div>

                    <button
                      onClick={() =>
                        setActiveCourse(
                          activeCourse?.id === course.id ? null : course
                        )
                      }
                      className="mt-auto w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:from-indigo-600 hover:to-blue-500 transition"
                    >
                      {activeCourse?.id === course.id
                        ? "Hide"
                        : "Start Learning"}
                    </button>
                  </div>
                ))}
              </div>

              {/* PLAYER AREA BELOW CARDS */}
              {activeCourse && (
                <div className="mt-8 p-4 sm:p-6 border rounded-xl shadow bg-white">
                  <h3 className="text-base sm:text-lg font-bold mb-4">
                    {activeCourse.title} - Learning Area
                  </h3>

                  {/* Local MP4 video */}
                  {activeCourse.videoUrl && (
                    <video
                      className="w-full rounded-lg"
                      controls
                      autoPlay
                      onTimeUpdate={(e) => handleProgress(activeCourse.id, e)}
                    >
                      <source src={activeCourse.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {/* YouTube Lessons */}
                  {activeCourse.lessons && (
                    <div>
                      <h4 className="font-semibold mt-4">Lessons</h4>
                      <ul className="space-y-2 mt-2">
                        {activeCourse.lessons.map((lesson) => (
                          <li key={lesson.id}>
                            <button
                              onClick={() =>
                                handleLessonClick(activeCourse.id, lesson)
                              }
                              className={`text-sm sm:text-base underline ${
                                completedLessons[activeCourse.id]?.includes(
                                  lesson.id
                                )
                                  ? "text-green-600"
                                  : "text-blue-600 hover:text-indigo-700"
                              }`}
                            >
                              {lesson.title}
                            </button>
                          </li>
                        ))}
                      </ul>

                      {activeLesson && (
                        <div className="mt-4">
                          <div className="relative w-full pb-[56.25%]">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full rounded-lg"
                              src={getYoutubeEmbedUrl(activeLesson)}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
