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
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Friend Info & Balance */}
            <div className="bg-linear-to-b from-cyan-500 to-blue-500 rounded-lg border border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-2">{email}</div>
                <div className="text-lg font-medium text-gray-900">
                    {balance.oneOweTwo === 0
                        ? `${balance.user2.firstName} owes  ${balance.twoOweOne}`
                        : `${balance.user1.firstName} owes  ${balance.oneOweTwo}`
                    }
                </div>
            </div>

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

            {/* Transactions List */}
            <div className="space-y-3">
                {sortedList.map((entity) => (
                    <div key={entity.id} className="bg-white rounded-lg border border-gray-200 p-4">
                        {entity.type === "expense" ?
                            <Expenses unsettled={entity.data} /> :
                            <Payments payment={entity.data} />
                        }
                    </div>
                ))}
            </div>

            {/* Modals */}
                <Toggleable state={showCreateExpense}>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <CreateSoloExpenseModal setShowCreateExpense={setShowCreateExpense} />
                        </div>
                    </div>
                </Toggleable>
                <Toggleable state={showCreatePayment}>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <CreatePaymentModal balance={balance} setShowCreatePayment={setShowCreatePayment} />
                        </div>
                    </div>
                </Toggleable>
        </div>

    )
}
export default SoloFriend