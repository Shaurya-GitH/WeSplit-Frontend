import axios from "axios";

const backendDN=import.meta.env.VITE_BACKEND_DN;
const url=`http://${backendDN}:8080/api/groups`;

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

export const addGroupMember=async ({groupId,selectedMemberList})=>{
    const token=localStorage.getItem("token")
    const config={
       headers:{
           Authorization:token
       }
    }
    return axios.post(`${url}/add/${groupId}`,selectedMemberList,config)
}
