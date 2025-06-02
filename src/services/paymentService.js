import axios from "axios";

const url="http://localhost:8080/api/payment";

export const getPayments=async (email)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.get(`${url}/${email}`,config);
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