import { useState } from "react";
import { Listpreview } from "~/pages/listpreview";
import '../searchbar.css';
import '../button.css';
import ramiLevyitemDict from "./groceryList";


export function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showList, setShowList] = useState(false);
    const [currentList, setCurrentList] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const itemDict = ramiLevyitemDict
    
    const handleKeyDown = (e) =>{
        if (!showSuggestions || filteredItems.length === 0) {return;}
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => prev < filteredItems.length-1 ? prev+1 : 0);
                break;
              
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev-1 : filteredItems.length-1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
                handleSelect(filteredItems[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
            
        }
    };

    const filteredItems = Object.keys(itemDict).filter(itemName =>
        itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (itemName) => {
        setSearchTerm(itemName);
        setShowSuggestions(false);
        setSelectedIndex(-1);
    }



    const addProduct = (productName) => {
        // Get item from dictionary
        const item = itemDict[productName];
        if (!item || !item.itemprice) {
            console.log("Product not found or no price:", productName);
            return;
        }
        const price = item.itemprice;
        
        setCurrentList(prevList => {
            const [prevAmount = 0, prevTotal = 0] = prevList[productName] || [0, 0];
            const newAmount = prevAmount + 1;
            const newTotal = newAmount * price;
            return { ...prevList, [productName]: [newAmount, newTotal] };
        });
        
        setTotalCost(prevTotal => prevTotal + price);
    };

    return (
        // search 
        <div>
            <div className="search-container">
                <input
                type="text"
                placeholder="...חפש מוצר"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                    setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="search-input"
                />
                {showSuggestions && searchTerm && filteredItems.length > 0 && (
                    <ul className="suggestions-list">
                    {filteredItems.map((itemName, index) => (
                        <li 
                            key={itemDict[itemName].itemid}
                            onClick={() => handleSelect(itemName)}
                            className={index=== selectedIndex ? 'selected' : ''}
                        >
                            {itemName}- ₪{itemDict[itemName].itemprice}
                            <span>
                                <img
                                        src={'app/images/OsherAd Image.png'} 
                                        alt={itemName}
                                        className="search-product-image"
                                        onError={(e) => {
                                            e.target.src = 'app/images/OsherAd Image.png';
                                        }}
                                    />
                            </span>    
                        </li>
                    ))}
                    </ul>
                )}
                <div className="button-container">
                    <button className="custom-button" onClick={() => addProduct(searchTerm)}>הוסף מוצר</button>
                    <button className="custom-button" onClick={() => setShowList(true)}>הצג רשימה</button>
                </div>
            </div>
            {showList && <Listpreview currentList={currentList} setCurrentList={setCurrentList} addProduct={addProduct}
            totalCost={totalCost} setTotalCost={setTotalCost}/>} 
        </div>
    );
}