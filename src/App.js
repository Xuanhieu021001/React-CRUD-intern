import './App.scss';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

import {useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import {useDispatch, useSelector} from 'react-redux'
import { handleRefresh } from './redux/actions/userAction';


function App() {
  const dispath = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispath(handleRefresh())
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
