import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
const TableUsers = (props)=>{   
    const[listUser,setListUser] = useState([])
    const[totalUsers,setTotalUsers] = useState(0);
    const[totalPages,setTotalPages] = useState(0);
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
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
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

        </>
    )
}

export default TableUsers