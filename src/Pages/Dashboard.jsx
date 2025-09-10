import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { useEffect, useState } from "react";

function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(storedCourses);

    const storedProgress = JSON.parse(localStorage.getItem("courseProgress")) || {};
    setProgress(storedProgress);
  }, []);

  const totalCourses = enrolledCourses.length;
  const avgProgress =
    totalCourses > 0
      ? (Object.values(progress).reduce((a, b) => a + b, 0) / totalCourses).toFixed(1)
      : 0;

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Drawer Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Topbar with hamburger toggle */}
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-4 sm:p-6">
          {user?.role === "student" ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold">Welcome back, {user?.name}</h2>
              <p className="mt-2 sm:mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Here’s a quick summary of your learning journey.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-6">
                <div className="p-4 rounded-xl shadow bg-white">
                  <h3 className="text-base sm:text-lg font-semibold">Enrolled Courses</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-700">{totalCourses}</p>
                </div>
                <div className="p-4 rounded-xl shadow bg-white">
                  <h3 className="text-base sm:text-lg font-semibold">Avg. Progress</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{avgProgress}%</p>
                </div>
                <div className="p-4 rounded-xl shadow bg-white">
                  <h3 className="text-base sm:text-lg font-semibold">Certificates</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-700">0</p>
                  <p className="text-xs sm:text-sm text-blue-500">(coming soon)</p>
                </div>
              </div>

              {/* Continue Learning */}
              {enrolledCourses.length > 0 && (
                <div className="p-4 sm:p-6 rounded-xl shadow bg-white">
                  <h3 className="text-base sm:text-lg font-bold mb-4">Continue Learning</h3>
                  {enrolledCourses.map((course) => (
                    <div
                      className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4"
                      key={course.id}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{course.title}</h4>
                        <div className="bg-gray-200 h-2 rounded mt-1">
                          <div
                            className="bg-blue-500 h-2 rounded"
                            style={{ width: `${progress[course.id] || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                        Resume
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h2>
              <p className="mt-2 sm:mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                This is your dashboard overview. Charts and stats coming soon.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
