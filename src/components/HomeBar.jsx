import {Link} from "react-router-dom";

const HomeBar=()=>{
    return(
        <header>
            <Link to="/login" className="mx-3">
                Login
            </Link> <br/>
            <Link to="/register" className="mx-3">
                Register
            </Link>
        </header>
    )
}
export default HomeBar