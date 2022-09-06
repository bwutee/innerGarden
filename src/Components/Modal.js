import React, { useState } from "react";
import './modal.css';
import { AiOutlineClose } from "react-icons/ai";
import {db} from '../firebase-config';
import {collection, addDoc} from 'firebase/firestore';
import {UserAuth} from '../Context/AuthContext';

function Modal({open, onClose}) {
    // const { open, close, header } = props;
    const {user} = UserAuth();
    const [diaryName, setDiaryName] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e)=> {
        e.preventDefault(); 
        setError('')
        try{
            // await login(email, password);
            await addDoc(collection(db,"diary",user.uid,"userDiary"), {name: diaryName})
        }catch(e){
            setError(e.message)
            console.log(e.message);
        }
    }

    if(!open) return null;
    return (
        <div className='overlay' onClick={onClose}>
            <div className='modalContainer' onClick={(e) => {e.stopPropagation();}}>
                <div className="modalRight">
                    <div className="content">
                    <p className="closeBtn" onClick={onClose}> <AiOutlineClose/> </p><br/>
                    <h4>새 일기장 만들기</h4>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="일기장 이름" onChange={(e)=> setDiaryName(e.target.value)}></input>
                        <button>만들기</button>
                    </form>
                    </div>
                </div>
            </div>

        </div>

    )
  }
export default Modal;