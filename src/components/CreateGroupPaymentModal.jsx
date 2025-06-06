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
                <h1 className="text-xl font-semibold mb-4 text-center">Choose a balance to settle</h1>
                <div className="space-y-3">
                    {balances.map((balance, i) => (
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
                    ))}
                </div>
            </div>
        </div>

    )
}
export default CreateGroupPaymentModal