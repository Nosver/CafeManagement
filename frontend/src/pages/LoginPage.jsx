import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginButtonClicked = (event) => {
        event.preventDefault();

        if(email == "dogu@mail.com" && password == '1234'){
            return navigate('/homepage')
        }
    }



  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={loginButtonClicked}>
    
            <h2 className='text-3xl text-center font-semibold mb-6'>Login Screen</h2>

            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-700 font-bold mb-2'
              >
                Email
              </label>
              <textarea
                id='email'
                name='email'
                className='border rounded w-full py-2 px-3'
                rows='1'
                placeholder='Email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-gray-700 font-bold mb-2'
              >
                Password
              </label>
              <textarea
                id='password'
                name='password'
                className='border rounded w-full py-2 px-3'
                rows='1'
                placeholder='Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></textarea>
            </div>


            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Login
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )


}

export default LoginPage
