import { RamiLevyTable } from "~/pages/ramilevytable";
import { OsherAdTable } from "~/pages/osheradTable";
import { MahsaniAshukTable } from "~/pages/mahsaniashukTable";

export function TablesPage({
  currentListOsher,
  setCurrentListOsher,
  currentListRami,
  setCurrentListRami,
  currentListMahsani,
  setCurrentListMahsani,
  addProductToOsher,
  addProductToRami,
  addProductToMahsani,
  totalCostOsher,
  setTotalCostOsher,
  totalCostRami,
  setTotalCostRami,
  totalCostMahsani,
  setTotalCostMahsani,
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
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '15px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ transform: 'scale(0.95)', transformOrigin: 'top' }}>
          <RamiLevyTable
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
          />
        </div>
        <div style={{ transform: 'scale(0.95)', transformOrigin: 'top' }}>
          <OsherAdTable
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
          />
        </div>
        <div style={{ transform: 'scale(0.95)', transformOrigin: 'top' }}>
          <MahsaniAshukTable
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
          />
        </div>
      </div>
    </div>
  );
}