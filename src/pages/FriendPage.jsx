import {useQuery} from "@tanstack/react-query";
import userService from "../services/userService.js";
import Friends from "../components/Friends.jsx";
import AddFriendModal from "../components/AddFriendModal.jsx";
import {useState} from "react";
import Toggleable from "../components/Toggleable.jsx";

const FriendPage=()=>{

    const [showAddFriend,setShowAddFriend]=useState(false);

    const result= useQuery({
        queryKey:['friends'],
        queryFn:userService.getFriends
    })

    if(result.isLoading){
        return (
            <>
                <h1>Fetching friends...</h1>
            </>
        )
    }

    const friends= result.data;

    return(
        <div>
        <div>
            <div>
                {friends.map((friend,i)=>
                    <div key={i} className={"mb-3"}>
                        <Friends friend={friend}/>
                        <br/>
                    </div>
                )}
            </div>
            <button onClick={()=>setShowAddFriend(true)}>Add Friend</button>
        </div>
        <Toggleable state={showAddFriend}>
            <AddFriendModal setShowAddFriend={setShowAddFriend}/>
        </Toggleable>
        </div>
    )
}
export default FriendPage