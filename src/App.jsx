import React from 'react';
import './css/App.css';
import { Helmet } from 'react-helmet-async';
import Bienvenida from './views/Bienvenida.jsx';
import * as Sentry from "@sentry/react";

const App = () => {
  return (
    <div className="container-app">
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
    default-src 'self';
    script-src 'self' https://www.google.com https://www.gstatic.com https://api.unisvg.com https://api.iconify.design https://mailbite.io/api/check https://firebasestorage.googleapis.com http://127.0.0.1:5000/recommend;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://firebasestorage.googleapis.com http://127.0.0.1:5000/recommend;
    style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://firebasestorage.googleapis.com http://127.0.0.1:5000/recommend;
    connect-src 'self' https://api.simplesvg.com/ https://www.google.com https://api.unisvg.com https://api.iconify.design https://mailbite.io/api/check https://backend-robo.vercel.app https://back-end-robopits.vercel.app http://127.0.0.1:5000/recommend http://localhost:4000/ https://firebasestorage.googleapis.com;
    object-src 'none';
    frame-src 'self' https://www.google.com http://127.0.0.1:5000/recommend;
    font-src 'self' https://fonts.gstatic.com http://127.0.0.1:5000/recommend;
  `}
        />
      </Helmet>
      <Bienvenida />
    </div>
  );
};

export default Sentry.withProfiler(App);
