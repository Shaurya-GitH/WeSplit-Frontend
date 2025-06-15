import axios from "axios";

const url="http://localhost:8080/api/groups";

export const getGroups=async ()=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return axios.get(`${url}/`,config);
}

export const createGroup=async (name)=>{
    const token=localStorage.getItem("token")
    const config= {
        headers:{
            Authorization:token
        }
    }
    return axios.post(`${url}/create/${name}`,null,config);
}