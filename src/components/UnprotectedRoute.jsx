import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {healthCheck} from "../services/publicService.js";
import {down, up} from "../reducers/heatlhReducer.js";
import {useEffect} from "react";

const UnprotectedRoute=(props)=>{
    const user=useSelector(state => state.user);
    const dispatch=useDispatch();
    const healthResult=useQuery({
        queryKey:['health'],
        queryFn:healthCheck,
        retry:false,
    });
    
    useEffect(()=>{
        if(healthResult.isError){
            dispatch(down());
        }
        else {
            dispatch(up());
        }
    },[healthResult]);
    
    if(healthResult.isLoading || healthResult.isError){
        return null;
    }
    
    return(
            <>
                {user?<Navigate to="/profile"/>:props.children}
            </>
    )
    
}

export default UnprotectedRoute