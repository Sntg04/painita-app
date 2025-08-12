// src/tema.js
import { createTheme } from '@mui/material/styles';

// Definimos nuestro tema personalizado para Painita
const tema = createTheme({
  palette: {
    // El color primario será nuestro rojo Painita
    primary: {
      main: '#D32F2F', // Rojo principal
      contrastText: '#ffffff', // Texto que va sobre el color primario
    },
    // El color secundario puede ser un gris oscuro
    secondary: {
      main: '#424242',
    },
    background: {
      default: '#f0f2f5', // Fondo gris claro para la página
      paper: '#ffffff',   // Fondo blanco para los "papeles" o tarjetas
    },
    text: {
      primary: '#1C1E21', // Negro para el texto principal
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h5: {
      fontWeight: 700, // Hacemos los títulos h5 más gruesos
    },
  },
  components: {
    // Personalización global para los botones
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bordes redondeados para los botones
          textTransform: 'none', // Evita que los botones se pongan en MAYÚSCULAS
          fontSize: '1rem',
        },
      },
    },
  },
});

export default tema;
