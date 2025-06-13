
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
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleKeyDown = (e) =>{
        if (!showSuggestions || filteredKeys.length === 0) {return;}
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => prev < filteredKeys.length-1 ? prev+1 : 0);
                break;
              
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev-1 : filteredKeys.length-1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < filteredKeys.length) {
                handleSelect(filteredKeys[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
            
        }
    };

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
            <div className="search-container">
                <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="search-input"
                />
                {showSuggestions && searchTerm && filteredKeys.length > 0 && (
                    <ul className="suggestions-list">
                    {filteredKeys.map((key, index) => (
                        <li 
                            key={key}
                            onClick={() => handleSelect(key)}
                            className={index=== selectedIndex ? 'selected' : ''}
                        >
                            {key}
                        </li>
                    ))}
                    </ul>
                )}
                <div className="button-container">
                    <button className="custom-button" onClick={() => addProduct(searchTerm)}>Add Product</button>
                    <button className="custom-button" onClick={() => setShowList(true)}>View List</button>
                </div>
            </div>
            {showList && <Listpreview currentList={currentList} setCurrentList={setCurrentList} addProduct={addProduct}
            totalCost={totalCost} setTotalCost={setTotalCost}/>} 
        </div>
       
        // 2 buttons  of view list & add product.
    );
}