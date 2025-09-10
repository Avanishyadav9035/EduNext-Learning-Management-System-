import React, { useState } from 'react'
import Topbar from '../Components/Topbar'
import Sidebar from '../Components/Sidebar'
import CourseForm from './CourseForm'
import CourseList from './CourseList'


const Courses = () => {
  const[courses, setCourses] = useState([])
  const[editIndex, setEditIndex] = useState(null)

  
  return (
    <div className='flex'>
        <Sidebar/>
      <div className='flex-1'>
        <Topbar/>
        <div>
          <h2 className='p-6'>All Courses Page</h2>
          <CourseForm  editIndex={editIndex} setEditIndex={setEditIndex} courses={courses} setCourses = {setCourses}/>
          <CourseList setEditIndex={setEditIndex} courses={courses} setCourses = {setCourses}/>
        </div>
      </div>
    </div>
  )
}

export default Courses
