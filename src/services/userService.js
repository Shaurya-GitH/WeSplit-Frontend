import axios from "axios";

const url="http://localhost:8080/api/user"

const getFriends=async ()=>{
        const token=localStorage.getItem("token")
        const config= {
            headers:{
                Authorization:token
            }
        }
        const friends= await axios.get(`${url}/friend-list`,config);
        return friends.data;
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