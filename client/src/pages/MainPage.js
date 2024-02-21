import '../index.css';
import React, { useContext } from 'react';
import { ToastContainer } from "react-toastify";
import UploadForm from '../components/UploadForm';
import ImageList from '../components/ImageList';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from '../context/AuthContext';

const MainPage = () => {
    const [me] = useContext(AuthContext);
    return (
        <div className='app'>
            <h2>사진첩</h2>
            {me && <UploadForm/>}            
            <ImageList/>
        </div>
    )
}

export default MainPage;