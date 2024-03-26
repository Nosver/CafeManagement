import React from 'react'
import {
Route, 
createBrowserRouter, 
createRoutesFromElements,
RouterProvider
} from 'react-router-dom'
import MenuItem from './components/MenuItem';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import { WelcomePage } from './pages/WelcomePage';
import { TestPage } from './pages/TestPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<MainLayout/>}>
      <Route index element = {<WelcomePage/>} />
      <Route path='/HomePage' element = {<HomePage/>} />
      <Route path='/LoginPage' element = {<LoginPage/>} />
      <Route path='/Welcome' element = {<WelcomePage/>} />
      <Route path='/test' element = {<TestPage/>} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router = {router} />
}

export default App;