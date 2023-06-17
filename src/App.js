import './App.scss';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import AppRoutes from './routes/AppRoutes';
import {useSelector} from 'react-redux'


function App() {
  const data = useSelector(state=>state.user.account)
  console.log(data);
  
  const {user,login} = useContext(UserContext)
  useEffect(()=>{
    if(localStorage.getItem('token')){
      login(localStorage.getItem('email'),localStorage.getItem('token'))
    }
  },[])
  return (
    <div className='app-container'>
      <Header/>
      <AppRoutes></AppRoutes>
     

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
/>
    </div>
  );
}

export default App;
