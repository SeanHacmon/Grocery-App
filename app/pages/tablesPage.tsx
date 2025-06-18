import { RamiLevyTable } from "~/pages/ramilevytable";
import { OsherAdTable } from "~/pages/osheradTable";

export function TablesPage({
  currentListOsher,
  setCurrentListOsher,
  currentListRami,
  setCurrentListRami,
  addProductToOsher,
  addProductToRami,
  totalCostOsher,
  setTotalCostOsher,
  totalCostRami,
  setTotalCostRami,
  onBackToSearch
}) {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={onBackToSearch}
          style={{ 
            background: 'none',
            border: 'none',
            color: '#007bff',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          ← חזור לחיפוש
        </button>
      </div>
      
      <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: "40px" }}>רשימות קניות</h3>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <RamiLevyTable
          currentListOsher={currentListOsher}
          setCurrentListOsher={setCurrentListOsher}
          currentListRami={currentListRami}
          setCurrentListRami={setCurrentListRami}
          addProductToOsher={addProductToOsher}
          addProductToRami={addProductToRami}
          totalCostOsher={totalCostOsher}
          setTotalCostOsher={setTotalCostOsher}
          totalCostRami={totalCostRami}
          setTotalCostRami={setTotalCostRami}
        />
        <OsherAdTable
          currentListOsher={currentListOsher}
          setCurrentListOsher={setCurrentListOsher}
          currentListRami={currentListRami}
          setCurrentListRami={setCurrentListRami}
          addProductToOsher={addProductToOsher}
          addProductToRami={addProductToRami}
          totalCostOsher={totalCostOsher}
          setTotalCostOsher={setTotalCostOsher}
          totalCostRami={totalCostRami}
          setTotalCostRami={setTotalCostRami}
        />
      </div>
    </div>
  );
}