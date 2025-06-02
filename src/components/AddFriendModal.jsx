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
            setShowAddFriend(false);
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
        <div className="p-6 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Add Friend</h2>
                <button
                    onClick={() => setShowAddFriend(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onInput={handleInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onInput={handleInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onInput={handleInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                        type="button"
                        onClick={handleAddFriend}
                        disabled={formData.firstName === "" || formData.lastName === "" || formData.email === ""}
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Add Friend
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowAddFriend(false)}
                        className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 hover:cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>

    )
}
export default AddFriendModal