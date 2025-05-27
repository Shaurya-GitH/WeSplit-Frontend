import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const UnprotectedRoute=(props)=>{
    const user=useSelector(state => state.user);
    return(
        <>
            {user?<Navigate to="/profile"/>:props.children}
        </>
    )
}
export default UnprotectedRoute