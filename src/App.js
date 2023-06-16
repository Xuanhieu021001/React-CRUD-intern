import './App.scss';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import AppRoutes from './routes/AppRoutes';


function App() {
  const {user,login} = useContext(UserContext)
  // console.log(user);
  useEffect(()=>{
    if(localStorage.getItem('token')){
      login(localStorage.getItem('email'),localStorage.getItem('token'))
    }
  })
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
