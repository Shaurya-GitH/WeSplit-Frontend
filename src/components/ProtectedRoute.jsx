import {Navigate} from "react-router-dom";
import useRoute from "../hooks/useRoute.js";

const ProtectedRoute=(props)=>{
    const user =useRoute();
    return(
        <>
            {user?props.children:<Navigate to="/login" replace/> }
        </>
    )
}
export default ProtectedRoute