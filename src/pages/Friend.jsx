import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUnsettledExpenses} from "../services/expenseService.js";
import {getBalance} from "../services/balanceService.js";
import Expenses from "../components/Expenses.jsx";
import {getPayments} from "../services/paymentService.js";
import Payments from "../components/Payments.jsx";

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
    const paymentResult=useQuery({
        queryKey:['payment'],
        queryFn:()=>getPayments(email),
    })

    if(balanceResult.isLoading || expenseResult.isLoading || paymentResult.isLoading){
        return (
            <div>
                <h1>Loading data...</h1>
            </div>
        )
    }
    const balance=balanceResult.data.data;
    const unsettled=expenseResult.data.data;
    const payment=paymentResult.data.data;

    const mergedList=[
            ...unsettled.map((expense)=>({
            id:expense.expenseId,
            type:"expense",
            data:expense,
    })),
        ...payment.map((pay)=>({
            id:pay.paymentId,
            type:"payment",
            data:pay,
        }))
    ];
    const sortedList=mergedList.sort((a,b)=>a.id-b.id);
    return (
        <div>
            {email} <br/> {balance.oneOweTwo===0?`${balance.user2.firstName} owes ${balance.twoOweOne}`:balance.oneOweTwo}
            {
                sortedList.map((entity)=>
                    <div>
                        {entity.type==="expense"?
                        <Expenses unsettled={entity.data} email={email}/>:
                        <Payments payment={entity.data}/>}
                    </div>
                )
            }
        </div>
    )
}
export default Friend