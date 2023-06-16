import { Routes,Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Login from './components/Login';


function App() {
  
  return (
    <div className='app-container'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/users' element={ <TableUsers/> }></Route>
        <Route path='/login' element={ <Login/> }></Route>
      </Routes>
      
     

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
