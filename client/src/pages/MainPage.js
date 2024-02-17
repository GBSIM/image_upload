import '../index.css';
import React from 'react';
import { ToastContainer } from "react-toastify";
import UploadForm from '../components/UploadForm';
import ImageList from '../components/ImageList';
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
    return (
        <div className='app'>
            <h2>사진첩</h2>
            <UploadForm/>
            <h2>사진 모음</h2>
            <ImageList/>
        </div>
    )
}

export default MainPage;