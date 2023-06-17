import { Alert } from "react-bootstrap"
const Page404 =()=>{
    return(
        <>
        <Alert variant="danger"  className='mt-3'>
                <Alert.Heading>Page not found</Alert.Heading>
                <p>nội dung lỗi</p>
            </Alert>
        </>
    )
}
export default Page404