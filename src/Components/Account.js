import React from 'react';
import './log.css';
import {UserAuth} from '../Context/AuthContext'
import {Link, useNavigate} from 'react-router-dom';
const Account = ()=>{
    const {user} = UserAuth();
    if(user){
        return <LoggedIn user={user}/>;
    }
    return <Guest />;


}
function LoggedIn (u, h){
    const {logout} = UserAuth();
    const navigate = useNavigate();
    const handleLogout = async ()=> {
        try{
            await logout()
            navigate('/')
        }catch(e){
            console.log(e.message)
        }
    }
    return(
        <div className='contents'>
        <h3> Account</h3>
        <p>
            유저 이메일: {u.user.email}<br/>
            유저 이름: {u.user.displayName}<br/>
        </p>
        <button onClick={handleLogout}>로그아웃</button>
        </div>

    )
}
function Guest(){
    return(
        <div className='contents'>
        <p>
            <Link to='/Login' className="clickable">로그인</Link> 하세요
        </p>
        </div>
    )
}
export default Account;