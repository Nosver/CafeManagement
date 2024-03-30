import { NavLink } from 'react-router-dom';
import logo from '../img/coffe.png'
import CartSlider from './CartSlider';
import { useState } from 'react';

const CustomerNavbar = () => {


  const [isCartOpen, setIsCartOpen] = useState(false);


  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-custom-brown text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <>
      <nav className='bg-custom-coffe-brown border-b border-indigo-500'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='flex h-20 items-center justify-between'>
            <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
              <NavLink className='flex flex-shrink-0 items-center mr-4' to='/homepage'>
                <img className='h-10 w-auto' src={logo} alt='Cafe-in' />
                <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                  Cafe-in
                </span>
              </NavLink>
              <div className='md:ml-auto'>
                <div className='flex space-x-6'>

                  <NavLink to='/homepage' className={linkClass}>
                    Home
                  </NavLink>

                  <NavLink to='/Menu' className={linkClass}>
                    Menu
                  </NavLink>

                  <button className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                    onClick={() => setIsCartOpen(!isCartOpen)} 
                    >
                    Cart
                  </button>

                  <NavLink to='/orders' className={linkClass}>
                    Orders
                  </NavLink>

                  <NavLink to='/profile' className={linkClass}>
                    Profile
                  </NavLink>

                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isCartOpen && <CartSlider />}
    </>
  );
};

export default CustomerNavbar;
