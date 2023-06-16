import { Routes,Route } from 'react-router-dom';
import TableUsers from '../components/TableUsers';
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoutes from './PrivateRoutes';
const AppRoutes = ()=>{
    return(
        <>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={ <Login/> }></Route>
            <Route path='/users' element={
                <PrivateRoutes>
                    <TableUsers/>
                </PrivateRoutes>
            }></Route>
        </Routes>
        </>
    )
}
export default AppRoutes