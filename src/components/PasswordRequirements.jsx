const PasswordRequirements=({showRequirements,validatePassword})=>{
    return (
        <div>
            {showRequirements ? (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
                    <ul className="space-y-1">
                        <li className={`text-sm flex items-center ${validatePassword.oneDigit ? "text-green-600" : "text-red-600"}`}>
                    <span className="mr-2">
                        {validatePassword.oneDigit ? "✓" : "✗"}
                    </span>
                            One digit
                        </li>
                        <li className={`text-sm flex items-center ${validatePassword.oneLetter ? "text-green-600" : "text-red-600"}`}>
                    <span className="mr-2">
                        {validatePassword.oneLetter ? "✓" : "✗"}
                    </span>
                            One letter
                        </li>
                        <li className={`text-sm flex items-center ${validatePassword.oneSpecial ? "text-green-600" : "text-red-600"}`}>
                    <span className="mr-2">
                        {validatePassword.oneSpecial ? "✓" : "✗"}
                    </span>
                            One special character
                        </li>
                        <li className={`text-sm flex items-center ${validatePassword.minimumEight ? "text-green-600" : "text-red-600"}`}>
                    <span className="mr-2">
                        {validatePassword.minimumEight ? "✓" : "✗"}
                    </span>
                            Minimum 8 characters
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>

    )
}
export default PasswordRequirements