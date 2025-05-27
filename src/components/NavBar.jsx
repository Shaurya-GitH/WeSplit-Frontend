import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../reducers/userReducer.js";

const NavBar=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
        dispatch(logout());
        navigate("/");
    }
    return (
        <header className={"d-flex justify-content-between sticky-top p-2 bg-dark bg-gradient text-light"}>
            <Link to="/profile" className={"text-white link-underline link-underline-opacity-0"}>Profile</Link><br/>
            <Link to="/friends" className={"text-white link-underline link-underline-opacity-0"}>Friends</Link><br/>
            <Link to="/groups" className={"text-white link-underline link-underline-opacity-0"}>Groups</Link><br/>
            <button onClick={handleLogout} className={"bg-secondary rounded"}>Log Out</button>
        </header>
    )
}
export default NavBar