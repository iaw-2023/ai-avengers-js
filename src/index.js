import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';

const domain = 'dev-7jdip8215elmq7hg.us.auth0.com'; // Reemplaza con tu dominio de Auth0
const clientId = '0wWvG46XWAb7G1pyhZL2U3XT24AqUeM3';   // Reemplaza con tu ID de cliente

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>,
);
