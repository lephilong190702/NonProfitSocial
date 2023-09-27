import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      {/* <h1 className='text-red-500'>Hello</h1>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
