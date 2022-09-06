import React, { useEffect, useState } from 'react';
import './log.css';
import {Link, useNavigate} from 'react-router-dom';
import {UserAuth} from '../Context/AuthContext';

const Login = (props)=>{
    const {login} = UserAuth();
    const {loginWithGoogle} = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault(); 
        setError('')
        try{
            await login(email, password);
            navigate('/');
        }catch(e){
            handleError(e.code);
            // setError(e.code)
            // console.log(e.code);
        }
    }
    const handleError = (e)=>{
        switch(e){
            case "auth/invalid-email": 
            case "auth/wrong-password":
                setError('이메일이나 비밀번호를 확인해주세요.')
                // console.log('seterror!');
                break;
            case "auth/too-many-requests":
                setError('시도횟수가 너무 많습니다, 잠시후 다시 시도해주세요.')
                break;
        }
    }
    const googleLogin = async ()=> {
        setError('')
        try{
            await loginWithGoogle();
            navigate('/');
        }catch(e){
            setError(e.message)
            console.log(e.message);
        }
    }
    useEffect(()=>{

    },[error])
    return (
        <>
            <div className="contents">
                <h3> 로그인</h3>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='이메일'/><br/>
                        <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='비밀번호'/>
                        <button>로그인</button>
                    </form>
                    <p style={{color: 'red'}}>{error}</p>
                <p>아직 계정이 없나요?{'  '}
                    <Link to='/Signup'  className="clickable">회원가입</Link>
                </p>
                <div className='space'></div>
                <button className='ggllogin'onClick={googleLogin}>구글로 로그인</button>
            </div>
        </>
    )
}
export default Login;