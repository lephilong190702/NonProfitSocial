import React, { Component, createContext, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, NewsPage, UserProfile } from './pages'
import UserReducer from './reducers/UserReducer';
import cookie from "react-cookies";
import RegisterPage from './pages/RegisterPage';
import RegisterVolunteerPage from './pages/RegisterVolunteerPage';
import NewsDetails from './components/NewsDetails';
import Home from './pages/home/Home';
// import Profile from './pages/profile/Profile';
// import Profile from './pages/profile/Profile';

export const UserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(UserReducer, cookie.load("user") || null);

  return (
    <UserContext.Provider value={[user, dispatch]}>
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
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/registerVol' element={<RegisterVolunteerPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path="/news/:newsId" element={<NewsDetails />} />
          <Route path="/social/" element={<Home />} />
          {/* <Route path="/social/profile/" element={<Profile />} /> */}


        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
