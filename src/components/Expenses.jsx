import {useState} from "react";

const Expenses=({unsettled})=> {
    const [showSplit, setShowSplit] = useState(false);
    const handleExpand = () => {
        setShowSplit(!showSplit);
    }
    return (
        <div>
            <h5>{unsettled.description}</h5>
            <h6>{unsettled.amount}</h6>
            <button onClick={handleExpand}>✚</button>
            {showSplit ?
                <div>
                    <h5>Added on {unsettled.createdAt}</h5>
                    {unsettled.splitList.map((split) =>
                        <div key={split.expenseSplitId}>
                            <h5>{split.user.firstName} paid {split.paid}</h5>
                            <h5>{split.user.firstName} owed {split.owed}</h5>
                        </div>
                    )}
                </div> : <></>}
        </div>
    )
}
export default Expenses