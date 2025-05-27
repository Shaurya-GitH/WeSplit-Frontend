import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUnsettledExpenses} from "../services/expenseService.js";
import {getBalance} from "../services/balanceService.js";
import SoloFriendPage from "./SoloFriendPage.jsx";

const Friend=()=>{
    const email=useParams().email;
    const expenseResult= useQuery({
        queryKey:['unsettledExpenses'],
        queryFn:()=>getUnsettledExpenses(email),
    })
    const balanceResult= useQuery({
        queryKey:['soloBalance'],
        queryFn:()=>getBalance(email),
    })
    if(balanceResult.isLoading || expenseResult.isLoading){
        return (
            <div>
                <h1>Loading data...</h1>
            </div>
        )
    }
    const balance=balanceResult.data.data;
    const unsettled=expenseResult.data.data;
    return (
        <div>
            <SoloFriendPage email={email} balance={balance} unsettled={unsettled}/>
        </div>
    )
}
export default Friend