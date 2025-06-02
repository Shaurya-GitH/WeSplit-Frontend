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
        <div>
            <form onSubmit={handleSubmit}>
                Description: <input name="description" type="text" value={formData.description} onInput={(e)=>handleInput(e.target)}/><br/>
                Amount:<input name="currency" type="text" value={formData.currency} onInput={(e)=>handleInput(e.target)}/>
                <input name="amount" type="number" value={formData.amount} onInput={(e)=>handleInput(e.target)}/><br/>
                Expense type: <select onChange={handleSelect}>
                <option value="SPLIT_EQUALLY_PAIDBY_USER1">Split equally and paid by {email1} </option>
                <option value="SPLIT_EQUALLY_PAIDBY_USER2">Split equally and paid by {email2} </option>
                <option value="OWED_USER1">{email1} owes all</option>
                <option value="OWED_USER2">{email2} owes all </option>
            </select>
                <input type="submit" value="Add" disabled={formData.description==="" || formData.currency==="" || formData.currency.length!==3 || formData.amount<=0 || formData.amount===null || formData.expenseType===""}/>
            </form>
        </div>
    )
}
export default CreateSoloExpenseModal