import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalDeleteUser = (props)=>{
    const{show,handleClose,dataUserDelete} = props
    const handleDeleteUser =()=>{

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