import axios from "axios";

const backendDN=import.meta.env.VITE_BACKEND_DN;
const url=`http://${backendDN}:8080/api/balance`

export const getBalance=async (email)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.get(`${url}/solo/${email}`,config)
}

export const getGroupBalance=async (id)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return axios.get(`${url}/group/${id}`,config);
}