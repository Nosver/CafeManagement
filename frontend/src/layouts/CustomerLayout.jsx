import React from 'react'
import {Outlet} from 'react-router-dom'
import CustomerNavbar from '../components/Customer/CustomerNavbar'
import CustomerFooter from '../components/Customer/CustomerFooter'

const CustomerLayout = () => {
  return (
    <>
      <CustomerNavbar/>
      <Outlet/>
      <CustomerFooter/>
        
    </>
  )
}

export default CustomerLayout
