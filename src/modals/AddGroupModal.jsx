import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createGroup} from "../services/groupService.js";

const AddGroupModal=({setShowAddGroup})=>{
    const queryClient=useQueryClient();
    const [groupName,setGroupName]=useState(null);
    const mutation=useMutation({
        mutationFn:createGroup,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['groups']});
            setShowAddGroup(false);
        }
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        mutation.mutate(groupName);
    }
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Add New Group</h2>
                <button
                    onClick={() => setShowAddGroup(false)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Name
                    </label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter group name"
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-2 px-4 disabled:pointer-events-none disabled:bg-gray-400 enabled:bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    disabled={groupName==="" || groupName===null}
                >
                    Create Group
                </button>
            </form>
        </div>


    )
}
export default AddGroupModal