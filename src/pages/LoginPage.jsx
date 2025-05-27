import {useDispatch} from "react-redux";
import {login} from "../reducers/userReducer.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Toggleable from "../components/Toggleable.jsx";
import publicService from "../services/publicService.js";

const LoginPage=()=>{
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [incorrect,setIncorrect]= useState(false);

    const handleLogin=async (event)=>{
        event.preventDefault();
        const username=event.target.username.value;
        const result=await publicService.loginToServer(username,event.target.password.value);
        if(result){
            setIncorrect(false)
            dispatch(login(username));
            navigate("/profile")
        }
        else{
            setIncorrect(true)
            navigate("/login")
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <Toggleable state={incorrect}>
                <h3>Incorrect username or password</h3>
            </Toggleable>
            <form onSubmit={handleLogin}>
                Email: <input type="text" name="username"/><br/>
                Password: <input type="password" name="password"/><br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}
export default LoginPage