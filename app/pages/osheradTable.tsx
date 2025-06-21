import "../design/grocerylist.css";
import { osherAdDict } from "../components/groceryList"; // Add this import

export function OsherAdTable({
    currentListOsher, 
    setCurrentListOsher, 
    currentListRami, 
    setCurrentListRami,
    totalCostOsher, 
    setTotalCostOsher,
    totalCostRami,
    setTotalCostRami,
    addProductToOsher,
    addProductToRami
}) {
    const clearAllProductsOsher = () => {
        setCurrentListOsher({});
        setTotalCostOsher(0);
    };

    const deleteProductOsher = (product) => {
        setCurrentListOsher((prevList) => {
            const updatedList = { ...prevList };
            const productTotal = currentListOsher[product][1];
            delete updatedList[product];
            setTotalCostOsher(prevTotal => Math.max(0, prevTotal - productTotal));
            return updatedList;
        });
    };
    
    const reduceAmountOsher = (product) => {
        if (currentListOsher[product][0] === 1) {
            deleteProductOsher(product);
        } else if (currentListOsher[product][0] >= 1) {
            const price = osherAdDict[product]?.itemprice;
            if (!price) return;
            
            setCurrentListOsher((prevList) => {
                const [prevAmount = 0] = prevList[product] || [0, 0];
                const newAmount = prevAmount - 1;
                const newTotal = newAmount * price;
                return { ...prevList, [product]: [newAmount, newTotal] };
            });
            setTotalCostOsher(prevTotal => Math.max(0, prevTotal - price));
        }
    };

    return (
        <div className="table-container"> {/* Changed from span to div */}
            <div className="table-column">
                <img
                    src={'/images/OsherAd-image.png'}
                    className="table-product-image"
                    onError={(e) => {
                        e.target.src = '/images/OsherAd-image.png';
                    }}
                />
                <table className="dictionary-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Cost</th>
                            <th colSpan="3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(currentListOsher).map(([product, [amount, total]]) => (
                            <tr key={product}>
                                <td>{product}</td>
                                <td>{amount}</td>
                                <td>₪ {total.toFixed(2)}</td>
                                <td><button className="table-button" onClick={() => addProductToOsher(product)}> ➕</button></td>
                                <td><button className="table-button" onClick={() => reduceAmountOsher(product)}> ➖</button></td>
                                <td><button className="table-button" onClick={() => deleteProductOsher(product)}> ❌</button></td>
                            </tr>
                        ))}
                        <tr className="total-row">
                            <td className="total-label" colSpan="2">Total Cost:</td>
                            <td>₪ {totalCostOsher.toFixed(2)}</td>
                            <td colSpan="3"><button className="table-button" onClick={() => clearAllProductsOsher()}> Clear 🗑️ </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}