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
        <header className={"flex sticky top-0 justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-3"}>
            <Link to="/profile" className="text-black font-bold text-2xl ">Profile</Link><br/>
            <Link to="/friends" className="text-black font-bold text-2xl ">Friends</Link><br/>
            <Link to="/groups" className="text-black font-bold text-2xl ">Groups</Link><br/>
            <button onClick={handleLogout} className={"text-blue-600 font-bold text-2xl hover:cursor-pointer "}>Log Out</button>
        </header>
    )
}
export default NavBar