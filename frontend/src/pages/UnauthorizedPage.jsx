import React from 'react'
import Cookies from 'js-cookie';

function UnauthorizedPage() {
  console.log(Cookies.get('role'))
  return (
    <div className='flex w-full h-screen justify-center items-center'>
        <p>You are not authorized to see this page!</p>
    </div>
  )
}

export default UnauthorizedPage
