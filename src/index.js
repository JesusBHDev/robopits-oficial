import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { Rutas } from './routers/Rutas';
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from './context/AuthContext.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <AuthProvider>
     <HelmetProvider>
        <RouterProvider router={Rutas} />
    </HelmetProvider>
   </AuthProvider>
);