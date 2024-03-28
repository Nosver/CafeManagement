import React from 'react'
import {Outlet} from 'react-router-dom'
import CustomerNavbar from '../components/CustomerNavbar'

const CustomerLayout = () => {
  return (
    <>
      <Outlet/>
      <CustomerNavbar/>
    </>
  )
}

export default CustomerLayout
