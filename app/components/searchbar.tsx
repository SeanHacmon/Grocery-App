
import { useState } from "react";
import { Listpreview } from "~/pages/listpreview";
import '../searchbar.css';
import groceryDict from "./groceryList";
import '../button.css';


export function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showList, setShowList] = useState(false);
    const [currentList, setCurrentList] = useState({});
    const [totalCost, setTotalCost] = useState(0);

    const filteredKeys = Object.keys(groceryDict).filter(
        (key) =>
          key.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const handleSelect = (item) => {
        setSearchTerm(item);
        setShowSuggestions(false);
    }

    const addProduct = (product) => {
        const price = groceryDict[product];
        if (!price) {return;}
        setCurrentList((prevList) => {
            const [prevAmount=0, prevTotal=0] = prevList[product] || [0,0];
            const newAmount = prevAmount+1;
            const newTotal = newAmount * price;
            return { ... prevList, [product]:[newAmount, newTotal]};
        });
        setTotalCost(totalCost+price);
      };

    return (
        // search 
        <div>
            <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="search-input"
            />
            {showSuggestions && searchTerm && filteredKeys.length > 0 && (
            <ul className="suggestions-list">
            {filteredKeys.map((key) => (
                <li key={key} onClick={() => handleSelect(key)}>
                {key}
                </li>
            ))}
            </ul>
            )}
           <div className="button-container">
            <button className="custom-button" onClick={() => addProduct(searchTerm)}>Add Product</button>
            <button className="custom-button" onClick={() => setShowList(true)}>View List</button>
            </div>
            {showList && <Listpreview currentList={currentList} setCurrentList={setCurrentList} addProduct={addProduct}
             totalCost={totalCost} setTotalCost={setTotalCost}/>}
        </div>
        // 2 buttons  of view list & add product.
    );
}