import groceryDict from "~/components/groceryList";
import "../grocerylist.css";




export function Listpreview({currentList, setCurrentList, totalCost, setTotalCost, addProduct}) {


    const deleteProduct = (product) => {
        setCurrentList((prevList) => {
            const updatedList = { ...prevList };
            delete updatedList[product];
            setTotalCost(totalCost-currentList[product][1] > 0 ? totalCost-currentList[product][1] : 0 );
            return updatedList;
        });
    };


    const reduceAmount = (product) => {
        if (currentList[product][0] == 1){deleteProduct(product);}
        else if (currentList[product][0] >= 1){
            const price = groceryDict[product];
            setCurrentList((prevList) => {
                const [prevAmount=0, prevTotal=0] = prevList[product] || [0,0];
                const newAmount = prevAmount-1;
                const newTotal = newAmount * price;
                return { ... prevList, [product]:[newAmount, newTotal]};
            });
            setTotalCost(totalCost-groceryDict[product] > 0 ? totalCost-groceryDict[product]: 0);
        };
    };

    return (
        <div className="table-container">
            <table className="dictionary-table">
                <thead>
                    <tr>
                        <th> Product</th>
                        <th> Amount</th>
                        <th> Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(currentList).map(([product,[amount, total]]) => (
                        <tr key={product}>
                            <td>{product}</td>
                            <td>{amount}</td>
                            <td>{total}</td>
                            <td><button className="table-button" onClick={() => addProduct(product)}> ➕</button></td>
                            <td><button className="table-button" onClick={() => reduceAmount(product)}> ➖</button></td>
                            <td><button className="table-button" onClick={() => deleteProduct(product)}> 🗑️</button></td>
                        </tr>
                    ))}
                    <tr className="total-row">
                    <td className="total-label" colSpan="2">Total Cost:</td>
                    <td>₪{totalCost}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}