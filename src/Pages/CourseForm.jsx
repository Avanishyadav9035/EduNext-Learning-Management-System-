import React, { useEffect, useState } from "react";

const CourseForm = ({ courses, setCourses, editIndex, setEditIndex }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [category, setCategory] = useState("Web Development");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editIndex !== null) {
      const course = courses[editIndex];
      setTitle(course.title);
      setDesc(course.desc);
      setLevel(course.level);
      setCategory(course.category);
      setImage(course.image || "");
    }
  }, [editIndex]);

  // Convert uploaded file to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = { title, desc, level, category, image };

    if (editIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[editIndex] = newCourse;
      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
      setEditIndex(null);
    } else {
      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }

    // reset
    setTitle("");
    setDesc("");
    setLevel("Beginner");
    setCategory("Web Development");
    setImage("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {editIndex !== null ? "Edit Course" : "Add New Course"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Course Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Level */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advance</option>
        </select>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Web Development</option>
          <option>Data Science</option>
          <option>UI/UX</option>
        </select>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Preview */}
        {image && (
          <div className="flex justify-center">
            <img
              src={image}
              alt="Preview"
              className="w-32 h-32 object-cover mb-2 rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow hover:from-indigo-600 hover:to-blue-500 transition"
        >
          {editIndex !== null ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
