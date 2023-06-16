import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import { toast } from 'react-toastify';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse'

const TableUsers = (props)=>{   
    const[listUser,setListUser] = useState([])
    const[totalUsers,setTotalUsers] = useState(0);
    const[totalPages,setTotalPages] = useState(0);
    const[isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const[isShowModalEdit, setIsShowModalEdit] = useState(false)
    const[isShowModalDelete, setIsShowModalDelete] = useState(false)
    const[dataUserEdit,setDataUserEdit] = useState({})
    const[dataUserDelete,setDataUserDelete] = useState({})
    const[sortBy, setSortBy] = useState('asc')
    const[sortField,setSortField] = useState('id')
    const[searchKeyWord,setSearchKeyWord] =useState('')
    const[dataExport,setDataExport] = useState([])


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

    const handleDeleteUserFromModal = (user)=>{
        let newListUser = listUser.filter((item)=>{
            return item.id !== user.id
        })
        setListUser(newListUser)
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

    const handleSort = (sortBy,sortField)=>{
        setSortBy(sortBy);
        setSortField(sortField);
        Array.prototype.sortBy = function(p,by) {
            return this.slice(0).sort(function(a,b) {
                if(by==='asc'){
                    return (a[p] < b[p]) ? 1 : (a[p] > b[p]) ? -1 : 0;
                }
                else{
                    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
                }
            });
          }
    
          let newListUser = listUser.sortBy(sortField,sortBy);
          setListUser(newListUser)
    }
    const handleSearch=(event)=>{
        let term = event.target.value
        if(term){
            let newListUser = listUser.filter(item=>{
                if(item.email.includes(term)){
                    console.log('kkk');
                    return item
                }
            })
            setListUser(newListUser)
        }
        else{
            getUser(1)
        }
    }
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
      ];

      const getUserExport=(event,done)=>{
          let result = []
          if(listUser&& listUser.length>0){
              result.push(['ID','Email','First name','Last name'])
              listUser.map((item,index)=>{
                let arr =[]
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name
                result.push(arr)  
            })
            setDataExport(result);
            done()
          }
      }

      const handleExportCsv=(event)=>{
        if(event.target&& event.target.files && event.target.files[0]){
            let file = event.target.files[0]
            if(file.type!=='text/csv'){
                toast.error('only accept csv file')
                return 
            }
            Papa.parse(file,{
                complete: function(results){
                    let rawCSV = results.data
                    if(rawCSV.length>0){
                        if(rawCSV[0]&&rawCSV[0].length===3){
                            if(rawCSV[0][0]!=='email'
                            ||rawCSV[0][1]!=='first_name'
                            ||rawCSV[0][2]!=='last_name'){
                                toast.error('Wrong format header CSV file')
                            }
                            else{
                                let results =[]
                                rawCSV.map((item,index)=>{
                                    if(index>0 && item.length===3){
                                        let obj={};
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        results.push(obj)
                                    }
                                })
                                console.log(results);
                                setListUser(results)
                            }
                        }
                        else{
                            toast.error('Wrong format CSV file')
                        }
                    }
                    else{
                        toast.error('not found data on your CSV file')
                    }
                    // console.log('finished', results.data);
                }
            })
        }
      }

    return(
        <>
        <div className='my-3 d-sm-flex justify-content-between'>
            <span><b>List user</b></span>
            <div className='d-flex gap-2 mt-sm-0 mt-2'>
                <label htmlFor='import' className='btn btn-warning'><i className="fa-solid fa-file-arrow-down " role='button'></i> Import</label>
                <input id='import' type='file' hidden  onChange={(event)=>{handleExportCsv(event)}}/>
                <CSVLink
                filename={"my-file.csv"}
                className="btn btn-primary"
                data ={dataExport}
                asyncOnClick={true}
                onClick={getUserExport}
                ><i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>
                <button onClick={()=>{setIsShowModalAddNew(true)}} className='btn btn-success'> <i className="fa-solid fa-circle-plus"></i> Add user</button>
            </div>
        </div>
        <div className='col-sm-4 col-12 my-3'>
            <input 
            className='form-control' 
            placeholder='Search by email...'
            onChange={(event)=>handleSearch(event)}
            />
        </div>
        <div className="table-container overflow-auto">
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>
                    <div className='d-flex justify-content-between cursor-pointer' role="button">
                    <span>ID</span>
                    <span  className='d-flex gap-2'>
                        <i 
                        onClick={()=>handleSort('desc','id')}
                        className="fa-solid fa-arrow-up-wide-short"></i>
                        <i 
                        onClick={()=>handleSort('asc','id')}
                        className="fa-solid fa-arrow-down-wide-short"></i>

                    </span>
                    </div>
                </th>
                <th>Email</th>
                <th>
                <div className='d-flex justify-content-between cursor-pointer' role="button">
                    <span>First Name</span>
                    <span  className='d-flex gap-2'>
                        <i 
                        onClick={()=>handleSort('desc','first_name')}
                        className="fa-solid fa-arrow-up-wide-short"></i>
                        <i 
                        onClick={()=>handleSort('asc','first_name')}
                        className="fa-solid fa-arrow-down-wide-short"></i>

                    </span>
                    </div>
                </th>
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
                                    <button className='btn btn-warning mx-3 mb-2 mb-sm-0' onClick={()=>handleEditUser(user)}>Edit</button>
                                    <button className='btn btn-danger' onClick={()=>handleDeleteUser(user)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
        <ReactPaginate
            className='pagination justify-content-center'
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
        <ModalDeleteUser show={isShowModalDelete} handleClose={handleClose} dataUserDelete={dataUserDelete} handleDeleteUserFromModal={handleDeleteUserFromModal}/>
    </>
    )
}

export default TableUsers