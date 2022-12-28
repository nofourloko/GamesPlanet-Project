import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UzytkownikProvider } from './context/uzytkownikContext';
import { PunktyProvider } from './context/punktyContext'
import { BrowserRouter as Router} from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js'
import {stripePromise} from './stripe/stripe'



ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <UzytkownikProvider>
        <PunktyProvider>
          <Elements stripe={stripePromise}>
            <App/>
          </Elements>
        </PunktyProvider>
      </UzytkownikProvider>
    </Router>
)
