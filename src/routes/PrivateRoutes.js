import { Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Alert } from "react-bootstrap"

const PrivateRoutes =(props)=>{
    const {user} = useContext(UserContext)
    if(user&& !user.auth){
        return(
            <Alert variant="danger"  className='mt-3'>
                <Alert.Heading>You dont have permission</Alert.Heading>
                <p>nội dung lỗi</p>
            </Alert>
        )
    }
    return(<>
        {props.children}
    </>)
}
export default PrivateRoutes