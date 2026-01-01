import {useLocation, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getGroupBalance} from "../services/balanceService.js";
import {getGroupUnsettledExpenses} from "../services/expenseService.js";
import {getGroupPayments} from "../services/paymentService.js";
import TransactionList from "../components/TransactionList.jsx";
import {useState} from "react";
import Toggleable from "../components/Toggleable.jsx";
import CreateSoloExpenseModal from "../modals/CreateSoloExpenseModal.jsx";
import CreateGroupPaymentModal from "../modals/CreateGroupPaymentModal.jsx";
import Loading from "../components/Loading.jsx";
import AddGroupMemberModal from "../modals/AddGroupMemberModal.jsx";

const SoloGroupPage=()=>{
    const {group}=useLocation().state;
    const id=useParams().id;
    const [showCreatePayment,setShowCreatePayment]=useState(false);
    const [showCreateExpense,setShowCreateExpense]=useState(false);
    const [showAddMember,setShowAddMember]=useState(false);
    const [groupMembers,setGroupMembers]=useState(group.members);

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
        queryFn:()=>getGroupPayments(id),
    })

    if(balanceResult.isLoading || unsettledResult.isLoading || paymentResult.isLoading){
        return (
            <Loading/>
        )
    }

    const balances=balanceResult.data.data;
    const unsettled=unsettledResult.data.data;
    const payment=paymentResult.data.data;

    const mergedList = [
        ...unsettled.map(expense => ({
            id: expense.expenseId,
            type: "expense",
            data: expense,
        })),
        ...payment.map(pay => ({
            id: pay.paymentId,
            type: "payment",
            data: pay,
        }))
    ];
    let sortedList;
    if (unsettled.length === 0) {
        sortedList = [];
    } else {
        const firstUnsettledId = unsettled[0].expenseId;
        sortedList = mergedList
            .filter(item =>
                item.type !== "payment" ||
                item.id >= payment.findLast(p => p.paymentId < firstUnsettledId)?.paymentId
            )
            .sort((a, b) => b.id - a.id);
    }

    return (

        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-4 lg:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Sidebar - Group Members */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Group Members</h2>
                            <button onClick={()=>setShowAddMember(true)}>+</button>
                            <div className="space-y-3">
                                {groupMembers.map((member) => (
                                    <div key={member.email} className="p-3 bg-gray-50 rounded-lg">
                                        <h3 className="font-medium text-gray-900">
                                            {member.firstName} {member.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-600">{member.email}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm p-6">

                            {/* Group Header */}
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-4">{group.groupName}</h1>

                                {/* Balances Section */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-800 mb-3">Current Balances</h3>
                                    <div className="space-y-2">
                                        {balances.map((balance, i) => (
                                            <div key={i} className="text-sm">
                                                {balance.oneOweTwo === 0 && balance.twoOweOne === 0 ? (
                                                    <div></div>
                                                ) : balance.oneOweTwo === 0 ? (
                                                    <p className="text-green-600">
                                                        {balance.user2.firstName} owes {balance.user1.firstName} ${balance.twoOweOne}
                                                    </p>
                                                ) : (
                                                    <p className="text-red-600">
                                                        {balance.user1.firstName} owes {balance.user2.firstName} ${balance.oneOweTwo}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <button
                                    onClick={() => {
                                        setShowCreatePayment(true);
                                        setShowCreateExpense(false);
                                    }}
                                    className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                                >
                                    Settle Balance
                                </button>
                                <button
                                    onClick={() => {
                                        setShowCreateExpense(true);
                                        setShowCreatePayment(false);
                                    }}
                                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Add Expense
                                </button>
                            </div>

                            {/* Transaction List */}
                            <div className="border-t pt-6">
                                <TransactionList sortedList={sortedList} />
                            </div>
                        </div>
                    </div>
                </div>
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
                        <CreateGroupPaymentModal balances={balances} setShowCreatePayment={setShowCreatePayment} />
                    </div>
                </div>
            </Toggleable>

            <Toggleable state={showAddMember}>
                <AddGroupMemberModal setShowAddMember={setShowAddMember} groupMembers={groupMembers} groupId={id} setGroupMembers={setGroupMembers}/>
            </Toggleable>
        </div>


    )
}
export default SoloGroupPage