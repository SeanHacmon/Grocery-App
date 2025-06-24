// app/components/GenericStoreTable.tsx
import "../design/grocerylist.css";
import { useShoppingContext } from "../contexts/ShoppingContext";

interface StoreConfig {
  name: 'osher' | 'rami' | 'mahsani';
  displayName: string;
  image: string;
}

interface GenericStoreTableProps {
  storeConfig: StoreConfig;
}

export function GenericStoreTable({ storeConfig }: GenericStoreTableProps) {
  const {
    currentListOsher,
    currentListRami,
    currentListMahsani,
    totalCostOsher,
    totalCostRami,
    totalCostMahsani,
    addProductToStore,
    reduceProductAmount,
    deleteProduct,
    clearAllProducts
  } = useShoppingContext();

  // Get the current list and total for this store
  const currentLists = {
    osher: currentListOsher,
    rami: currentListRami,
    mahsani: currentListMahsani
  };

  const totals = {
    osher: totalCostOsher,
    rami: totalCostRami,
    mahsani: totalCostMahsani
  };

  const currentList = currentLists[storeConfig.name];
  const totalCost = totals[storeConfig.name];

  const handleAddProduct = (product: string) => {
    addProductToStore(product, storeConfig.name);
  };

  const handleReduceAmount = (product: string) => {
    reduceProductAmount(product, storeConfig.name);
  };

  const handleDeleteProduct = (product: string) => {
    deleteProduct(product, storeConfig.name);
  };

  const handleClearAll = () => {
    clearAllProducts(storeConfig.name);
  };

  return (
    <div className="table-container">
      <div className="table-column">
        <img
          src={storeConfig.image}
          alt={storeConfig.displayName}
          className="table-product-image"
          onError={(e) => {
            e.currentTarget.src = storeConfig.image;
          }}
        />
        <table className="dictionary-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Amount</th>
              <th>Cost</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(currentList).map(([product, [amount, total]]) => (
              <tr key={product}>
                <td>{product}</td>
                <td>{amount}</td>
                <td>₪ {total.toFixed(2)}</td>
                <td>
                  <button 
                    className="table-button" 
                    onClick={() => handleAddProduct(product)}
                  >
                    ➕
                  </button>
                </td>
                <td>
                  <button 
                    className="table-button" 
                    onClick={() => handleReduceAmount(product)}
                  >
                    ➖
                  </button>
                </td>
                <td>
                  <button 
                    className="table-button" 
                    onClick={() => handleDeleteProduct(product)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
            <tr className="total-row">
              <td className="total-label" colSpan={2}>Total Cost:</td>
              <td>₪ {totalCost.toFixed(2)}</td>
              <td colSpan={3}>
                <button 
                  className="table-button" 
                  onClick={handleClearAll}
                >
                  Clear 🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}