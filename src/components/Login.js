import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleLoginRedux } from "../redux/actions/userAction"

const Login =()=>{
    const dispath = useDispatch()
    const navigate = useNavigate()
    const account = useSelector(state=>state.user.account)
    
    const[email,setEmail] = useState('')
    const[passWord,setPassWord] = useState('')
    const[isShowPassWord,setIsShowPassWord] = useState(false)

    const isShowLoading = useSelector(state=> state.user.isLoading)

    const emailRef = useRef()
    useEffect(()=>{
        emailRef.current.focus()
    },[])

    useEffect(()=>{
        if(account && account.auth === true){
            navigate('/')
        }
    },[account])

    const handleLogin= async(email,passWord)=>{
        if(!email|| !passWord){
            toast.error('Missing email or password!')
            return;
        }
        dispath(handleLoginRedux(email,passWord))
    }
    const handleBack =()=>{
        navigate('/')
    }

    const handleEnter =(event)=>{
        if(event.key==="Enter"){
            handleLogin(email,passWord)
        }
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
                        onKeyUp={(event)=>{handleEnter(event)}}
                        
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