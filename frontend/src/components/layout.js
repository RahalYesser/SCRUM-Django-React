import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar.js'
import Navbar from './navbar.js'

const Layout = () => {
  return (
    <>       
        <Navbar/>
        <Sidebar/>
    </>

  )
}

export default Layout