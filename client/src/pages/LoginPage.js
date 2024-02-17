import React, { useState, useContext} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import CustomerInput from '../components/CustomerInput';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setMe] = useContext(AuthContext);
    const navigate = useNavigate();

    const loginHandler = async(e) => {
        try {
            e.preventDefault();
            await axios.patch('/users/login',{
                username, password
            }).then((res) => {
                setMe({
                    name: res.data.name,
                    userId: res.data.userId,
                    sessionId: res.data.sessionId,
                });
                toast.success('로그인했어요.');
                navigate('/')
            })
        } catch(err) {
            console.error(err.response.data);
            toast.error(err.response.data.message);
        }
    }

    return (
        <div>
            <h3>로그인</h3>
            <form onSubmit={loginHandler}>
                <CustomerInput label='닉네임' value={username} setValue={setUsername}/>
                <CustomerInput label='비밀번호' type='password' value={password} setValue={setPassword}/>
                <button tpye='submit'>로그인</button>
            </form>
        </div>
    )
}

export default LoginPage;