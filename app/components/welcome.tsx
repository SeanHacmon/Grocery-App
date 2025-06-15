import { Listpreview } from "~/pages/listpreview";
import { OsherAdSearchBar } from "./osherAdSearchbar";
import "../login.css";

export function Welcome() {
  return (
    <div>
      <h1 className="header-title">Grocery Shopping</h1>
      <p1>
        <OsherAdSearchBar/>
        
      </p1>
    </div>
  );
}

