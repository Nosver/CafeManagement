import React from 'react'
import {Outlet} from 'react-router-dom'
import CustomerNavbar from '../components/CustomerNavbar'

const CustomerLayout = () => {
  return (
    <>
      <CustomerNavbar/>
      <Outlet/>
      
    </>
  )
}

export default CustomerLayout
