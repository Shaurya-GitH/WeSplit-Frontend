import axios from "axios";

const backendDN=import.meta.env.VITE_BACKEND_DN;
const url=`http://${backendDN}/api/expense`

export const getUnsettledExpenses=async (email)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.get(`${url}/unsettled/${email}`,config);
}

export const createSoloExpense=async (payload)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.post(`${url}/create-solo/${payload.email}`,payload.formData,config);
}

export const getGroupUnsettledExpenses=async (id)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.get(`${url}/group-unsettled/${id}`,config);
}


export const createGroupExpense= async (payload)=>{
    const token=localStorage.getItem("token")
    const config={
        headers:{
            Authorization:token
        }
    }
    return axios.post(`${url}/create-group`,payload,config)
}