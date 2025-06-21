import { useState } from "react";
import '../design/searchbar.css';
import '../design/button.css';
import { osherAdDict, ramiLevyDict, mahsaniAshukDict } from "./groceryList";

export function SearchBar({
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
  addProductToMahsani,
  addProductToAll,
  onShowTables
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const allItemNames = new Set([
    ...Object.keys(osherAdDict),
    ...Object.keys(ramiLevyDict),
    ...Object.keys(mahsaniAshukDict)
  ]);

  const filteredItems = Array.from(allItemNames).filter(itemName =>
    itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowTables = () => {
    onShowTables();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredItems.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
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
      default:
        break;
    }
  };

  const handleSelect = (itemName) => {
    setSearchTerm(itemName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleSearch = () => {
    setShowSuggestions(false);
    setShowSearchResults(true);
    setSelectedIndex(-1);
  };

  return (
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
            {filteredItems.map((itemName, index) => {
              const osherPrice = osherAdDict[itemName]?.itemprice;
              const ramiPrice = ramiLevyDict[itemName]?.itemprice;
              const mahsaniPrice = mahsaniAshukDict[itemName]?.itemprice;

              return (
                <li
                  key={itemName}
                  onClick={() => handleSelect(itemName)}
                  className={index === selectedIndex ? 'selected' : ''}
                >
                  <div>{itemName}</div>
                  <div>
                    {osherPrice && <span>אושר אד: ₪{osherPrice}</span>}
                    {(osherPrice && ramiPrice) && <span> | </span>}
                    {ramiPrice && <span>רמי לוי: ₪{ramiPrice}</span>}
                    {((osherPrice || ramiPrice) && mahsaniPrice) && <span> | </span>}
                    {mahsaniPrice && <span>מחסני השוק: ₪{mahsaniPrice}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className="button-container">
          <button className="custom-button" onClick={handleSearch}>חיפוש</button>
          <button className="custom-button" onClick={handleShowTables}>
            הצג רשימות
          </button>
        </div>
      </div>

      {/* Search Results */}
      {showSearchResults && searchTerm && (
        <div className="search-results-container">
          <div className="search-results-header">
            <h3>תוצאות חיפוש עבור: ״{searchTerm}״</h3>
            <button className="close-search-button" onClick={() => setShowSearchResults(false)}>
              ✕
            </button>
          </div>
          <div className="products-grid">
            {filteredItems.map((itemName) => {
              const ramiItem = ramiLevyDict[itemName];
              const osherItem = osherAdDict[itemName];
              const mahsaniItem = mahsaniAshukDict[itemName];
              // const imageCode = ramiItem?.itemcode || 'default';
              // const imageCode = ramiItem?.itemcode || osherItem?.itemcode || 'default';
              const imageCode = ramiItem?.image || osherItem?.image || mahsaniItem?.image || 'https://img.rami-levy.co.il/product/default/small.jpg';
              return (
                <div key={itemName} className="product-card">
                  <div className="product-image">
                    <img
                        className="search-product-image"
                      // src={`https://img.rami-levy.co.il/product/${imageCode}/small.jpg`}
                      src={imageCode}
                      alt={itemName}
                      onError={(e) => {
                        // console.log(imageCode);
                        console.log(ramiItem);
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">{itemName}</h4>
                    <button className="custom-button" onClick={() => addProductToAll(itemName)}>
                      הוסף מוצר
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}