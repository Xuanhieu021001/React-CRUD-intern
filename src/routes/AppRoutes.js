import { Routes,Route } from 'react-router-dom';
import TableUsers from '../components/TableUsers';
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoutes from './PrivateRoutes';
import Page404 from '../components/Page404';
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
                }>
            </Route>
            <Route path='*' element={ <Page404/> }></Route>
        </Routes>
        </>
    )
}
export default AppRoutes