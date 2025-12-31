import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createGroupPayment, createPayment} from "../services/paymentService.js";

const CreatePaymentModal=({balance,setShowCreatePayment,groupId})=>{
    const [formData,setFormData]=useState({
        amountPaid:balance.oneOweTwo===0?balance.twoOweOne:balance.oneOweTwo,
        currency:"",
        email1:balance.oneOweTwo===0?balance.user2.email:balance.user1.email,
        email2:balance.oneOweTwo===0?balance.user1.email:balance.user2.email,
    })
    const queryClient=useQueryClient();
    const mutation=useMutation({
        mutationFn:createPayment,
        onSuccess:()=>{
           Promise.all([
               queryClient.invalidateQueries({queryKey:['unsettledExpenses']}),
               queryClient.invalidateQueries({queryKey:['payment']}),
               queryClient.invalidateQueries({queryKey:['soloBalance']}),
           ])
               .then(()=>{
                   setShowCreatePayment(false);
               })
        },
    })

    const groupMutation=useMutation({
        mutationFn:createGroupPayment,
        onSuccess:()=>{
            Promise.all([
                queryClient.invalidateQueries({queryKey:['groupUnsettled']}),
                queryClient.invalidateQueries({queryKey:['groupPayment']}),
                queryClient.invalidateQueries({queryKey:['groupBalance']}),
            ])
                .then(()=>{
                    setShowCreatePayment(false);
                })
        },
    })

    const handleSwitch=()=>{
        const currency=formData.currency;
        const temp=formData.email1;
        const email1=formData.email2;
        setFormData({
            amountPaid:0,
            currency:currency,
            email1:email1,
            email2:temp,
        })
    }
    const handleInput=({name,value})=>{
        const newFormData={
            ...formData,
            [name]:value,
        }
        setFormData(newFormData);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(groupId){
            const groupFormData={
                ...formData,
                groupId:groupId,
            };
            groupMutation.mutate(groupFormData);
        }
        else{
            mutation.mutate(formData);
        }
    }
    return (
        <div className="p-6 w-full max-w-md mx-auto">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create Payment</h2>
                <button
                    onClick={() => setShowCreatePayment(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Payment Direction */}
            <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
        <span className="text-sm text-gray-700">
            <span className="font-medium">{formData.email1}</span> paid <span className="font-medium">{formData.email2}</span>
        </span>
                <button
                    onClick={handleSwitch}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    Switch
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <input
                        type="text"
                        name="currency"
                        placeholder="INR"
                        value={formData.currency}
                        onInput={(e) => handleInput(e.target)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                        type="number"
                        step="any"
                        name="amountPaid"
                        value={formData.amountPaid}
                        onInput={(e) => handleInput(e.target)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                        min="1"
                    />
                </div>

                <button
                    type="submit"
                    disabled={formData.currency === "" || formData.amountPaid <= 0 || formData.email1 === formData.email2 || formData.email1 === ""}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Pay
                </button>
            </form>
        </div>

    )
}
export default CreatePaymentModal