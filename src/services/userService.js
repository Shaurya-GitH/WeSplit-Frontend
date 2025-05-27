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
export default {getFriends,addFriend}