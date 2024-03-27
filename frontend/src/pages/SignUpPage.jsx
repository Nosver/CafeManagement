import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function isPasswordStrong(password) {
    // Criteria for a strong password
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    // Check if password meets all criteria
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

export const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const signUpButtonClicked =(event)=>{
        event.preventDefault();

        if(password!=passwordRepeat){
            toast.info("Passwords do not match!");
        }
        if(!isPasswordStrong(password)){
            toast.info("Password should contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.");
        }

    }
    
  return (
    <section className='bg-indigo-50'>
    <div className='container m-auto max-w-2xl py-24'>
      <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
        <form onSubmit={signUpButtonClicked}>
  
          <h2 className='text-3xl text-center font-semibold mb-6'>Create Account</h2>

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

          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>
              Repeat Password
            </label>
            <input
              type='password'
              id='passFR'
              name='passwordField'
              className='border rounded w-full py-2 px-3 mb-2'
              placeholder='Password'
              required
              onChange={(event) => setPasswordRepeat(event.target.value)}
            />
          </div>

          <p className='text-center mb-3'>Already have an account click <Link className='text-indigo-500 hover:italic' to="/LoginPage">here</Link></p>

          <div>
            <button
              className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Sign up
            </button>
          </div>

          <div className="flex items-center justify-center dark:bg-gray-800 mt-7">
            <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                <span>Continue with Google</span>
            </button>
        </div>

        </form>
      </div>
    </div>
  </section>
  )
}
