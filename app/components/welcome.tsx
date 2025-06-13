import { Listpreview } from "~/pages/listpreview";
import { SearchBar } from "./searchbar";
import "../login.css";

export function Welcome() {
  return (
    <div>
      <h1 className="header-title">Grocery Shopping</h1>
      <p1>
        <SearchBar/>
      </p1>
    </div>
  );
}

