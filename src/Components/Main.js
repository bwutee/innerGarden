import React, { useEffect, useState } from 'react';
import './log.css';
import {useNavigate} from 'react-router-dom';
import {UserAuth} from '../Context/AuthContext';
import {db} from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Modal from './Modal';

const Main = ()=>{
    const {user} = UserAuth();
    const [query, setQuery] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const getDiary = async()=>{
        try{
            const querySnapshot = await getDocs(collection(db, "diary",user.uid,"userDiary"));
            setQuery(querySnapshot.docs.map((doc)=>({ ...doc.data(), id: doc.id})));
        }catch(e){
            console.log(e.message);
        }
    }
    useEffect(()=>{
        getDiary();
    },[user])

    return (
        <>
            {user &&
                <>
                <Modal open={openModal} onClose={()=>setOpenModal(false)}/>
                <button onClick={()=> setOpenModal(true)} className="createDiaryBtn">새 일기장</button>
                <div className='mainContents'>
                    {query.map((diary)=>{
                        return(
                            <React.Fragment key={diary.id}>
                            <div className='diary' onClick={()=>{navigate(`/DiaryPage/${diary.id}`)}}>
                                <div className='diaryTitle'>
                                {diary.name} 
                                </div>
                                <div className='diaryCover'/>
                            </div>
                            </React.Fragment>


                        )
                    })}
                </div>
                </>
            }
        </>
    )
}

export default Main;