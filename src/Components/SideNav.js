import React from "react";
import {Link} from 'react-router-dom'
function SideNav(props){
    const lis =[];
    for(let i=0; i<props.diaryId.length; i++){
      let diary = props.diaryId[i];
      lis.push(<Link to="/diaryPage" key={i}><li>{diary.title}</li></Link>)
    }
    return (
      <div className='sideNav'>
        <Link to="/"><span className='logo'>ShareDiary</span></Link>
        <div className='border'></div>
        <ul>
          <Link to="/Login"><li>로그인</li></Link>
          <Link to="/Account"><li>계정</li></Link>
          <Link to="/diaryPage"><li>diary1</li></Link>
          <Link to="/diaryPage"><li>diary2</li></Link>
          <Link to="/diaryPage"><li>diary3</li></Link>
          {lis}
          <Link to="/diaryPage"><li className='sideNav-bottom'>SETTING</li></Link>
        </ul>
        </div>
  )
}
export default SideNav;
