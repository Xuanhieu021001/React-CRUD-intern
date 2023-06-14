import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import { toast } from 'react-toastify';

const TableUsers = (props)=>{   
    const[listUser,setListUser] = useState([])
    const[totalUsers,setTotalUsers] = useState(0);
    const[totalPages,setTotalPages] = useState(0);
    const[isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const[isShowModalEdit, setIsShowModalEdit] = useState(false)
    const[isShowModalDelete, setIsShowModalDelete] = useState(false)
    const[dataUserEdit,setDataUserEdit] = useState({})
    const[dataUserDelete,setDataUserDelete] = useState({})



    const handleClose = ()=>{
      setIsShowModalAddNew(false)
      setIsShowModalEdit(false)
      setIsShowModalDelete(false)
    }

    const handleUpdateTable = (user)=>{
        setListUser([user,...listUser])
    }

    const handleEditUser = (user)=>{
        setIsShowModalEdit(true)
        setDataUserEdit(user)
    }

    const handleDeleteUser=(user)=>{
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }

    const handleEditUserFromModal=(user)=>{
        let newListUser = listUser.filter((item)=>{
            if(item.id===user.id){
                item.first_name = user.first_name
            }
            return item
        })
        setListUser(newListUser)
        toast.success('Edit a user successfully')
        setIsShowModalEdit(false)
    }

    useEffect(()=>{
        getUser(1)
    },[])

    const getUser = async (page)=>{
        let res = await fetchAllUser(page)
        if(res&& res.data){
            setListUser(res.data)
            setTotalPages(res.total_pages)
            setTotalUsers(res.total)
        }
    }

    const handlePageClick = (event)=>{
        getUser(+event.selected +1)
    }
    return(
        <>
        <div className='my-3 d-flex justify-content-between'>
            <span><b>List user</b></span>
            <button onClick={()=>{setIsShowModalAddNew(true)}} className='btn btn-success'>Add new user</button>
        </div>

        <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length>0 &&
                    listUser.map((user,index)=>{
                        return(
                            <tr key={`user-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>
                                    <button className='btn btn-warning mx-3' onClick={()=>handleEditUser(user)}>Edit</button>
                                    <button className='btn btn-danger' onClick={()=>handleDeleteUser(user)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />
        <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable}/>
        <ModalEditUser show={isShowModalEdit} handleClose={handleClose} dataUserEdit={dataUserEdit} handleEditUserFromModal={handleEditUserFromModal}/>
        <ModalDeleteUser show={isShowModalDelete} handleClose={handleClose} dataUserDelete={dataUserDelete}/>
    </>
    )
}

export default TableUsers