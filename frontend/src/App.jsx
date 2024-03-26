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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<MainLayout/>}>
      <Route index element = {<LoginPage/>} />
      <Route path='/HomePage' element = {<HomePage/>} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router = {router} />
}

export default App;