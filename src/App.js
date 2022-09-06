import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import Settings from './Components/Settings';
import TopNav from './Components/TopNav';
import Main from './Components/Main';
import DiaryPage from './Components/Diary';
import NotFound from './Components/NotFound';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Account from './Components/Account';
import EditDiary from './Components/EditDiary';
import CreateDiary from './Components/CreateDiary';
import { AuthContextProvider } from './Context/AuthContext';


function App() {
    return (
    <div className="App">
      <BrowserRouter>
      <AuthContextProvider>
        <TopNav />
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/DiaryPage/:diaryId" element={<DiaryPage/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Account" element={<Account/>}/>
          <Route path="/Settings" element={<Settings/>}/>
          <Route path="/EditDiary" element={<EditDiary/>}/>
          <Route path="/CreateDiary" element={<CreateDiary/>}/>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
