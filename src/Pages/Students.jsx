import React from 'react'
import Sidebar from '../Components/Sidebar'
import Topbar from '../Components/Topbar'

const Students = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div>
        <Sidebar/>
      </div>
      <div className='flex-1'> 
        <Topbar/>
      </div>
    </div>
  )
}

export default Students
