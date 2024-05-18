import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import background2 from "../img/cafe-2-bg.jpg";
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginButtonClicked = async (event) => {
    event.preventDefault();
    console.log(email)
    
    console.log(password)
  
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const responseData = await response.json();
      
      const token = responseData.token;
      const role= responseData.role;
      Cookies.set('token', token)
      Cookies.set('role', role)
      toast.success("You've successfully entered!");
      if (responseData.role === 'ADMIN' || responseData.role === 'EMPLOYEE') {
        navigate('/dashboard');
      } else {
        navigate('/homepage');
      }

      
    } catch (error) {
      toast.error('wrong email or password');
      console.error('Error logging in:', error);
    }
  };

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential; 
      const decodedToken = jwtDecode(token);
      const requestBody = {
        email: decodedToken.email,
      };
      const response = await fetch('http://localhost:8080/googleLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error("Account not found please try registering")
        throw new Error('Failed to authenticate with server');
      }
      Cookies.set("token",responseData.token)
      Cookies.set('role', "CUSTOMER")

      navigate('/welcome');
    } catch (error) {
      
    }
  };

  

  return (
    <section style={{
      
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backdropFilter: 'blur(10px)',
      height: '100vh'
    }} className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white/60 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={loginButtonClicked}>

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

              <div className="flex items-center justify-center dark:bg-gray-800 mt-4">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              </div>
                
            </div>

          </form>
        </div>
      </div>
    </section>
  )

}

export default LoginPage
