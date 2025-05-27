const SoloFriendPage=({balance,unsettled,email})=>{
    return(
        <div>
            {email} <br/> {balance.oneOweTwo===0?`${balance.user2.firstName} owes ${balance.twoOweOne}`:balance.oneOweTwo}
            <div>
                {unsettled.map((expense)=>
                    <div key={expense.expenseId}>
                        <h5>{expense.description}</h5>
                        <h6>{expense.amount}</h6>
                    </div>
                )}
            </div>
        </div>
    )
}
export default SoloFriendPage