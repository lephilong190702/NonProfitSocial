import React, { Component, createContext, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, NewsPage, UserProfile } from './pages'
import UserReducer from './reducers/UserReducer';
import cookie from "react-cookies";

import RegisterVolunteerPage from './pages/RegisterVolunteerPage';
import NewsDetails from './components/NewsDetails';
import Home from './pages/social/Home';
import Profile from './pages/profile/Profile';
import { Header } from './components';
import ProjectDetails from './components/ProjectDetails';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassWordPage from './pages/ResetPassWordPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';
import LiveStreamPage from './pages/livestream/LiveStreamPage';
import RoomPage from './pages/livestream/RoomPage';
import ProjectPage from './pages/projectpage/ProjectPage';
export const UserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(UserReducer, cookie.load("user") || null);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
      <Header />
        <Routes>
          
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/registerVol' element={<RegisterVolunteerPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path="/news/:newsId" element={<NewsDetails />} />
          <Route path="/social/" element={<Home />} />
          <Route path="/social/profile" element={<Profile />} />
          <Route path='/projects' element ={<ProjectPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassWordPage />} />
          <Route path="/livestream" element={<LiveStreamPage />} />
          <Route path="/livestream/:roomId" element={<RoomPage />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
