import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import './Toolbar.css';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ImageContext } from "../context/ImageContext";

const Toolbar = () => {
    const [me, setMe] = useContext(AuthContext);

    const logoutHanlder = async() => {
        try  {
            await axios.patch('/users/logout');
            localStorage.removeItem("sessionId");
            setMe();
            toast.success('로그아웃했어요.')
        } catch(err) {
            console.error(err);
            toast.error(err.message);
        }
    }

    return (
        <div className="toolbar">
            <Link to="/">
                <span>홈</span>
            </Link>
            <div className="toolbar-space"></div>
            {
                me ? 
                (
                    <>
                        <span>{me.name}님</span>
                        <span className="toolbar-logout" onClick={logoutHanlder}>로그아웃</span>
                    </>
                ) :
                ( <><Link to="/auth/login">
                        <span>로그인</span>    
                    </Link>
                    <Link to="/auth/register">
                    <   span>회원가입</span>
                    </Link></>
                )
            }
        </div>
    )
}

export default Toolbar;