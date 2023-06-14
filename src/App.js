import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  return (
    <div className='app-container'>
      <Header/>
      
      <TableUsers/>
      

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
