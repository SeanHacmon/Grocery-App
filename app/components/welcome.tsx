// app/components/welcome.tsx
import { useState } from 'react';
import { SearchBar } from "../components/searchbar";
import { TablesPage } from "../pages/tablesPage";
import { ShoppingProvider } from '../contexts/ShoppingContext';
import "../design/login.css";

export function Welcome() {
  // Navigation state - this is the only state we need in this component now
  const [currentPage, setCurrentPage] = useState('search'); // 'search' or 'tables'

  // Navigation functions
  const showTables = () => setCurrentPage('tables');
  const showSearch = () => setCurrentPage('search');

  // Render based on current page
  if (currentPage === 'tables') {
    return (
      <ShoppingProvider>
        <TablesPage onBackToSearch={showSearch} />
      </ShoppingProvider>
    );
  }

  // Default to search page
  return (
    <ShoppingProvider>
      <div>
        <h3 style={{textAlign:"center", fontWeight: 500, fontSize: "40px"}}>
          חיפוש מוצרים ברשתות המזון
        </h3>
        <SearchBar onShowTables={showTables} />
      </div>
    </ShoppingProvider>
  );
}