import axios from "axios";

const backendDN=import.meta.env.VITE_BACKEND_DN;
const url=`http://${backendDN}/api/user`

const getFriends=async ()=>{
        const token=localStorage.getItem("token")
        const config= {
            headers:{
                Authorization:token
            }
        }
       return await axios.get(`${url}/friend-list`,config);
}

const addFriend=async (payload)=>{
        const token=localStorage.getItem("token");
        const config={
            headers:{
                Authorization: token
            }
        }
        return await axios.post(`${url}/add-friend`, payload, config);
}

const logOut=async ()=>{
    const token=localStorage.getItem("token");
    const config={
        headers:{
            Authorization: token
        }
    }
    try{
        const resp= await axios.get(`${url}/logout`,config);
        return resp.status;
    }
    catch (e){
        console.log("error");
    }

}
export default {getFriends,addFriend,logOut}