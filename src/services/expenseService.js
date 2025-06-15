import axios from "axios";

const url="http://localhost:8080/api/expense"

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