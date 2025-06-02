import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createPayment} from "../services/paymentService.js";

const CreatePaymentModal=({balance,setShowCreatePayment})=>{
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
        mutation.mutate(formData);
        console.log("submitted");
    }
    return (
        <div>
            {formData.email1} paid {formData.email2}
            <button onClick={handleSwitch}>switch</button>
            <form onSubmit={handleSubmit}>
                <input type="text" name="currency" placeholder="INR" value={formData.currency}
                       onInput={(e) => handleInput(e.target)}/>
                <input type="number" name="amountPaid" value={formData.amountPaid}
                       onInput={(e) => handleInput(e.target)}/>
                <input type="submit" value="Pay" disabled={formData.currency==="" || formData.amountPaid<=0 || formData.email1===formData.email2 || formData.email1===""}/>
            </form>
        </div>
    )
}
export default CreatePaymentModal