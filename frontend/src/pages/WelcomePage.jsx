import React from 'react'
import HomePage from './Customer/HomePage'
import {
    useNavigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Routes
} from 'react-router-dom'
import LoginPage from './LoginPage';
import { Dropdown, DropdownItem, Spinner } from 'flowbite-react';

import background1 from "../img/cafe-bg.jpg";
import background2 from "../img/cafe-2-bg.jpg";

export const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{
                backgroundImage: `url(${background2})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backdropFilter: 'blur(10px)',
                height: '100vh'
            }}>

                <div className="flex items-center justify-center h-screen text-center">
                    <div className='backdrop-blur-s'>
                        <h1 className="text-5xl font-extrabold dark:text-white underline-offset-1 shadow-lg mb-4 text-center leading-none tracking-tight text-black md:text-5xl lg:text-6xl underline underline-offset-3 decoration-8 decoration-custom-green dark:decoration-blue-600">
                            Cafe-in Control
                        </h1>
                        <span className="shadow- backdrop-blur-xl text-custom-green text-2xl font-bold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                            Easier to manage.
                        </span>
                        <Spinner/>
                    </div>
                </div>

                <div className="flex justify-center">


                <Dropdown color='blue' label="Links ">

                    <DropdownItem>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                            onClick={() => navigate('/LoginPage')}
                        >
                            Login Page
                        </button>
                    </DropdownItem>

                    <DropdownItem>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                            onClick={() => navigate('/Welcome')}
                        >
                            Welcome Page (same)
                        </button>
                    </DropdownItem>

                    <DropdownItem>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                            onClick={() => navigate('/HomePage')}
                        >
                            Home Page
                        </button>
                    </DropdownItem>

                    <DropdownItem>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                            onClick={() => navigate('/test')}
                        >
                            Test Page
                        </button>
                    </DropdownItem>

                    <DropdownItem>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                            onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </button>
                    </DropdownItem>

                    <DropdownItem>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                            onClick={() => navigate('/Orders')}
                        >
                            Orders Page
                        </button>
                    </DropdownItem>

                </Dropdown>


</div>
            </div>

        </>
    )
}
