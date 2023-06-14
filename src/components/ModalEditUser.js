import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateUser } from '../services/UserService';
import{toast} from 'react-toastify'
const ModalEditUser = (props)=>{
    const{show,handleClose,dataUserEdit,handleEditUserFromModal} = props
    const [name,setName]=useState('')
    const [job,setJob]=useState('')
    
    const handleEditUser = async()=>{
      let res = await updateUser(name,job)
      if(res&& res.updatedAt){
        handleEditUserFromModal({
          first_name:name,
          id:dataUserEdit.id
        })
      }
    }

    useEffect(()=>{
      setName(dataUserEdit.first_name)
      setJob(dataUserEdit.job)
    },[dataUserEdit])

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
          <Button variant="primary" onClick={()=>{handleEditUser()}}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default ModalEditUser