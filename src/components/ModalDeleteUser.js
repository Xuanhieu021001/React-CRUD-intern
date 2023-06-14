import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalDeleteUser = (props)=>{
    const{show,handleClose,dataUserDelete,handleDeleteUserFromModal} = props
    const handleDeleteUser = async()=>{
      let res = await deleteUser(dataUserDelete.id)
      if(res && +res.statusCode===204){
        handleDeleteUserFromModal(dataUserDelete)
        toast.success('xóa thành công')
        handleClose()
      }
    }    
    return(
        <>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                Do you want delete this user
                <br/>
                <b>email = {dataUserDelete.email}</b>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleDeleteUser()}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default ModalDeleteUser