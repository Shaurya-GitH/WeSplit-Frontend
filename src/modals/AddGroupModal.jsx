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
        <div>
            <form>
                <label>Group Name</label><br/>
                <input type="text" value={groupName} onInput={(e)=>setGroupName(e.target.value)}/>
                <input type="submit" onClick={handleSubmit}/>
            </form>
        </div>
    )
}
export default AddGroupModal