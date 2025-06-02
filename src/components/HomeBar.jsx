import {Link} from "react-router-dom";

const HomeBar=()=>{
    return(
        <header className={"flex sticky top-0 justify-end bg-gradient-to-r from-blue-50 to-indigo-50 p-3"}>
            <Link to="/" className="mr-auto text-black font-bold text-2xl ">
                Home
            </Link> <br/>
            <Link to="/login" className="mx-3 text-black font-bold text-2xl">
                Login
            </Link> <br/>
            <Link to="/register" className="mx-3 text-blue-600 font-bold text-2xl">
                Register
            </Link>
        </header>
    )
}
export default HomeBar