// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Usaremos App.jsx como nuestro archivo principal
import tema from './tema'; // Importamos nuestro tema personalizado
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ThemeProvider aplica nuestros colores y tipografía a toda la app */}
    <ThemeProvider theme={tema}>
      {/* CssBaseline normaliza los estilos CSS en todos los navegadores */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
