import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUnsettledExpenses} from "../services/expenseService.js";
import {getBalance} from "../services/balanceService.js";
import Expenses from "../components/Expenses.jsx";
import {getPayments} from "../services/paymentService.js";
import Payments from "../components/Payments.jsx";
import CreatePaymentModal from "../components/CreatePaymentModal.jsx";
import {useState} from "react";
import Toggleable from "../components/Toggleable.jsx";
import CreateSoloExpenseModal from "../components/CreateSoloExpenseModal.jsx";

const SoloFriend=()=>{
    const email=useParams().email;
    const [showCreatePayment,setShowCreatePayment]=useState(false);
    const [showCreateExpense,setShowCreateExpense]=useState(false);
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
    const sortedList=mergedList.sort((a,b)=>b.id-a.id);
    return (
        <div>
            {email} <br/> {balance.oneOweTwo===0?`${balance.user2.firstName} owes ${balance.twoOweOne}`:`${balance.user1.firstName} owes ${balance.oneOweTwo}`}
            <button onClick={()=>{
                setShowCreatePayment(true);
                setShowCreateExpense(false);
            }}>Settle</button><br/>
            <button onClick={()=>{
                setShowCreateExpense(true);
                setShowCreatePayment(false);
            }}>Add Expense</button>
            {
                sortedList.map((entity)=>
                    <div key={entity.id}>
                        {entity.type==="expense"?
                        <Expenses unsettled={entity.data}/>:
                        <Payments payment={entity.data}/>}
                    </div>
                )
            }
            <div>
                <Toggleable state={showCreateExpense}>
                    <CreateSoloExpenseModal setShowCreateExpense={setShowCreateExpense}/>
                </Toggleable>
                <Toggleable state={showCreatePayment}>
                    <CreatePaymentModal balance={balance} setShowCreatePayment={setShowCreatePayment}/>
                </Toggleable>
            </div>
        </div>
    )
}
export default SoloFriend