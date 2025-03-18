import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Features from './components/Features'
import Register from './components/Register'
import AboutUs from './components/AboutUs'

import TransferMoney from './components/TransferMoney'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
   <BrowserRouter>
<Routes>
<Route path="/" element={<HomePage/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/features" element={<Features/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/aboutus" element={<AboutUs/>}/>
<Route path='/transfermoney' element={<TransferMoney/>}/>
<Route path='/dashboard' element={<Dashboard/>}/> 



</Routes>
</BrowserRouter>


    </>
  )
}

export default App
