import React, { useState, useContext }from 'react';
import CustomerInput from '../components/CustomerInput';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordcheck, setPasswordcheck] = useState('');
    const [, setMe] = useContext(AuthContext);

    const navigate = useNavigate();

    const submitHandler = async(e) => {
        try {
            e.preventDefault();
            if (username.length < 3) throw new Error('닉네임이 너무 짧아요. 3자 이상으로 해주세요.');
            if (password.length < 6) throw new Error('비밀번호가 너무 짧아요. 6자 이상으로 해주세요.');
            if (password !== passwordcheck) throw new Error('비밀번호가 달라요. 다시 입력해주세요.');
            console.log({name,username,password,passwordcheck});
            await axios.post('/users/register',{name,username,password}).then((res) => {
                console.log(res.data);
                setMe({
                    userId: res.data.userId,
                    sessionId: res.data.sessionId,
                    name: res.data.name,
                })
                toast.success('회원가입이 완료되었어요.');
                navigate('/');
            }).catch((err) => {
                toast.error(err.message);   
            })
        } catch(err) {
            toast.error(err.message);
        }
    }

    return (
        <div>
            <h3>회원가입</h3>
            <form onSubmit={submitHandler}>
                <CustomerInput label='이름' value={name} setValue={setName}/>
                <CustomerInput label='닉네임' value={username} setValue={setUsername}/>
                <CustomerInput label='비밀번호' type='password' value={password} setValue={setPassword}/>
                <CustomerInput label='비밀번호 확인' type='password' value={passwordcheck} setValue={setPasswordcheck}/>
                <button tpye='submit'>회원가입</button>
            </form>
        </div>
    )
}

export default RegisterPage;