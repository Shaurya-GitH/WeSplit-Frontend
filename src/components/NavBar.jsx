import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../reducers/userReducer.js";
import userService from "../services/userService.js";

const NavBar=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=async ()=>{
        const status= await userService.logOut();
        if(status===200){
            dispatch(logout());
            navigate("/");
        }
        else{
            console.log("error");
        }
    }
    return (
        <header>
            <Link to="/profile" className={"text-white link-underline link-underline-opacity-0"}>Profile</Link><br/>
            <Link to="/friends" className={"text-white link-underline link-underline-opacity-0"}>Friends</Link><br/>
            <Link to="/groups" className={"text-white link-underline link-underline-opacity-0"}>Groups</Link><br/>
            <button onClick={handleLogout} className={"bg-secondary rounded"}>Log Out</button>
        </header>
    )
}
export default NavBar