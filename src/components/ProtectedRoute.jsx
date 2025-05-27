import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const ProtectedRoute=(props)=>{
    const user=useSelector(state => state.user);
    return(
        <>
            {user?props.children:<Navigate to="/login" replace/> }
        </>
    )
}
export default ProtectedRoute