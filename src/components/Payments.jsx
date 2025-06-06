const Payments=({payment})=>{
    return(
        <div>

                   <div>
                       {payment.paidBy.firstName} paid {payment.paidTo.firstName} {payment.currency} {payment.amountPaid}
                   </div>

        </div>
    )
}
export default Payments