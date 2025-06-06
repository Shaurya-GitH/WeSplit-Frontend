import {useDispatch} from "react-redux";
import {login} from "../reducers/userReducer.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Toggleable from "../components/Toggleable.jsx";
import publicService from "../services/publicService.js";

const LoginPage=()=>{
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [incorrect,setIncorrect]= useState(false);
    const [message,setMessage]=useState("");

    const handleLogin=async (event)=>{
        event.preventDefault();
        const username=event.target.username.value;
        const result=await publicService.loginToServer(username,event.target.password.value);
        if(result && result.status===200){
            setIncorrect(false)
            dispatch(login(username));
            navigate("/profile")
        }
        else if(result && result.status===403){
            setIncorrect(true);
            setMessage("Incorrect username or password");
            navigate("/login");
        }
        else{
            setIncorrect(true);
            setMessage(result.data.exception);
            navigate("/login")
        }
    }

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
                    <p className="mt-2 text-sm text-gray-600">Welcome back to WeSplit</p>
                </div>

                {/* Error Message */}
                <Toggleable state={incorrect}>
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        <h3 className="text-sm font-medium">{message}</h3>
                    </div>
                </Toggleable>

                {/* Form */}
                <div className="bg-white py-8 px-6 shadow rounded-lg">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="text"
                                name="username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Sign in
                        </button>
                    </form>
                </div>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:text-blue-500">
                        Create one here
                    </a>
                </p>
            </div>
        </div>

    )
}
export default LoginPage