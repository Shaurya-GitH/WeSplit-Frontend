import {Navigate} from "react-router-dom";
import useRoute from "../hooks/useRoute.js";

const UnprotectedRoute=(props)=>{
    const user =useRoute();
    return(
            <>
                {user?<Navigate to="/profile"/>:props.children}
            </>
    )
    
}

export default UnprotectedRoute