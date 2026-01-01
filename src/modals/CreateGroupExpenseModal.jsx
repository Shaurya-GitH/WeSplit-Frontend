import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createGroupExpense} from "../services/expenseService.js";

const CreateGroupExpenseModal=({setShowCreateExpense, groupMembers, groupId})=>{
    const queryClient=useQueryClient();

    const [description,setDescription]=useState("")
    const [error, setError] = useState('');
    const [currency,setCurrency]=useState("")
    const [payments,setPayments]=useState({})
    const [owe,setOwe]=useState({})
    const [proceed,setProceed]=useState(false)
    const [amount,setAmount]=useState(0)
    const [selectedEmails, setSelectedEmails] = useState([]);

    const mutation=useMutation({
        mutationFn: createGroupExpense,
        onSuccess:()=>{
            Promise.all([
               queryClient.invalidateQueries({queryKey:['groupPayment']}) ,
               queryClient.invalidateQueries({queryKey:['groupUnsettled']}) ,
               queryClient.invalidateQueries({queryKey:['groupBalance']}) ,
            ]).then(
                setShowCreateExpense(false)
            )
        }
    })

    useEffect(()=>{
      let initialPayments={}
      for(const member of groupMembers){
            initialPayments[member.email]=Number(0)
        }
      setOwe(initialPayments)
      setPayments(initialPayments)
    },[groupMembers])

    useEffect(()=>{
        let totalAmount=0
        for(const member of groupMembers){
            totalAmount=totalAmount+Number(payments[member.email])
        }
        setAmount(totalAmount)
    },[payments,groupMembers])

    const handleInput=(event,email)=>{
        let modifiedPayments={...payments}
        modifiedPayments[email]=Number(event.target.value)
        setPayments(modifiedPayments)
    }

    const handleToggleMember = (email) => {
        setSelectedEmails(prev => {
            if (prev.includes(email)) {
                return prev.filter(e => e !== email);
            } else {
                return [...prev, email];
            }
        });
    };

    const handleExpenseCreation=()=>{
        const length=Number(selectedEmails.length)
        const oweAmount=Number(amount/length)
        let updatedOwe={...owe}
        for(const email of selectedEmails){
            updatedOwe[email]=Number(oweAmount)
        }
        setOwe(updatedOwe)
        mutation.mutate({
            description: description,
            amount: amount,
            currency: currency,
            groupId: groupId,
            payments: payments,
            owe: updatedOwe
        })
    }

    if(proceed){
        return (
            <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-xl">

                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-gray-600 font-medium text-base">
                        Splitting <span className="text-gray-900 font-bold text-xl ml-1">{amount}</span> equally among:
                    </h3>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-lg flex items-center gap-2 animate-fade-in">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        {error}
                    </div>
                )}

                {/* Scrollable Content Area */}
                <div className="max-h-[350px] overflow-y-auto px-6 py-4 custom-scrollbar flex flex-col">

                    {/* Selection Toolbar */}
                    {groupMembers.length > 0 && (
                        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm pb-2 mb-2 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {selectedEmails.length} / {groupMembers.length} Selected
                </span>
                            <button
                                onClick={() => {
                                    setError(''); // Clear errors
                                    if (selectedEmails.length === groupMembers.length) {
                                        setSelectedEmails([]); // Deselect All
                                    } else {
                                        setSelectedEmails(groupMembers.map(m => m.email)); // Select All
                                    }
                                }}
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                {selectedEmails.length === groupMembers.length ? "Deselect All" : "Select All"}
                            </button>
                        </div>
                    )}

                    {/* Member List */}
                    {groupMembers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            <p className="text-sm">No group members found</p>
                        </div>
                    ) : (
                        <div className="space-y-3 pt-1">
                            {groupMembers.map((member) => {
                                const isSelected = selectedEmails.includes(member.email);
                                return (
                                    <label
                                        key={member.email}
                                        htmlFor={`friend-${member.email}`}
                                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-all duration-200 group ${
                                            isSelected
                                                ? 'bg-blue-50 border-blue-200 shadow-sm'
                                                : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                        }`}
                                        onClick={() => setError('')}
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`friend-${member.email}`}
                                                checked={isSelected}
                                                onChange={() => handleToggleMember(member.email)}
                                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-blue-500 checked:bg-blue-500 hover:border-blue-400"
                                            />
                                            <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>

                                        <div className="flex flex-col">
                                <span className={`font-semibold transition-colors ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>
                                    {member.firstName}
                                </span>
                                            <span className="text-xs text-gray-400 font-medium">
                                    {member.email}
                                </span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 flex gap-3">
                    <button
                        onClick={() => {
                            setError('');
                            setProceed(false);
                        }}
                        className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-sm focus:ring-2 focus:ring-gray-200 transition-all"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => {
                            setError('');
                            if (selectedEmails.length === 0) {
                                setError('Please select at least one member.');
                                return;
                            }
                            handleExpenseCreation();
                        }}
                        className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all focus:ring-4 focus:ring-blue-100"
                    >
                        Create Expense
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            {/* Modal Container */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Add Expense</h3>
                    <button
                        onClick={() => setShowCreateExpense(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="e.g. Dinner"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Currency (3 chars) <span className="text-red-500">*</span></label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase"
                            placeholder="e.g. USD"
                            maxLength={3}
                            value={currency}
                            onChange={(event) => setCurrency(event.target.value)}
                        />
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Who paid?</h3>
                        <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {groupMembers.map((member) => (
                                <div key={member.email} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                                    <h5 className="text-sm text-gray-700 font-medium truncate w-1/2" title={member.email}>
                                        {member.email}
                                    </h5>
                                    <input
                                        className="w-24 px-3 py-1 text-right border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                        type="number"
                                        step="any"
                                        placeholder="0.00"
                                        value={payments[member.email] || ''}
                                        onChange={(e) => handleInput(e, member.email)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    {/* Error Banner - Shows only when error exists */}
                    {error && (
                        <div className="mb-3 px-4 py-2 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-lg text-center shadow-sm transition-all animate-pulse">
                            ⚠️ {error}
                        </div>
                    )}
                    {/* Proceed Button */}
                    <button
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        onClick={() => {
                            // Reset error first
                            setError('');

                            // 1. Check Description
                            if (!description?.trim()) {
                                setError("Description is required.");
                                return;
                            }

                            // 2. Check Currency
                            if (!currency?.trim() || currency.trim().length !== 3) {
                                setError("Currency must be exactly 3 characters (e.g. USD).");
                                return;
                            }

                            // 3. Success
                            setProceed(true);
                        }}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateGroupExpenseModal