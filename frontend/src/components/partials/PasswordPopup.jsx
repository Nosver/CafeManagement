import React, { useState, useEffect } from 'react';
import 'flowbite';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
export const PasswordPopup = ({ closePopup }) => {

    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [isLongEnough, setIsLongEnough] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    useEffect(() => {
        setIsLongEnough(password.length >= 10);
        setHasLowercase(/[a-z]/.test(password));
        setHasSpecialChar(/[!@#?]/.test(password));
    }, [password]);

    const changePassword = async (e) =>{

        const token =Cookies.get('token');
        const body ={
            password:password
        }

    try {
      const response = await fetch('http://localhost:8080/employee_and_admin/updatePassword', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
       
      });


      if (!response.ok) {
        e.preventDefault()
        toast.error("Could not change the password ")
        throw new Error(`HTTP error! status: ${response.status}`);
        
      }
      toast.success("Password changed successfully");

      

    } catch (error) {
      console.log(error.message);
    }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        if (password != null && passwordAgain != null && passwordAgain.length > 0) {
            setPasswordMatch(password === passwordAgain);
        }
    }, [password, passwordAgain]);

    const handlePasswordMatch = (event) => {
        setPasswordMatch(event.target.value === password);
    }

   const handleSubmit = (event) => {
    if(passwordAgain && isLongEnough && hasLowercase && hasSpecialChar && passwordMatch){


        console.log("Password changed successfully");
        
        changePassword();

        
        closePopup();
    }
    else{
        console.log("Password change failed");
        toast.error("Password doesn't meet the requirements");

        setPassword('');
        setPasswordAgain('');
        setIsLongEnough(false);
        setHasLowercase(false);
        setHasSpecialChar(false);
        setPasswordMatch(false);
    }
}

    return (

        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-800/50">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>

                        <button
                            onClick={closePopup}
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal"
                        >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>


                        <div className="p-4 md:p-5">

                            <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Password requirements:</h2>
                            <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                <li class="flex items-center">
                                    <svg
                                        className={`w-3.5 h-3.5 me-2 ${isLongEnough ? 'text-green-500' : 'text-gray-500'} dark:text-gray-400 flex-shrink-0`}
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    At least 10 characters
                                </li>
                                <li class="flex items-center">
                                    <svg
                                        className={`w-3.5 h-3.5 me-2 ${hasLowercase ? 'text-green-500' : 'text-gray-500'} dark:text-gray-400 flex-shrink-0`}
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    At least one lowercase character
                                </li>
                                <li class="flex items-center">
                                    <svg
                                        className={`w-3.5 h-3.5 me-2 ${hasSpecialChar ? 'text-green-500' : 'text-gray-500'} dark:text-gray-400 flex-shrink-0`}
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    At least one special character, e.g., ! @ # ?
                                </li>

                                <li class="flex items-center">
                                    <svg
                                        className={`w-3.5 h-3.5 me-2 ${passwordMatch ? 'text-green-500' : 'text-gray-500'} dark:text-gray-400 flex-shrink-0`}
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    New Passwords should match
                                </li>
                            </ul>
                            <div></div>


                            <form>

                                {/*
                                <div class="mb-6">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">Old Password</label>
                                    <input data-popover-target="popover-password" data-popover-placement="bottom" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    <div data-popover id="popover-password" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                        <div class="p-3 space-y-2">
                                            <h3 class="font-semibold text-gray-900 dark:text-white">Must have at least 6 characters</h3>

                                        </div>
                                        <div data-popper-arrow></div>
                                    </div>
                                </div>*/ }

                                <div class="mb-6">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input
                                        data-popover-target="popover-password"
                                        data-popover-placement="bottom"
                                        type="password"
                                        id="password"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />

                                    <div data-popover id="popover-password" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">

                                        <div data-popper-arrow></div>
                                    </div>
                                </div>

                                <div class="mb-6">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password Again</label>
                                    <input
                                        data-popover-target="popover-password"
                                        data-popover-placement="bottom"
                                        type="password"
                                        id="password"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={passwordAgain}
                                        onChange={(e) => {
                                            setPasswordAgain(e.target.value);
                                            handlePasswordMatch(password, e.target.value);
                                        }}
                                    />

                                </div>


                                <button 
                                onClick={handleSubmit}
                                type="submit" class="text-white bg-pink-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Change Password
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
