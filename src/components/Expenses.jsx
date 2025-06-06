import {useState} from "react";

const Expenses=({unsettled})=> {
    const [showSplit, setShowSplit] = useState(false);
    const handleExpand = () => {
        setShowSplit(!showSplit);
    }
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h5 className="font-medium text-gray-900">{unsettled.description}</h5>
                    <h5 className="text-sm text-gray-600">Added on {unsettled.createdAt}</h5>

                    <h6 className="text-lg font-semibold text-green-600">{unsettled.currency} {unsettled.amount}</h6>
                </div>
                <button
                    onClick={handleExpand}
                    className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                >
                    ✚
                </button>
            </div>

            {/* Expanded Details */}
            {showSplit && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                    {unsettled.splitList.map((split) => (
                        <div key={split.expenseSplitId} className="bg-gray-50 rounded p-3 space-y-1">
                            <h5 className="text-sm font-medium text-gray-900">
                                {split.user.firstName} paid {unsettled.currency} {split.paid}
                            </h5>
                            <h5 className="text-sm text-gray-700">
                                {split.user.firstName} owed {unsettled.currency} {split.owed}
                            </h5>
                        </div>
                    ))}
                </div>
            )}
        </div>


    )
}
export default Expenses