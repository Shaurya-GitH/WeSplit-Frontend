import {Link} from "react-router-dom";

const HomeBar=()=>{
    return(
        <header className={"flex sticky justify-end bg-blue-300 p-3"}>
            <Link to="/" className="mr-auto text-white font-bold text-2xl ">
                Home
            </Link> <br/>
            <Link to="/login" className="mx-3 text-white font-bold text-2xl">
                Login
            </Link> <br/>
            <Link to="/register" className="mx-3 text-white font-bold text-2xl">
                Register
            </Link>
        </header>
    )
}
export default HomeBar