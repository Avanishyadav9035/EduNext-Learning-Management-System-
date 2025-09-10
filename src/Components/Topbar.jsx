import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Topbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("loggedInUser"))
  const [dark, setDark] = useState(false)

  const logout = () => {
    localStorage.removeItem("loggedInUser")
    navigate("/login")
  }

  const toggletheme = () => {
    setDark(!dark)
    document.documentElement.classList.toggle("dark") 
  }

  return (
    <div className="flex flex-wrap justify-between items-center bg-gray-200 dark:bg-gray-800 p-4 shadow">
      {/* Left Side: Greeting */}
      <h1 className="text-xl md:text-2xl font-bold dark:text-white mb-2 md:mb-0">
        {user?.role === "student"
          ? `Dear, ${user?.name}`
          : `Welcome, ${user?.name}`}
      </h1>

      {/* Right Side: Buttons */}
      <div className="flex flex-wrap gap-2 md:gap-4">
        <button
          className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm md:text-base"
          onClick={toggletheme}
        >
          {dark ? "Light" : "Dark"}
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm md:text-base"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Topbar
