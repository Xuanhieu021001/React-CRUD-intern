import axios from "../services/customize-axios"
const fetchAllUser = (page)=>{
    return (
        axios.get(`/api/users?page=${page}`)
    )
}

const createUser = (name,job)=>{
  return (
    axios.post(`/api/users`,{name,job})
  )
}
const updateUser = (name,job)=>{
  return (
    axios.put(`/api/users/2`,{name,job})
  )
}

const deleteUser = (id)=>{
  return axios.delete(`/api/users/${id}`)
}

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data :{statusCode: response.status} ;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export{fetchAllUser,createUser,updateUser,deleteUser}