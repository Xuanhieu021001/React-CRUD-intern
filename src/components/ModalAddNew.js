import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createUser } from '../services/UserService';
import{toast} from 'react-toastify'
const ModalAddNew = (props)=>{
    const{show,handleClose,handleUpdateTable} = props
    const [name,setName]=useState('')
    const [job,setJob]=useState('')
    
    const handleSaveUser= async()=>{
      let res = await createUser(name,job)
      if(res && res.id){
        handleClose();
        setName('')
        setJob('')
        toast.success('Thêm thành công user')
        handleUpdateTable({first_name:res.name, id: res.id})
      }
        
    }
    return(
        <>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                <div className='mb-3'>
                    <label>Name</label>
                    <input 
                    type='text' 
                    className='form-control'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label>Job</label>
                    <input 
                    type='text' 
                    className='form-control'
                    value={job}
                    onChange={(e)=>setJob(e.target.value)}
                    />
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleSaveUser()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default ModalAddNew