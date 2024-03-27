import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginButtonClicked = (event) => {
        event.preventDefault();

        if(email == "dogu@mail.com" && password == '1234'){
          toast.success("You've successfully entered!", )
            return navigate('/homepage')
        }else{
          toast.info("email or password is incorrect!")
        }
        
    }

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit= {loginButtonClicked}>
    
            <h2 className='text-3xl text-center font-semibold mb-6'>Login Screen</h2>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Email
              </label>
              <input
                type='text'
                id='emailF'
                name='emailField'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Email'
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Password
              </label>
              <input
                type='password'
                id='passF'
                name='passwordField'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Password'
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <p className='text-center mb-3'>Don't have an account yet?<Link className='text-indigo-500 hover:italic' to="/SignUpPage"> Sign Up</Link></p>


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
