import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UzytkownikProvider } from './context/uzytkownikContext';
import { PunktyProvider } from './context/punktyContext'
import { BrowserRouter as Router} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <UzytkownikProvider>
        <PunktyProvider>
          <App/>
        </PunktyProvider>
      </UzytkownikProvider>
    </Router>
)
