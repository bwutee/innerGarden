import React, { useEffect, useState } from "react";
import {UserAuth} from '../Context/AuthContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import {db} from "../firebase-config";
import dayjs from 'dayjs';
import './editDiary.css';

function CreateDiary(){
    const location = useLocation();
    const state = location.state;
    const {user} = UserAuth();
    const navigate = useNavigate();
    const [diaryContent, setDiaryContent] = useState('');
    const [error, setError] = useState('');
    const diaryref = state.diaryId;
    const date = state.date;

    const handleSubmit = async()=>{
        const pageCollection = collection(db,"diary",user.uid,"userDiary",diaryref,"diaryPages");
        setError('')
        try{
            await addDoc(pageCollection, {
                content: diaryContent,
                date: parseInt(dayjs(date).format('YYYYMMDD'))
            })
            navigate(`/DiaryPage/${diaryref}`)
        }catch(e){
            setError(e.message)
            console.log(e.message);
        }
    }

    useEffect(()=>{
        // setDiaryContent(location.state.pageContent);
        console.log(date);
    },[])
    return(
        <div className="editMain">
        <div className="editPageTop"> 
            <h3>일기 작성</h3>
            <span className="editPageTopRight">
                <a onClick={handleSubmit} id='saveBttn'>저장</a>
                <Link to={`/DiaryPage/${diaryref}`} id='cancleBttn'>취소</Link>
            </span>
        </div>
        <textarea 
            placeholder="내용을 입력해주세요" 
            onChange={(e)=>setDiaryContent(e.target.value)}
            required
            autoFocus
        />
        </div>
    )
}
export default CreateDiary;