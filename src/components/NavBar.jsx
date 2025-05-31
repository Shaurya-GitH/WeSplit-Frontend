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
        <header className={"flex sticky justify-between bg-blue-300 p-3"}>
            <Link to="/profile" className="mx-3 text-white font-bold text-2xl">Profile</Link><br/>
            <Link to="/friends" className="mx-3 text-white font-bold text-2xl">Friends</Link><br/>
            <Link to="/groups" className="mx-3 text-white font-bold text-2xl">Groups</Link><br/>
            <button onClick={handleLogout} className={"text-white font-bold text-2xl"}>Log Out</button>
        </header>
    )
}
export default NavBar