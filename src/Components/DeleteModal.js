import React from "react";
import './modal.css';
import { AiOutlineClose } from "react-icons/ai";
import {db} from "../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteModal({open, onClose, userid, diaryid, pageid}){

    const handleSubmit = async ()=>{
        try{
            await deleteDoc(doc(db, "diary",userid,"userDiary",diaryid,"diaryPages",pageid));
        }catch(e){
            console.log(e);
        }
    }
    if(!open) return null;
    return(
        <div className='overlay' onClick={onClose}>
            <div className='modalContainer' onClick={(e) => {e.stopPropagation();}}>
                <div className="modalRight">
                    <div className="content">
                    <p className="closeBtn" onClick={onClose}> <AiOutlineClose/> </p><br/>
                    <h4>정말 삭제하시겠습니까?</h4>
                    <form onSubmit={handleSubmit}>
                        <button>삭제</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal;