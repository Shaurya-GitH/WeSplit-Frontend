import {useState} from "react";
import CreatePaymentModal from "./CreatePaymentModal.jsx";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const CreateGroupPaymentModal=({balances,setShowCreatePayment})=>{
    const groupId=useParams().id;
    const email=useSelector(state => state.user);
    const [showNextStep,setShowNextStep]=useState(false);
    const [balanceChosen,setBalanceChosen]=useState(null);
    const handleClick=(balance)=>{
        setBalanceChosen(balance);
        setShowNextStep(true);
    }
    if(showNextStep){
        return (
            <div>
                <CreatePaymentModal balance={balanceChosen} groupId={groupId} setShowCreatePayment={setShowCreatePayment}/>
            </div>
        )
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Choose a balance to settle</h2>
                    <button
                        onClick={() => setShowCreatePayment(false)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-3">
                    {balances.length>0?balances.map((balance, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 rounded p-3">
                            <button
                                onClick={() => handleClick(balance)}
                                className="text-blue-600 hover:underline font-medium hover:cursor-pointer"
                            >
                                {balance.user1.email === email
                                    ? `${balance.user2.firstName} ${balance.user2.lastName}`
                                    : `${balance.user1.firstName} ${balance.user1.lastName}`}
                            </button>
                            <span className="text-gray-700 font-bold">
            {balance.oneOweTwo === 0 ? balance.twoOweOne : balance.oneOweTwo}
          </span>
                        </div>
                    )):
                    <div>
                        <span  className="text-gray-700 font-bold">No balances to settle</span>
                    </div>
                    }
                </div>
            </div>
        </div>

    )
}
export default CreateGroupPaymentModal