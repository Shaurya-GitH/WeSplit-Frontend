import {useState} from "react";
import PasswordRequirements from "../components/PasswordRequirements.jsx";
import publicService from "../services/publicService.js";
import {useNavigate} from "react-router-dom";
import Toggleable from "../components/Toggleable.jsx";

const RegisterPage=()=>{
    const navigate=useNavigate();

    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

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
        <div>
            <h1>Register</h1>
            <Toggleable state={showError}>
               <span className={"text-danger"}>
                   {errorMessage}
               </span>
            </Toggleable>
            <form>
                FirstName:<input name="firstName" value={formData.firstName} type="text" onInput={handleInput}/><br/>
                LastName:<input name="lastName" value={formData.lastName} type="text" onInput={handleInput}/><br/>
                Email:<input name="email" value={formData.email} type="email" onInput={handleInput}/><br/>
                Password:<input name="password" value={formData.password} type="password" onInput={handleInput} onFocus={()=>setShowRequirements(true)} onBlur={()=>setShowRequirements(false)}/><br/>
                <PasswordRequirements showRequirements={showRequirements} validatePassword={validatePassword}/>
                <input onMouseDown={handleRegister} type="submit" value="Register" disabled={!validatePassword.oneSpecial || !validatePassword.oneLetter || !validatePassword.oneDigit || !validatePassword.minimumEight || formData.email==="" || formData.firstName==="" || formData.lastName===""}/>
            </form>
        </div>
    )
}
export default RegisterPage