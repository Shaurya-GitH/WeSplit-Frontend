import {useState} from "react";
import PasswordRequirements from "../components/PasswordRequirements.jsx";
import publicService from "../services/publicService.js";
import {useNavigate} from "react-router-dom";
import Toggleable from "../components/Toggleable.jsx";

const RegisterPage=()=>{
    const navigate=useNavigate();

    const specialChar = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    const [formData,setFormData]= useState({
        firstName:"",
        lastName:"",
        password:"",
        email:"",
    });
    const [showRequirements,setShowRequirements]=useState(false)
    const [validatePassword,setValidatePassword]=useState({
        oneDigit:false,
        oneLetter:false,
        oneSpecial:false,
        minimumEight:false,
    })
    const [showError,setShowError]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");

    const checkPassword=(password)=>{
        const hasDigit= /\d/.test(password);
        const hasLetter=/[a-zA-Z]/.test(password);
        const isMinimumEight= password.length>=8;
        const hasSpecial=specialChar.test(password);
        setValidatePassword({
            oneDigit: hasDigit,
            oneLetter: hasLetter,
            oneSpecial: hasSpecial,
            minimumEight: isMinimumEight,
        })
    }

    const handleInput=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        })
        if(name==="password"){
            checkPassword(value);
        }
    }

    const handleRegister=async (e)=>{
        e.preventDefault();
        const result=await publicService.registerUser(formData);
        if(result && result.status===201){
            setShowError(false);
            navigate("/login");
        }
        else{
            setErrorMessage(result.data.exception);
            setShowError(true);
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600 text-sm md:text-base">Join WeSplit and start splitting bills effortlessly</p>
                </div>

                {/* Error Message */}
                <Toggleable state={showError}>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-red-800 text-sm font-medium">{errorMessage}</span>
                        </div>
                    </div>
                </Toggleable>

                {/* Registration Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
                    <form className="space-y-6">
                        {/* Name Fields Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    type="text"
                                    onInput={handleInput}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter first name"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    type="text"
                                    onInput={handleInput}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter last name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                value={formData.email}
                                type="email"
                                onInput={handleInput}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                value={formData.password}
                                type="password"
                                onInput={handleInput}
                                onFocus={() => setShowRequirements(true)}
                                onBlur={() => setShowRequirements(false)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                placeholder="Create a strong password"
                            />
                        </div>

                        {/* Password Requirements */}
                        <PasswordRequirements
                            showRequirements={showRequirements}
                            validatePassword={validatePassword}
                        />

                        {/* Submit Button */}
                        <button
                            onClick={handleRegister}
                            disabled={
                                !validatePassword.oneSpecial ||
                                !validatePassword.oneLetter ||
                                !validatePassword.oneDigit ||
                                !validatePassword.minimumEight ||
                                formData.email === "" ||
                                formData.firstName === "" ||
                                formData.lastName === ""
                            }
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                                (!validatePassword.oneSpecial ||
                                    !validatePassword.oneLetter ||
                                    !validatePassword.oneDigit ||
                                    !validatePassword.minimumEight ||
                                    formData.email === "" ||
                                    formData.firstName === "" ||
                                    formData.lastName === "")
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                            }`}
                        >
                            Create Account
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    )
}
export default RegisterPage