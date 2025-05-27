import {useSelector} from "react-redux";

const ProfilePage=()=>{
    const username= useSelector(state => state.user);
    return(
        <>
            <h1>Hello {username}</h1>
        </>
    )

}
export default ProfilePage