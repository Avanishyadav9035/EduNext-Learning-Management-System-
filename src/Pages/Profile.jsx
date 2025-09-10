import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    image: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (currentUser) {
      setUser(currentUser);
      setFormData(currentUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("loggedInUser", JSON.stringify(formData));
    toast.success("Profile updated!");
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg sm:text-xl text-center px-4">
          ⚠️ Please login to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar (hidden on mobile, shows on md+) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* Profile Card Center */}
        <div className="flex justify-center items-center flex-1 p-4 sm:p-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-6 w-full max-w-md sm:max-w-lg text-center">
            
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <img
                src={formData.image || "https://via.placeholder.com/120"}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border object-cover mb-3"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm"
                />
              )}
            </div>

            {/* Editable Fields */}
            <div className="space-y-3 text-left">
              <label className="block">
                <span className="font-bold">Name:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1 text-sm sm:text-base"
                  />
                ) : (
                  <span className="ml-2">{user.name}</span>
                )}
              </label>

              <label className="block">
                <span className="font-bold">Email:</span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1 text-sm sm:text-base"
                  />
                ) : (
                  <span className="ml-2">{user.email}</span>
                )}
              </label>

              <label className="block">
                <span className="font-bold">Role:</span>
                {isEditing ? (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1 text-sm sm:text-base"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <span className="ml-2">{user.role}</span>
                )}
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm sm:text-base"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
