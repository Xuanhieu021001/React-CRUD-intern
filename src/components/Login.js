import { useEffect, useRef, useState,useContext } from "react"
import { loginUser } from "../services/UserService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"

const Login =()=>{
    const {user, login} = useContext(UserContext)
    const navigate = useNavigate()
    const[email,setEmail] = useState('')
    const[passWord,setPassWord] = useState('')
    const[isShowPassWord,setIsShowPassWord] = useState(false)
    const[isShowLoading,setIsShowLoading] =useState(false)

    const emailRef = useRef()
    useEffect(()=>{
        emailRef.current.focus()
        // let token = localStorage.getItem('token')
        // if(token){
        //     navigate('/')
        // }
    },[])

    const handleLogin= async(email,passWord)=>{
        if(!email|| !passWord){
            toast.error('Missing email or password!')
            return;
        }
        setIsShowLoading(true)
        let res = await loginUser(email,passWord)
        if(res&& res.token){
            localStorage.setItem("token",res.token)
            navigate('/')
            login(email)
        }
        else{
            if(res&& res.status===400){
                toast.error(res.data.error)
            }
        }
        setIsShowLoading(false)

    }
    const handleBack =()=>{
        navigate('/')
    }
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="login-title">Login</div>
                <div>Email or username</div>
                <input 
                    ref={emailRef}
                    className="login-input" 
                    type="text" 
                    placeholder="Email or username..."
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                />
                <div className="password">
                    <input 
                        className="login-input" 
                        type={isShowPassWord===true?'text':"password" }
                        placeholder="Password..." 
                        value={passWord}
                        onChange={(event)=>setPassWord(event.target.value)}
                        
                    />
                    <i 
                        className={isShowPassWord===true?"login-input_icon fa-solid fa-eye":"login-input_icon fa-solid fa-eye-slash"}
                        onClick={()=>setIsShowPassWord(!isShowPassWord)}
                    >
                    </i>
                </div>
                <button 
                    className={email&& passWord &&!isShowLoading? "btn-login active":"btn-login"} 
                    disabled={email&& passWord &&!isShowLoading? false:true}
                    onClick={()=>handleLogin(email,passWord)}
                >
                    {isShowLoading ? <i className="fa-solid fa-spinner fa-spin"></i>: 'Login'} 
                </button>
                <div className="login-back"><i className="icon-login_back fa-solid fa-caret-left"></i>
                    <span onClick={()=>handleBack()}>&nbsp; Go back</span>
                </div>
            </div>
        </>
    )
}
export default Login