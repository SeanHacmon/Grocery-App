// app/contexts/ShoppingContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { osherAdDict, ramiLevyDict, mahsaniAshukDict } from '../components/groceryList';

// Types
interface ShoppingList {
  [productName: string]: [amount: number, total: number];
}

interface StoreData {
  [productName: string]: {
    itemprice: number;
    quantity?: number;
    itemid?: string;
    itemcode?: string;
    unitofmeasure?: string;
    unitofmeasureprice?: number;
    image?: string;
  };
}

interface ShoppingContextType {
  // Lists
  currentListOsher: ShoppingList;
  currentListRami: ShoppingList;
  currentListMahsani: ShoppingList;
  
  // Totals
  totalCostOsher: number;
  totalCostRami: number;
  totalCostMahsani: number;
  
  // Actions
  addProductToStore: (productName: string, store: 'osher' | 'rami' | 'mahsani') => void;
  addProductToAll: (productName: string) => void;
  reduceProductAmount: (productName: string, store: 'osher' | 'rami' | 'mahsani') => void;
  deleteProduct: (productName: string, store: 'osher' | 'rami' | 'mahsani') => void;
  clearAllProducts: (store: 'osher' | 'rami' | 'mahsani') => void;
  
  // Store data
  getStoreData: (store: 'osher' | 'rami' | 'mahsani') => StoreData;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};

interface ShoppingProviderProps {
  children: ReactNode;
}

export const ShoppingProvider = ({ children }: ShoppingProviderProps) => {
  // State
  const [currentListOsher, setCurrentListOsher] = useState<ShoppingList>({});
  const [currentListRami, setCurrentListRami] = useState<ShoppingList>({});
  const [currentListMahsani, setCurrentListMahsani] = useState<ShoppingList>({});
  const [totalCostOsher, setTotalCostOsher] = useState(0);
  const [totalCostRami, setTotalCostRami] = useState(0);
  const [totalCostMahsani, setTotalCostMahsani] = useState(0);

  // Store data mapping
  const storeDataMap = {
    osher: osherAdDict,
    rami: ramiLevyDict,
    mahsani: mahsaniAshukDict
  };

  const listSetters = {
    osher: setCurrentListOsher,
    rami: setCurrentListRami,
    mahsani: setCurrentListMahsani
  };

  const totalSetters = {
    osher: setTotalCostOsher,
    rami: setTotalCostRami,
    mahsani: setTotalCostMahsani
  };

  const currentLists = {
    osher: currentListOsher,
    rami: currentListRami,
    mahsani: currentListMahsani
  };

  // Generic helper function to get store data
  const getStoreData = (store: 'osher' | 'rami' | 'mahsani'): StoreData => {
    return storeDataMap[store];
  };

  // Generic add product function
  const addProductToStore = (productName: string, store: 'osher' | 'rami' | 'mahsani') => {
    const storeData = getStoreData(store);
    const item = storeData[productName];
    
    if (!item || !item.itemprice) return;

    const price = item.itemprice;
    const setList = listSetters[store];
    const setTotal = totalSetters[store];
    const currentList = currentLists[store];

    setList(prev => {
      const [prevAmount = 0] = prev[productName] || [];
      const newAmount = prevAmount + 1;
      return { ...prev, [productName]: [newAmount, newAmount * price] };
    });
    
    setTotal(prev => prev + price);
  };

  // Add to all stores
  const addProductToAll = (productName: string) => {
    addProductToStore(productName, 'osher');
    addProductToStore(productName, 'rami');
    addProductToStore(productName, 'mahsani');
  };

  // Generic reduce amount function
  const reduceProductAmount = (productName: string, store: 'osher' | 'rami' | 'mahsani') => {
    const currentList = currentLists[store];
    const storeData = getStoreData(store);
    const setList = listSetters[store];
    const setTotal = totalSetters[store];

    if (!currentList[productName]) return;

    if (currentList[productName][0] === 1) {
      deleteProduct(productName, store);
    } else if (currentList[productName][0] >= 1) {
      const price = storeData[productName]?.itemprice;
      if (!price) return;
      
      setList(prev => {
        const [prevAmount = 0] = prev[productName] || [0, 0];
        const newAmount = prevAmount - 1;
        const newTotal = newAmount * price;
        return { ...prev, [productName]: [newAmount, newTotal] };
      });
      
      setTotal(prev => Math.max(0, prev - price));
    }
  };

  // Generic delete product function
  const deleteProduct = (productName: string, store: 'osher' | 'rami' | 'mahsani') => {
    const currentList = currentLists[store];
    const setList = listSetters[store];
    const setTotal = totalSetters[store];

    setList(prev => {
      const updatedList = { ...prev };
      const productTotal = currentList[productName]?.[1] || 0;
      delete updatedList[productName];
      setTotal(prevTotal => Math.max(0, prevTotal - productTotal));
      return updatedList;
    });
  };

  // Generic clear all products function
  const clearAllProducts = (store: 'osher' | 'rami' | 'mahsani') => {
    listSetters[store]({});
    totalSetters[store](0);
  };

  const contextValue: ShoppingContextType = {
    // Lists
    currentListOsher,
    currentListRami,
    currentListMahsani,
    
    // Totals
    totalCostOsher,
    totalCostRami,
    totalCostMahsani,
    
    // Actions
    addProductToStore,
    addProductToAll,
    reduceProductAmount,
    deleteProduct,
    clearAllProducts,
    
    // Store data
    getStoreData
  };

  return (
    <ShoppingContext.Provider value={contextValue}>
      {children}
    </ShoppingContext.Provider>
  );
};