import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Customer/HomePage';
import MainLayout from './layouts/MainLayout';
import { WelcomePage } from './pages/WelcomePage';
import { TestPage } from './pages/TestPage';
import Dashboard from './pages/Personel/Dashboard';
import { SignUpPage } from './pages/SignUpPage';
import CustomerLayout from './layouts/CustomerLayout';
import PersonelLayout from './layouts/PersonelLayout';
import { Orders } from './pages/Personel/Orders';
import OrdersPage from './pages/Customer/OrdersPage';



import { Menu } from './pages/Customer/Menu';
import { Stocks } from './pages/Personel/Stocks';
import { CartPage } from './pages/Customer/CartPage';
import { Products } from './pages/Personel/Products';
import { AboutUsPage } from './pages/Customer/AboutUsPage';
import { Customers } from './pages/Personel/Customers';
import { Employees } from './pages/Personel/Employees';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentFail } from './components/PaymentFail';
import { MyProfile } from './pages/Personel/MyProfile';
import { NotFoundPage404 } from './pages/Customer/NotFoundPage404';
import CustomerProfile from './pages/Customer/CustomerProfile';
import { GoogleOAuthProvider } from '@react-oauth/google';
import VerifyEmailPage from './pages/Customer/VerifyEmailPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>

      <Route index element={<WelcomePage />} />

      <Route path='/' element={<CustomerLayout />}>
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/Menu' element={<Menu />} />
        <Route path='/OrdersPage' element={<OrdersPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/about-us' element={<AboutUsPage />} />
        <Route path='/success/*' element={<PaymentSuccess />} />
        <Route path='/fail/*' element={<PaymentFail />} />
        <Route path='/Profile/*' element={<CustomerProfile />} />
        <Route path='*' element={<NotFoundPage404 />} />
      </Route>

      <Route path='/' element={<PersonelLayout />}>
        <Route path='/test' element={<TestPage />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/stocks' element={<Stocks />} />
        <Route path='/products' element={<Products />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/myprofile' element={<MyProfile />} />

      </Route>

      <Route path='/LoginPage' element={<LoginPage />} />
      <Route path='/SignUpPage' element={<SignUpPage />} />
      <Route path='/Welcome' element={<WelcomePage />} />
      <Route path='/Logout' element={<WelcomePage />} />
      <Route path='/verify-email' element={<VerifyEmailPage />} />


    </Route>
  )
)

const App = () => {

  

  return (<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>)
}

export default App;