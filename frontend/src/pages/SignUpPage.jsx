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
import Cookies from 'js-cookie';



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

  const signUpButtonClicked = async (event) => {
    event.preventDefault();

    if (password != passwordRepeat) {
      toast.info("Passwords do not match!");
      return
    }
    if (!isPasswordStrong(password)) {
      toast.info("Password should contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.");
      return
    }
    const requestBody={
        email:email,
        password:password,
        fullName:fullName,
        phoneNumber:phoneNumber,
        role:"CUSTOMER"

    }
    const response = await fetch('http://localhost:8080/registerCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();

      if(responseData.message=="User already exist"){ 
        toast.warn("You have already registered!");
        return
      }
      toast.info("verification email is sent, please check your inbox")

  }

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const handleSuccess = async (credentialResponse) =>{
      const token = credentialResponse.credential; 
      const decodedToken = jwtDecode(token);
      const requestBody = {
        email: decodedToken.email,
        fullName: decodedToken.name,
        avatar: decodedToken.picture
      };

      
      const response2 = await fetch('http://localhost:8080/googleLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Set cookie
      const responseData = await response2.json();
      const token2 = responseData.token;
      const role= responseData.role;
      Cookies.set('token', token2)
      Cookies.set('role', role)

      navigate('/welcome')
    
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(true);

  return (
    <section className='bg-indigo-50'>
      <div style={{
       
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(10px)',
        height: '100vh'
      }}>
        <div className='container m-auto max-w-2xl'>
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
                  onSuccess={handleSuccess}
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
