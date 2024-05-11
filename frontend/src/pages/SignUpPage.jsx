import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import background2 from "../img/cafe-2-bg.jpg";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [fullName, setfullName] = useState('');

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const signUpButtonClicked = (event) => {
    event.preventDefault();

    if (password != passwordRepeat) {
      toast.info("Passwords do not match!");
    }
    if (!isPasswordStrong(password)) {
      toast.info("Password should contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.");
    }

  }

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(true);

  return (
    <section className='bg-indigo-50'>
      <div style={{
        backgroundImage: `url(${background2})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(10px)',
        height: '100vh'
      }}>
        <div className='container m-auto max-w-2xl '>
          <div className='bg-white/60 px-6 py-4 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={signUpButtonClicked}>

              <h2 className='text-3xl text-center font-semibold mb-6'>Create Account</h2>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  id='fullNameField'
                  name='fullNameField'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='Full Name'
                  required
                  onChange={(event) => setfullName(event.target.value)}
                />
              </div>

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
                  Phone Number

                </label>
                <PhoneInput
                  country={'tr'}
                  value={phoneNumber}
                  onChange={handleChange}
                  inputStyle={{ width: '100%' }}
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
              <p className='text-center my-3'>Or</p>

              <div className="flex items-center justify-center dark:bg-gray-800">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    var response = jwtDecode(credentialResponse.credential)
                    console.log(response);
                    navigate('/welcome')
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>

            </form>
          </div>
        </div>


      </div>

    </section>
  )
}
