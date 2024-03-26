import React from 'react'
import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
      <Outlet/>
      <ToastContainer 
      position='top-center'
      autoClose = {2500}
      hideProgressBar = {true}
      pauseOnHover = {false}
      />

    </>
  )
}

export default MainLayout
