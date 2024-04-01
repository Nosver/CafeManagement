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


import Menu from './pages/Menu';
import { Stocks } from './pages/Personel/Stocks';
import { CartPage } from './pages/Customer/CartPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<MainLayout/>}>

      <Route index element = {<WelcomePage/>} />

      <Route path='/' element = {<CustomerLayout/>}>
        <Route path='/HomePage' element = {<HomePage/>} />
        <Route path='/Menu' element = {<Menu/>} />
        <Route path='/OrdersPage' element = {<OrdersPage/>} />
        <Route path='/cart' element = {<CartPage/>} />
      </Route>

      <Route path = '/' element = {<PersonelLayout/>}>
        <Route path='/test' element = {<TestPage/>} />
        <Route path='/orders' element = {<Orders/>} />
        <Route path='/dashboard' element = {<Dashboard />} />
        <Route path='/stocks' element = {<Stocks/>} />
      </Route>

      <Route path='/LoginPage' element = {<LoginPage/>} />
      <Route path='/SignUpPage' element = {<SignUpPage/>} />
      <Route path='/Welcome' element = {<WelcomePage/>} />
    </Route>
  )
)

const App = () => {

  return <RouterProvider router = {router} />
}

export default App;