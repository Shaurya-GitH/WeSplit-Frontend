import {useState} from "react";
import userService from "../services/userService.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const AddFriendModal=({setShowAddFriend})=>{
    const queryClient=useQueryClient();
    const mutation=useMutation({
        mutationFn:userService.addFriend,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['friends']})
            clearStates();
        },
        onError:(error)=>{
            console.log(error.response.data.exception)
        }
    })
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:""
    })
    const handleInput=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const clearStates=()=>{
        setFormData({
            firstName:"",
            lastName:"",
            email:""
        })
    }
    const handleAddFriend=async ()=>{
        const payload={
            "firstName":formData.firstName,
            "lastName":formData.lastName,
            "email":formData.email,
        }
        mutation.mutate(payload);
    }
    return (
        <div>
            <form>
                first name: <input type="text" name="firstName" value={formData.firstName} onInput={handleInput}/><br/>
                last name: <input type="text" name="lastName" value={formData.lastName} onInput={handleInput}/><br/>
                email: <input type="email" name="email" value={formData.email} onInput={handleInput}/> <br/>
                <input type="button" value="Add SoloFriend" onClick={handleAddFriend} disabled={formData.firstName==="" || formData.lastName==="" || formData.email===""}/> &nbsp;
                <input type="button" value="X" onClick={()=>setShowAddFriend(false)}/>
            </form>
        </div>
    )
}
export default AddFriendModal