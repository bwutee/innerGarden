import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import './header.css';
import {UserAuth} from '../Context/AuthContext';
import {AiOutlineSetting} from "react-icons/ai";
import { VscAccount } from "react-icons/vsc"

const TopNav = ()=>{
    const {user} = UserAuth();
    const iconStyle = {fontSize: '22px'};
    return (
        <>
        <div className='topNav'>
            <ul >
            <Link to="/"><li className="logo">내면의 정원</li></Link>
            <span className='floatRight'>
                {user?
                <>
                <Link to="/Settings"><li><AiOutlineSetting style={iconStyle}/></li></Link>
                <Link to="/Account"><li><VscAccount style={iconStyle}/></li></Link>
                </>
                :<Link to="/Login"><li>로그인</li></Link>
                }
            </span>
            </ul>
        </div>
        </>
    )


}
export default TopNav;