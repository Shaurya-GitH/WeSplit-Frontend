import axios from "axios";

const url="http://localhost:8080/api/balance"

export const getBalance=async (email)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return await axios.get(`${url}/solo/${email}`,config)
}