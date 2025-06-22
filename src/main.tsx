import React from 'react';
import ReactDOM from 'react-dom/client';
import { Welcome } from '../app/components/welcome';
import '../app/design/searchbar.css';
import '../app/design/button.css';
import '../app/design/grocerylist.css';
import '../app/design/login.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>,
);
