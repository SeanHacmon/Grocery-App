import "../design/grocerylist.css";
import { ramiLevyDict } from "../components/groceryList"; // Add this import
import ramiLevyImage from "../../images/ramilevy.jpg";

export function RamiLevyTable({
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
}){
   
    const clearAllProductsRami = () => {
        setCurrentListRami({});
        setTotalCostRami(0);
    };

    const deleteProductRami = (product) => {
        setCurrentListRami((prevList) => {
            const updatedList = { ...prevList };
            const productTotal = currentListRami[product][1];
            delete updatedList[product];
            setTotalCostRami(prevTotal => Math.max(0, prevTotal - productTotal));
            return updatedList;
        });
    };
    
    const reduceAmountRami = (product) => {
        if (currentListRami[product][0] === 1) {
            deleteProductRami(product);
        } else if (currentListRami[product][0] >= 1) {
            const price = ramiLevyDict[product]?.itemprice;
            if (!price) return;
            
            setCurrentListRami((prevList) => {
                const [prevAmount = 0] = prevList[product] || [0, 0];
                const newAmount = prevAmount - 1;
                const newTotal = newAmount * price;
                return { ...prevList, [product]: [newAmount, newTotal] };
            });
            setTotalCostRami(prevTotal => Math.max(0, prevTotal - price));
        }
    };

    return (
        <div className="table-container"> 
            <div className="table-column">
                <img
                    src={ramiLevyImage}
                    className="table-product-image"
                    onError={(e) => {
                        e.target.src = './images/ramilevy.jpg';
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
                        {Object.entries(currentListRami).map(([product, [amount, total]]) => (
                            <tr key={product}>
                                <td>{product}</td>
                                <td>{amount}</td>
                                <td>₪ {total.toFixed(2)}</td>
                                <td><button className="table-button" onClick={() => addProductToRami(product)}> ➕</button></td>
                                <td><button className="table-button" onClick={() => reduceAmountRami(product)}> ➖</button></td>
                                <td><button className="table-button" onClick={() => deleteProductRami(product)}> ❌</button></td>
                            </tr>
                        ))}
                        <tr className="total-row">
                            <td className="total-label" colSpan="2">Total Cost:</td>
                            <td>₪ {totalCostRami.toFixed(2)}</td>
                            {/* <td colSpan="3"></td> */}
                            <td colSpan="3"><button className="table-button" onClick={() => clearAllProductsRami()}> Clear 🗑️</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}