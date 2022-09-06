import React, { useEffect, useState } from "react"
import {createContext, useContext} from "react"
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup, 
} from 'firebase/auth'
import {auth} from '../firebase-config'

const UserContext = createContext()

// AuthContextProvider에 context, 데이터, 함수 담아서 export 하기
export const AuthContextProvider = ({children})=>{
    //user state 만들기
    const [user, setUser] = useState({})
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const logout = ()=> {
        return signOut(auth)
    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const provider = new GoogleAuthProvider()
    const loginWithGoogle = ()=>{
        return signInWithPopup(auth, provider)
    }
    // Auth 상태 바뀌는거 useEffect로 감지하고, 상태가 바뀌면 setUser 호출
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    
    return (
        <UserContext.Provider value={{createUser, user, logout, login, loginWithGoogle}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}