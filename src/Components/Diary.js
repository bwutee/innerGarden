import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {db} from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import {UserAuth} from '../Context/AuthContext';
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai"
import {Link} from 'react-router-dom';
import DeleteModal from './DeleteModal';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import moment from 'moment';
import './diary.css';
const DiaryPage = ()=>{
    const params = useParams();
    const iconStyle = {fontSize: '22px', paddingTop: '15px'};
    const {user} = UserAuth();
    const [diaryPage,setDiaryPage] = useState([]);
    const [value, onChange] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [pageid, setPageid] = useState();
    const mark = [];
    const getDiaryPage = async(date)=>{
        // console.log(params);
        try{
            const q = query(collection(db, "diary",user.uid,"userDiary",params.diaryId,"diaryPages"), where("date", "==", parseInt(date)));
            const querySnapshot = await getDocs(q);
            setDiaryPage(querySnapshot.docs.map((doc)=>({ ...doc.data(), id: doc.id})));
        }catch(e){
            console.log(e.message);
        }
    }
    useEffect(()=>{
        // console.log(dayjs(value).format('YYYYMMDD'));
        getDiaryPage(dayjs(value).format('YYYYMMDD'));
        console.log(typeof(value));
    },[value])

    return (
        <>
        <DeleteModal 
            open={openModal} 
            onClose={()=>setOpenModal(false)} 
            userid={user.uid} 
            diaryid={params.diaryId} 
            pageid={pageid}
        />
        <Calendar 
        onChange={onChange} 
        value={value} 
        formatDay ={(locale, date) => dayjs(date).format('D')}
        next2Label={null}
        prev2Label={null}
        selectRange={false}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return (
               <>
                 <div className="flex justify-center items-center absoluteDiv">
                   <div className="dot"></div>
                 </div>
               </>
             );
            }
        }}
        />
        { (diaryPage.length==0) &&
            <div className='diaryPage'>
                <div className='diaryPageTop'>
                    <h3>{`${dayjs(value).format('M')}월 ${dayjs(value).format('D')}일`}</h3>
                    <Link 
                    to = '/CreateDiary'
                    state = {{
                        diaryId: params.diaryId,
                        date: value
                    }} 
                    className='editBttn' 
                    >
                        <FiEdit2 style={iconStyle}/>
                    </Link>
                </div>
                    내용이 없습니다.
            </div>
        }
        {diaryPage.map((diary)=>{
        return(
            <React.Fragment key={diary.id}>
            <div className='diaryPage'>
                <div className='diaryPageTop'>
                    <h3>{`${dayjs(value).format('M')}월 ${dayjs(value).format('D')}일`}</h3>
                    <div className='diaryPageTopRight'>
                    <Link 
                    to = '/EditDiary'
                    state = {{
                        diaryId: params.diaryId,
                        pageId: diary.id,
                        pageContent: diary.content
                    }}  
                    >
                        <FiEdit2 style={iconStyle}/>
                    </Link>
                    <p onClick={()=> {setOpenModal(true); setPageid(diary.id)}} id='deleteBttn'><AiOutlineDelete style={iconStyle}/></p>
                    </div>

                </div>
                    {diary.content}
            </div>
            </React.Fragment>


        )
    })}
        </>
    )
}
export default DiaryPage;