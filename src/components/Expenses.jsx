const Expenses=({unsettled})=>{
    return(
            <div>
                {unsettled.map((expense)=>
                    <div key={expense.expenseId}>
                        <h5>{expense.description}</h5>
                        <h6>{expense.amount}</h6>
                    </div>
                )}
            </div>
    )
}
export default Expenses