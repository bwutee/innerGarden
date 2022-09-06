import React, { useEffect, useState } from 'react';
import './log.css';
import {Link, useNavigate} from 'react-router-dom';
import {UserAuth} from '../Context/AuthContext'
const Signup = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [alert, setAlert] = useState('');
    const [badinput, setBadinput] = useState('');
    const [satisfy, setSatisfy] = useState(false);
    const [error, setError] = useState('');
    
    const {createUser} = UserAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(
            password!==checkPassword){
            setSatisfy(false);
            setAlert('비밀번호가 일치하지 않습니다');
            setBadinput('badinput');
        } else if((password===checkPassword)) {
            setSatisfy(true);
            setAlert('');
            setBadinput('');
            console.log(satisfy);
        }
    },[checkPassword]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(satisfy){
            setError('')
            try{
                await createUser(email, password);
                navigate('/account')
            }catch(e){
                setError(e.message)
                console.log(e.message)
            }
        } else {
            //regex 충족안함
        }

    }
    return (
        <>
            <div className="contents">
                <h3> 회원가입</h3>
                    <form onSubmit={handleSubmit}>
                        <input 
                            onChange = {(e)=>setEmail(e.target.value)} 
                            type="email" placeholder='이메일'
                        /><br/>
                        <div className='space'></div>
                        <input 
                            onChange = {(e)=>setPassword(e.target.value)} 
                            type="password"  placeholder='비밀번호'
                            className={badinput}
                        /><br/>
                        <input 
                            onChange = {(e)=>setCheckPassword(e.target.value)}
                            type="password"  placeholder='비밀번호 확인'
                            className={badinput}
                        />
                        <p className='alert'>{alert}</p>
                        <button>가입하기</button>
                    </form>
                <p>이미 계정이 있나요?{'  '}
                    <Link to='/Login'>로그인</Link>
                </p>
            </div>
        </>
    )
}
export default Signup;