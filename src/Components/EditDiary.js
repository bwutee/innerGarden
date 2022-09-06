import React, { useEffect, useState } from "react";
import {UserAuth} from '../Context/AuthContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../firebase-config";
import './editDiary.css';
function EditDiary(){
    const location = useLocation();
    const state = location.state;
    const {user} = UserAuth();
    const navigate = useNavigate();
    const [diaryContent, setDiaryContent] = useState('');
    const [error, setError] = useState('');
    const initialContent = state.pageContent;
    const diaryref = state.diaryId;

    const handleSubmit = async()=>{
        const pageRef = doc(db,"diary",user.uid,"userDiary",diaryref,"diaryPages",state.pageId);
        setError('')
        try{
            await updateDoc(pageRef, {
                content: diaryContent
            })
            navigate(`/DiaryPage/${diaryref}`)
        }catch(e){
            setError(e.message)
            console.log(e.message);
        }
    }

    useEffect(()=>{
        // setDiaryContent(location.state.pageContent);
        console.log(diaryContent);
    },[diaryContent])
    return(
        <div className="editMain">
        <div className="editPageTop"> 
            <h3>일기 수정</h3>
            <span className="editPageTopRight">
                <a onClick={handleSubmit} id='saveBttn'>저장</a>
                <Link to={`/DiaryPage/${diaryref}`} id='cancleBttn'>취소</Link>
            </span>
        </div>
        <textarea 
            placeholder="내용을 입력해주세요" 
            defaultValue={initialContent} 
            onChange={(e)=>setDiaryContent(e.target.value)}
            required
            autoFocus
        />
        </div>
    )
}
export default EditDiary;