import {useSelector} from "react-redux";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import HomeBar from "./components/HomeBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NavBar from "./components/NavBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UnprotectedRoute from "./components/UnprotectedRoute.jsx";
import FriendPage from "./pages/FriendPage.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SoloFriend from "./pages/SoloFriend.jsx";
import GroupPage from "./pages/GroupPage.jsx";
import SoloGroupPage from "./pages/SoloGroupPage.jsx";
import ServerDownPage from "./pages/ServerDownPage.jsx";

const App=()=>{
    const user= useSelector(state => state.user);
    const health= useSelector(state=>state.health);
    const queryClient=new QueryClient();

    if(health===false){
        return(
            <ServerDownPage/>
        )
    }
    return(
        <QueryClientProvider client={queryClient}>
            <div>
                <Router>
                    {user?<NavBar/>:<HomeBar/>}
                    <Routes>
                        <Route path="/" element={<UnprotectedRoute><HomePage/></UnprotectedRoute>}/>
                        <Route path="/login" element={<UnprotectedRoute><LoginPage/></UnprotectedRoute>}/>
                        <Route path="/register" element={<UnprotectedRoute><RegisterPage/></UnprotectedRoute>}/>
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                        <Route path="/friends" element={<ProtectedRoute><FriendPage/></ProtectedRoute>}/>
                        <Route path="/friend/:email" element={<ProtectedRoute><SoloFriend/></ProtectedRoute>}/>
                        <Route path="/groups" element={<ProtectedRoute><GroupPage/></ProtectedRoute>}/>
                        <Route path="/groups/:id" element={<ProtectedRoute><SoloGroupPage/></ProtectedRoute>}/>
                    </Routes>
                </Router>
            </div>
        </QueryClientProvider>

    )
}
export default App