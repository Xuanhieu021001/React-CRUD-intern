import{toast} from 'react-toastify'
import { loginUser } from '../../services/UserService';


export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH  = 'USER_REFRESH ';


export const handleLoginRedux =(email, passWord)=>{
    return async(dispath,getState)=>{
        dispath({type: FETCH_USER_LOGIN})

        let res = await loginUser(email.trim(),passWord)
        if(res&& res.token){
            localStorage.setItem("token",res.token)
            localStorage.setItem("email",email.trim())
            dispath({
                type: FETCH_USER_SUCCESS,
                data: {
                    email:email.trim(),
                    token:res.token
                }
            },)
            localStorage.setItem("token",res.token)
        }
        else{
            if(res&& res.status===400){
                toast.error(res.data.error)
            }
            dispath({type: FETCH_USER_ERROR})
        }
    }
}

export const handleLogoutRedux =()=>{
    return async(dispath,getState)=>{
        dispath({type: USER_LOGOUT})
    }
}

export const handleRefresh =()=>{
    return async(dispath,getState)=>{
        dispath({type: USER_REFRESH})
    }
}