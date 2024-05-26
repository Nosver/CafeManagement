import { NavLink } from 'react-router-dom';
import logo from '../../img/coffe.png'
import { useState } from 'react'
import CartSlider from './CartSlider';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const text_color = "text-gray-200";
const bg_color = "bg-slate-800";
const hover_color = "hover:bg-purple-400";
const active_color = "bg-purple-700";

const CustomerNavbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [role, setRole]=useState(Cookies.get("role"));

  const navigate = useNavigate();


  useEffect(() => {
    const checkRole = () => {
      const currentRole = Cookies.get('role');
      if (currentRole !== role) {
        setRole(currentRole);
      }
    };

    const intervalId = setInterval(checkRole, 1000);

    return () => clearInterval(intervalId); 
  }, [role]);
  
  const logout = async ()=>{
    const token =Cookies.get('token');

    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
       
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Cookies.set('token', '')
      Cookies.set('role', '')

    } catch (error) {
      console.log(error.message);
    }

      navigate('/logout');
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-custom-brown text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';


      if(Cookies.get("role") == "CUSTOMER"){
        return (
          <>
            <nav className='bg-custom-coffe-brown border-b border-white-500'>
              <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                  <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                    <NavLink className='flex flex-shrink-0 items-center mr-4' to='/homepage'>
                      <img className='h-10 w-auto' src={logo} />
                      <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                        Cafe-in
                      </span>
                    </NavLink>
                    <div className='md:ml-auto'>
                      <div className='flex space-x-6'>
      
                        <NavLink to='/homepage' className={linkClass}>
                          Home
                        </NavLink>
      
                        <NavLink to='/menu' className={linkClass}>
                          Menu
                        </NavLink>
      
                        <button className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                          onClick={() => setIsCartOpen(!isCartOpen)}
                        >
                          Cart
                        </button>
      
                        <NavLink to='/OrdersPage' className={linkClass}>
                          Orders
                        </NavLink>
      
                        <NavLink to='/profile' className={linkClass}>
                          Profile
                        </NavLink>
                        <NavLink to='/about-us' className={linkClass}>
                          About Us
                        </NavLink>
                        
                        <button className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                        onClick={logout}>
                          <svg class={`w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:${text_color} dark:group-hover:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
        </svg>
                        </button>
                        
      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            {isCartOpen && <CartSlider />}
          </>
        );
      }
      else{
        return (
          <>
            <nav className='bg-custom-coffe-brown border-b border-white-500'>
              <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                  <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                    <NavLink className='flex flex-shrink-0 items-center mr-4' to='/homepage'>
                      <img className='h-10 w-auto' src={logo} />
                      <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                        Cafe-in
                      </span>
                    </NavLink>
                    <div className='md:ml-auto'>
                      <div className='flex space-x-6'>
      
                        <NavLink to='/homepage' className={linkClass}>
                          Home
                        </NavLink>
      
                        <NavLink to='/menu' className={linkClass}>
                          Menu
                        </NavLink>
      
                        
      
                        <NavLink to='/loginPage' className={linkClass}>
                          Login
                        </NavLink>
                        
                        <NavLink to='/about-us' className={linkClass}>
                          About Us
                        </NavLink>
      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
           
          </>
        );
      }
  
};

export default CustomerNavbar;