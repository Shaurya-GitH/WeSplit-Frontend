const PasswordRequirements=({showRequirements,validatePassword})=>{
    return (
        <div>
            {showRequirements?
                <ul>
                    <li className={validatePassword.oneDigit?"text-success":"text-danger"}>One digit</li>
                    <li className={validatePassword.oneLetter?"text-success":"text-danger"}>One letter</li>
                    <li className={validatePassword.oneSpecial?"text-success":"text-danger"}>One special character</li>
                    <li className={validatePassword.minimumEight?"text-success":"text-danger"}>Minimum 8 characters</li>
                </ul>:<></>
            }
        </div>
    )
}
export default PasswordRequirements