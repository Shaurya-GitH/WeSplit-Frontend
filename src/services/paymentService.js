import axios from "axios";

const backendDN=import.meta.env.VITE_BACKEND_DN;
const url=`http://${backendDN}:8080/api/payment`;

export const getPayments=async (email)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.get(`${url}/${email}`,config);
}

export const getGroupPayments=async (id)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.get(`${url}/group/${id}`,config);
}

export const createPayment=async (payload)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.post(`${url}/create`,payload,config);
}

export const createGroupPayment=async (payload)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.post(`${url}/createGroup`,payload,config);
}