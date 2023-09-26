import React, { Component } from 'react'
import Component1 from './components/Component1'
import Component2 from './components/Component2'
import Header from './layout/header'
import Footer from './layout/footer'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Component1 />
      <Component2 />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
