import {Link} from "react-router-dom";

const Friends=({friend})=>{
    return (
        <div className="card-body text-center">
            <Link to={`/friend/${friend.email}`}>
                <h5 className="card-title ">{friend.firstName} {friend.lastName}</h5>
            </Link>
            <p className="card-text text-muted">
                <i className="bi bi-envelope me-2"></i>
                {friend.email}
            </p>
        </div>
    )
}
export default Friends