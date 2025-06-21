import { useState } from 'react';
import { SearchBar } from "../components/searchbar";
import { TablesPage } from "../pages/tablesPage";
import { osherAdDict, ramiLevyDict, mahsaniAshukDict } from '../components/groceryList'
import "../design/login.css";

export function Welcome() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState('search'); // 'search' or 'tables'
  
  // Shopping lists state
  const [currentListOsher, setCurrentListOsher] = useState({});
  const [currentListRami, setCurrentListRami] = useState({});
  const [currentListMahsani, setCurrentListMahsani] = useState({});
  const [totalCostOsher, setTotalCostOsher] = useState(0);
  const [totalCostRami, setTotalCostRami] = useState(0);
  const [totalCostMahsani, setTotalCostMahsani] = useState(0);

  const addProductToOsher = (productName) => {
    const item = osherAdDict[productName];
    if (!item || !item.itemprice) return;

    const price = item.itemprice;
    setCurrentListOsher(prev => {
      const [prevAmount = 0] = prev[productName] || [];
      const newAmount = prevAmount + 1;
      return { ...prev, [productName]: [newAmount, newAmount * price] };
    });
    setTotalCostOsher(prev => prev + price);
  };

  const addProductToRami = (productName) => {
    const item = ramiLevyDict[productName];
    if (!item || !item.itemprice) return;

    const price = item.itemprice;
    setCurrentListRami(prev => {
      const [prevAmount = 0] = prev[productName] || [];
      const newAmount = prevAmount + 1;
      return { ...prev, [productName]: [newAmount, newAmount * price] };
    });
    setTotalCostRami(prev => prev + price);
  };

  const addProductToMahsani = (productName) => {
    const item = mahsaniAshukDict[productName];
    if (!item || !item.itemprice) return;

    const price = item.itemprice;
    setCurrentListMahsani(prev => {
      const [prevAmount = 0] = prev[productName] || [];
      const newAmount = prevAmount + 1;
      return { ...prev, [productName]: [newAmount, newAmount * price] };
    });
    setTotalCostMahsani(prev => prev + price);
  };

  const addProductToAll = (productName) => {
    addProductToOsher(productName);
    addProductToRami(productName);
    addProductToMahsani(productName);
  };

  // Navigation functions
  const showTables = () => setCurrentPage('tables');
  const showSearch = () => setCurrentPage('search');

  // Render based on current page
  if (currentPage === 'tables') {
    return (
      <TablesPage 
        currentListOsher={currentListOsher}
        setCurrentListOsher={setCurrentListOsher}
        currentListRami={currentListRami}
        setCurrentListRami={setCurrentListRami}
        currentListMahsani={currentListMahsani}
        setCurrentListMahsani={setCurrentListMahsani}
        addProductToOsher={addProductToOsher}
        addProductToRami={addProductToRami}
        addProductToMahsani={addProductToMahsani}
        totalCostOsher={totalCostOsher}
        setTotalCostOsher={setTotalCostOsher}
        totalCostRami={totalCostRami}
        setTotalCostRami={setTotalCostRami}
        totalCostMahsani={totalCostMahsani}
        setTotalCostMahsani={setTotalCostMahsani}
        onBackToSearch={showSearch}
      />
    );
  }

  // Default to search page
  return (
    <div>
      <h3 style={{textAlign:"center", fontWeight: 500, fontSize: "40px"}}>חיפוש מוצרים ברשתות המזון</h3>
      <SearchBar 
        currentListOsher={currentListOsher}
        setCurrentListOsher={setCurrentListOsher}
        currentListRami={currentListRami}
        setCurrentListRami={setCurrentListRami}
        currentListMahsani={currentListMahsani}
        setCurrentListMahsani={setCurrentListMahsani}
        totalCostOsher={totalCostOsher}
        setTotalCostOsher={setTotalCostOsher}
        totalCostRami={totalCostRami}
        setTotalCostRami={setTotalCostRami}
        totalCostMahsani={totalCostMahsani}
        setTotalCostMahsani={setTotalCostMahsani}
        addProductToOsher={addProductToOsher}
        addProductToRami={addProductToRami}
        addProductToMahsani={addProductToMahsani}
        addProductToAll={addProductToAll}
        onShowTables={showTables}
      />
    </div>
  );
}