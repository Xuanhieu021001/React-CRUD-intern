import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const PrivateRoutes =(props)=>{
    const user = useSelector(state=> state.user.account)
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