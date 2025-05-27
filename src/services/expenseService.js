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