import {useLocation, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getGroupBalance} from "../services/balanceService.js";
import {getGroupUnsettledExpenses} from "../services/expenseService.js";
import {getPayments} from "../services/paymentService.js";
import TransactionList from "../components/TransactionList.jsx";
import {useState} from "react";

const SoloGroupPage=()=>{
    const {group}=useLocation().state;
    const id=useParams().id;
    const [showCreatePayment,setShowCreatePayment]=useState(false);
    const [showCreateExpense,setShowCreateExpense]=useState(false);

    const balanceResult=useQuery({
        queryKey:['groupBalance'],
        queryFn:()=>getGroupBalance(id)
    })
    const unsettledResult=useQuery({
        queryKey:['groupUnsettled'],
        queryFn:()=>getGroupUnsettledExpenses(id)
    })
    const paymentResult=useQuery({
        queryKey:['groupPayment'],
        queryFn:()=>getPayments("aarav@gmail.com"),
    })

    if(balanceResult.isLoading || unsettledResult.isLoading || paymentResult.isLoading){
        return (
            <div>
                <h1>Fetching data...</h1>
            </div>
        )
    }

    const balances=balanceResult.data.data;
    const unsettled=unsettledResult.data.data;
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
            <aside>
                {group.members.map((member)=>
                    <div key={member.email}>
                       <h1>{member.firstName} {member.lastName}</h1>
                        <i>{member.email}</i>
                    </div>
                )}
            </aside>
            <div>
                <h1>{group.groupName}</h1>
                {balances.map((balance,i)=>
                        <div key={i}>
                            {balance.oneOweTwo===0 && balance.twoOweOne===0?<div></div>: balance.oneOweTwo === 0
                                ? `${balance.user2.firstName} owes  ${balance.twoOweOne}`
                                : `${balance.user1.firstName} owes  ${balance.oneOweTwo}`
                            }
                        </div>
                    )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => {
                            setShowCreatePayment(true);
                            setShowCreateExpense(false);
                        }}
                        className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                        Settle
                    </button>
                    <button
                        onClick={() => {
                            setShowCreateExpense(true);
                            setShowCreatePayment(false);
                        }}
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                        Add Expense
                    </button>
                </div>

                <TransactionList sortedList={sortedList}/>
            </div>
        </div>

    )
}
export default SoloGroupPage