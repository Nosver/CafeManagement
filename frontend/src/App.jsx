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




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<MainLayout/>}>
      <Route index element = {<WelcomePage/>} />

      <Route path='/' element = {<CustomerLayout/>}>
        <Route path='/HomePage' element = {<HomePage/>} />

      </Route>

      <Route path = '/' element = {<PersonelLayout/>}>
        <Route path='/test' element = {<TestPage/>} />
      </Route>


      <Route path='/LoginPage' element = {<LoginPage/>} />
      <Route path='/SignUpPage' element = {<SignUpPage/>} />
      <Route path='/Welcome' element = {<WelcomePage/>} />
      <Route path='/dashboard' element = {<Dashboard />} />
    </Route>
  )
)

const App = () => {

  return <RouterProvider router = {router} />
}

export default App;