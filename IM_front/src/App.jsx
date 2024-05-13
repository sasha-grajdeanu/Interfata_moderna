import { useState } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import {Route, Routes} from "react-router-dom"
import Home from './Home/Home'
import Login from './Login/Login'
import Dashboard from './Dashboard'

function App() {
  return (
    <>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
