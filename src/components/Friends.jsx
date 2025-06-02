import {Link} from "react-router-dom";

const Friends=({friend})=>{
    return (
        <div>
            <Link to={`/friend/${friend.email}`}>
                <h5 className={"text-blue-600 font-bold text-xl"}>{friend.firstName} {friend.lastName}</h5>
            </Link>
            <p>
                <i></i>
                {friend.email}
            </p>
        </div>
    )
}
export default Friends