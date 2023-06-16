import {createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
const UserContext = createContext()
const UserProvider = ({children})=>{
    const [user,setUser]= useState({email:'',auth:false});
    const login =(email,token)=>{
        setUser((user)=>({
            email:email,
            auth:true
        }))
        localStorage.setItem('token',token)
        localStorage.setItem('email',email)
    }

    const logout =()=>{
        localStorage.removeItem('token')
        setUser((user)=>({
            email:'',
            auth:false
        }))
    }

    return(
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
export {UserProvider,UserContext}