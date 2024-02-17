import './index.css';
import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import Toolbar from './components/Toolbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {

  return (
    <div className='app'>
      <ToastContainer/>
      <Toolbar/>
      <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route exact path="/auth/register" element={<RegisterPage/>}/>
        <Route exact path="/auth/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
