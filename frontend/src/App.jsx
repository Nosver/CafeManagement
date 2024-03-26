import React from 'react'
import {
Route, 
createBrowserRouter, 
createRoutesFromElements,
RouterProvider
} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import { Test } from './components/Test';
import { Menu } from './pages/Menu';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<MainLayout/>}>
      <Route index element = {<LoginPage/>} />
      <Route path='/HomePage' element = {<HomePage/>} />
      <Route path='/test' element = {<Test></Test>}/>
      <Route path='/cafe-in/customer/homepage/products' element = {<Menu/>}/>
    </Route>
  )
)

const App = () => {
  return <RouterProvider router = {router} />
}

export default App;