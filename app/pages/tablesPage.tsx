// app/pages/tablesPage.tsx
import { GenericStoreTable } from "../components/GenericStoreTable";
import ramiLevyImage from "../../images/ramilevy.jpg";
import osherImage from "../../images/osherad.jpg";
import mahsaniImage from "../../images/mahsaniashuk.jpg";

interface TablesPageProps {
  onBackToSearch: () => void;
}

// Store configurations
const storeConfigs = [
  {
    name: 'rami' as const,
    displayName: 'רמי לוי',
    image: ramiLevyImage
  },
  {
    name: 'osher' as const,
    displayName: 'אושר אד',
    image: osherImage
  },
  {
    name: 'mahsani' as const,
    displayName: 'מחסני השוק',
    image: mahsaniImage
  }
];

export function TablesPage({ onBackToSearch }: TablesPageProps) {
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
      
      <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: "40px" }}>
        רשימות קניות
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '15px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {storeConfigs.map((storeConfig) => (
          <div 
            key={storeConfig.name}
            style={{ transform: 'scale(0.95)', transformOrigin: 'top' }}
          >
            <GenericStoreTable storeConfig={storeConfig} />
          </div>
        ))}
      </div>
    </div>
  );
}