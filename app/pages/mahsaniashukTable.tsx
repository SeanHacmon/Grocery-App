import "../design/grocerylist.css";
import { mahsaniAshukDict } from "../components/groceryList"; // Add this import
import mahsaniImage from "../../images/mahsaniashuk.jpg";
export function MahsaniAshukTable({
    currentListOsher, 
    setCurrentListOsher, 
    currentListRami, 
    setCurrentListRami,
    currentListMahsani,
    setCurrentListMahsani,
    totalCostOsher, 
    setTotalCostOsher,
    totalCostRami,
    setTotalCostRami,
    totalCostMahsani,
    setTotalCostMahsani,
    addProductToOsher,
    addProductToRami,
    addProductToMahsani
}){
   
    const clearAllProductsMahsani = () => {
        setCurrentListMahsani({});
        setTotalCostMahsani(0);
    };

    const deleteProductMahsani = (product) => {
        setCurrentListMahsani((prevList) => {
            const updatedList = { ...prevList };
            const productTotal = currentListMahsani[product][1];
            delete updatedList[product];
            setTotalCostMahsani(prevTotal => Math.max(0, prevTotal - productTotal));
            return updatedList;
        });
    };
    
    const reduceAmountMahsani = (product) => {
        if (currentListMahsani[product][0] === 1) {
            deleteProductMahsani(product);
        } else if (currentListMahsani[product][0] >= 1) {
            const price = mahsaniAshukDict[product]?.itemprice;
            if (!price) return;
            
            setCurrentListMahsani((prevList) => {
                const [prevAmount = 0] = prevList[product] || [0, 0];
                const newAmount = prevAmount - 1;
                const newTotal = newAmount * price;
                return { ...prevList, [product]: [newAmount, newTotal] };
            });
            setTotalCostMahsani(prevTotal => Math.max(0, prevTotal - price));
        }
    };

    return (
        <div className="table-container"> 
            <div className="table-column">
                <img
                    src={mahsaniImage}
                    className="table-product-image"
                    onError={(e) => {
                        e.target.src = mahsaniImage;
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
                        {Object.entries(currentListMahsani).map(([product, [amount, total]]) => (
                            <tr key={product}>
                                <td>{product}</td>
                                <td>{amount}</td>
                                <td>₪ {total.toFixed(2)}</td>
                                <td><button className="table-button" onClick={() => addProductToMahsani(product)}> ➕</button></td>
                                <td><button className="table-button" onClick={() => reduceAmountMahsani(product)}> ➖</button></td>
                                <td><button className="table-button" onClick={() => deleteProductMahsani(product)}> ❌</button></td>
                            </tr>
                        ))}
                        <tr className="total-row">
                            <td className="total-label" colSpan="2">Total Cost:</td>
                            <td>₪ {totalCostMahsani.toFixed(2)}</td>
                            <td colSpan="3"><button className="table-button" onClick={() => clearAllProductsMahsani()}> Clear 🗑️</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}