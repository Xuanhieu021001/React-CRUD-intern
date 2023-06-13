import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import ModalAddNew from './components/ModalAddNew';
import { useState } from 'react';

function App() {
  const[isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  const handleClose = ()=>{
    setIsShowModalAddNew(false)
  }
  return (
    <div className='app-container'>
      <Header/>
      <div className='my-3 d-flex justify-content-between'>
        <span><b>List user</b></span>
        <button onClick={()=>{setIsShowModalAddNew(true)}} className='btn btn-success'>Add new user</button>
      </div>
      <TableUsers/>
      <ModalAddNew show={isShowModalAddNew} handleClose={handleClose}/>
    </div>
  );
}

export default App;
