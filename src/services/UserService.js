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

const loginUser = (email,password)=>{
  return axios.post(`api/login`,{email,password})
}

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data :{statusCode: response.status} ;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let res = {}
    if (error.response) {
      res.data =error.response.data
      res.status =error.response.status
      res.headers =error.response.headers
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return res;
  });
export{fetchAllUser,createUser,updateUser,deleteUser,loginUser}