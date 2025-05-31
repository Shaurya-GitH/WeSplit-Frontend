import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUnsettledExpenses} from "../services/expenseService.js";
import {getBalance} from "../services/balanceService.js";
import Expenses from "../components/Expenses.jsx";

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
            {email} <br/> {balance.oneOweTwo===0?`${balance.user2.firstName} owes ${balance.twoOweOne}`:balance.oneOweTwo}
            <Expenses unsettled={unsettled}/>
        </div>
    )
}
export default Friend