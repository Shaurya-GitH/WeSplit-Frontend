import Expenses from "./Expenses.jsx";
import Payments from "./Payments.jsx";

const TransactionList=({sortedList})=>{
    return (
        <div className="space-y-3">
            {sortedList.map((entity) => (
                <div key={entity.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    {entity.type === "expense" ?
                        <Expenses unsettled={entity.data} /> :
                        <Payments payment={entity.data} />
                    }
                </div>
            ))}
        </div>
    )
}
export default TransactionList