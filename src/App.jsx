import { Navigate, Route, Routes } from "react-router-dom"

import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Courses from "./Pages/Courses"
import MyCourses from "./Pages/MyCourses"
import Profile from "./Pages/Profile"
import { useState } from "react"
import Dashboard from "./Pages/Dashboard"
import Students from "./Pages/Students"
import AllCourses from "./Pages/AllCourses"
import toast, { Toaster } from "react-hot-toast"


const PrivateRoute = ({ children})=>{
    const user  = JSON.parse(localStorage.getItem("loggedInUser"))
    
     return user?children:<Navigate to="/login"/>
}

const App = ()=>{

  return(
    <div>
      <Toaster/>
     <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={
        <PrivateRoute>
           <Dashboard/>
        </PrivateRoute>
      }/>
      
      <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <PrivateRoute>
              <MyCourses />
            </PrivateRoute>
          }
        />
        <Route path="/allcourses" element={
          <PrivateRoute>
            <AllCourses/>
          </PrivateRoute>
        }/>

        

        <Route path="/students" element={
          <PrivateRoute>
            <Students/>
          </PrivateRoute>
        }/>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      <Route path="*" element={<Navigate to ="/login"/>}/>
     </Routes>
    </div>
  )
}
export default App