import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons

export default function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Courses", path: "/allcourses" },
    { name: "My Courses", path: "/my-courses" },
    { name: "Profile", path: "/profile" },
  ];

  const links1 = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Courses", path: "/courses" },
    { name: "Students", path: "/students" },
  ];

  const navLinks = user?.role === "student" ? links : links1;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 bg-gray-900 text-white min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-6">EduNext</h2>
        <ul>
          {navLinks.map((link) => (
            <li key={link.path} className="mb-3">
              <Link
                to={link.path}
                className={`block p-2 rounded ${
                  location.pathname === link.path
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-900 text-white w-64 p-4 z-40 md:hidden`}
      >
        <h2 className="text-2xl font-bold mb-6">EduNext</h2>
        <ul>
          {navLinks.map((link) => (
            <li key={link.path} className="mb-3">
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)} // close after clicking
                className={`block p-2 rounded ${
                  location.pathname === link.path
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul> 
      </div>
    </>
  );
}
