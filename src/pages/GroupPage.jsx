import {useQuery} from "@tanstack/react-query";
import {getGroups} from "../services/groupService.js";
import {Link} from "react-router-dom";

const GroupPage=()=>{
    const result=useQuery({
        queryKey:['groups'],
        queryFn:getGroups,
    });
    if(result.isLoading){
        return (
            <div>Fetching data...</div>
        )
    }
    const groups=result.data.data;
    return (
        <div>
            {groups.map((group)=>
            <div key={group.groupId}>
                <Link
                    to={`/groups/${group.groupId}`}
                    state={{group}}
                >
                    <h1>{group.groupName}</h1>
                </Link>
                <h5>{group.createdAt}</h5>
            </div>
            )}
        </div>
    )
}
export default GroupPage