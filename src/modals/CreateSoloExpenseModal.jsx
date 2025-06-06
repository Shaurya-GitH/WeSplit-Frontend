import {useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {createSoloExpense} from "../services/expenseService.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const CreateSoloExpenseModal=({setShowCreateExpense})=>{
    const email1= useSelector(state=>state.user);
    const email2= useParams().email;
    const queryClient=useQueryClient();
    const [formData,setFormData]=useState({
        description:"",
        amount:0,
        expenseType:"SPLIT_EQUALLY_PAIDBY_USER1",
        currency:""
    })

    const mutation=useMutation({
        mutationFn:createSoloExpense,
        onSuccess:()=>{
            Promise.all([
                queryClient.invalidateQueries({queryKey:['unsettledExpenses']}),
                queryClient.invalidateQueries({queryKey:['payment']}),
                queryClient.invalidateQueries({queryKey:['soloBalance']}),
            ])
                .then(()=>{
                    setShowCreateExpense(false);
                })
        }
    })

    const handleInput=({name,value})=>{
        const newFormData={
            ...formData,
            [name]:value,
        }
        setFormData(newFormData);
    }

    const handleSelect=(e)=>{
        const newFormData={
            ...formData,
            expenseType:e.target.value,
        }
        setFormData(newFormData);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const payload={
            email:email2,
            formData:formData,
        }
        mutation.mutate(payload);
    }

    return(
        <div className="p-6 w-full max-w-md mx-auto">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create Expense</h2>
                <button
                    onClick={() => setShowCreateExpense(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        name="description"
                        type="text"
                        value={formData.description}
                        onInput={(e) => handleInput(e.target)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter expense description"
                    />
                </div>

                {/* Amount Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <div className="flex gap-2">
                        <input
                            name="currency"
                            type="text"
                            value={formData.currency}
                            onInput={(e) => handleInput(e.target)}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="INR"
                            maxLength="3"
                        />
                        <input
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onInput={(e) => handleInput(e.target)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Expense Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                    <select
                        onChange={handleSelect}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="SPLIT_EQUALLY_PAIDBY_USER1">Split equally and paid by {email1}</option>
                        <option value="SPLIT_EQUALLY_PAIDBY_USER2">Split equally and paid by {email2}</option>
                        <option value="OWED_USER1">{email1} owes all</option>
                        <option value="OWED_USER2">{email2} owes all</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={formData.description === "" || formData.currency === "" || formData.currency.length !== 3 || formData.amount <= 0 || formData.amount === null || formData.expenseType === ""}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Add Expense
                </button>
            </form>
        </div>

    )
}
export default CreateSoloExpenseModal