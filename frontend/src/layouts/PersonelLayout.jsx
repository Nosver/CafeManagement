import { Sidebar } from 'flowbite-react';
import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Cookies from 'js-cookie';

const PersonelLayout = () => {

  const ROLE = Cookies.get('role');

  if(ROLE !== "ADMIN" && ROLE !== "EMPLOYEE"){
    return (
      <div>
        <UnauthorizedPage />
      </div>
    );
  }

  return (
    <>
      <Outlet/>

    </>
  )
}

export default PersonelLayout
