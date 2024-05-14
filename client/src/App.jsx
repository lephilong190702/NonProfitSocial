import React, { Component, createContext, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, NewsPage, UserProfile } from './pages'
import UserReducer from './reducers/UserReducer';
import cookie from "react-cookies";

// import RegisterVolunteerPage from './pages/RegisterVolunteerPage';
// import NewsDetails from './components/NewsDetails';
// import Home from './pages/social/Home';
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
import NewsDetails from './components/news/NewsDetails';
import RegisterVolunteerPage from './pages/registerVol/RegisterVolunteerPage';
import ProjectsMap from './pages/projectpage/ProjectsMap';
import Home from './pages/social/home/Home';
import AcceptPost from './pages/social/accepted_post/AcceptPost';
import Result from './pages/payment/Result';
// import Result from './pages/social/tag/TagPage';
import TagPage from './pages/social/tag/TagPage';
import PostNotiPage from './pages/social/notification/PostNotiPage';
import Error from './pages/payment/Error';
import CICD from './pages/CICD';
import UploadProject from './pages/projectpage/UploadProject';
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
          <Route path='/projects-map' element ={<ProjectsMap />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassWordPage />} />
          <Route path="/livestream" element={<LiveStreamPage />} />
          <Route path="/livestream/:roomId" element={<RoomPage />} />
          <Route path='/accept_post' element={<AcceptPost />} />
          <Route path='/result' element={<Result />} />
          <Route path='/error' element={<Error />} />
          <Route path='/tag' element={<TagPage />} />
          <Route path='/noti' element={<PostNotiPage />} />
          <Route path='/testCICD' element={<CICD />} />
          <Route path='/upload-project' element={<UploadProject />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
