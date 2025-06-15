// import groceryDict from "~/components/groceryList";
import "../grocerylist.css";
import osherAdItemDict from "~/components/groceryList";



export function Listpreview({currentList, setCurrentList, totalCost, setTotalCost, addProduct}) {


    const deleteProduct = (product) => {
        setCurrentList((prevList) => {
            const updatedList = { ...prevList };
            const productTotal = currentList[product][1];
            delete updatedList[product];
            setTotalCost(prevTotal => Math.max(0, prevTotal - productTotal));
            return updatedList;
        });
    };


    const reduceAmount = (product) => {
        if (currentList[product][0] === 1) {
            deleteProduct(product);
        } else if (currentList[product][0] >= 1) {
            const price = osherAdItemDict[product]?.itemprice;
            if (!price) return;
            
            setCurrentList((prevList) => {
                const [prevAmount = 0] = prevList[product] || [0, 0];
                const newAmount = prevAmount - 1;
                const newTotal = newAmount * price;
                return { ...prevList, [product]: [newAmount, newTotal] };
            });
            setTotalCost(prevTotal => Math.max(0, prevTotal - price));
        }
    };

    return (
        <div className="table-container">
            <table className="dictionary-table">
                <thead>
                    <tr>
                        <th> Product</th>
                        <th> Market Brand</th>
                        <th> Amount</th>
                        <th> Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(currentList).map(([product,[amount, total]]) => (
                        <tr key={product}>
                            <td>{product}</td>
                            <td>
                                <img
                                     src={'app/images/OsherAd Image.png'} 
                                     alt={product}
                                     className="table-product-image"
                                     onError={(e) => {
                                         e.target.src = 'app/images/OsherAd Image.png';
                                     }}
                                />
                            </td>
                            <td>{amount}</td>
                            <td>₪ {total}</td>
                            <td><button className="table-button" onClick={() => addProduct(product)}> ➕</button></td>
                            <td><button className="table-button" onClick={() => reduceAmount(product)}> ➖</button></td>
                            <td><button className="table-button" onClick={() => deleteProduct(product)}> 🗑️</button></td>
                        </tr>
                    ))}
                    <tr className="total-row">
                    <td className="total-label" colSpan="2">Total Cost:</td>
                    <td>₪ {totalCost}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}