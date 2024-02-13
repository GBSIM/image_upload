import './index.css';
import React from "react";
import { ToastContainer } from "react-toastify";
import UploadForm from './components/UploadForm';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <h2>사진첩</h2>
      <UploadForm/>
    </div>
  );
}

export default App;
