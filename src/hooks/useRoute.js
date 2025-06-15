import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {healthCheck} from "../services/publicService.js";
import {useEffect} from "react";
import {down, up} from "../reducers/heatlhReducer.js";

const useRoute=()=>{
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

    return user;
}

export default useRoute