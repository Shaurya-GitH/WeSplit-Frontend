import axios from "axios";

const url="http://localhost:8080/api/public"

const loginToServer=async (username,password)=>{
    const credentials={
        "email":username,
        "password":password
    };
    try{
        const token = await axios.post(`${url}/login`,credentials);
        localStorage.setItem("token",`Bearer ${token.data}`);
        return token;
    }
    catch (e) {
        return {
            status: e.response.status,
            data: e.response.data,
        };
    }
}

const registerUser=async (payload)=>{
    try{
        return await axios
            .post(`${url}/register`, payload);
    }
    catch (e){
        return {
           status:e.response.status,
           data:e.response.data,
        };
    }
}

export default {loginToServer,registerUser}