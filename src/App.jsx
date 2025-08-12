// src/App.jsx
import React from 'react';
import { Container, Box, Typography, Toolbar } from '@mui/material';

// Importamos todos nuestros componentes
import BarraNavegacion from './componentes/BarraNavegacion';
import CalculadoraCredito from './componentes/CalculadoraCredito';
import SeccionQuienesSomos from './componentes/SeccionQuienesSomos';
import SeccionTestimonios from './componentes/SeccionTestimonios';
import SeccionContacto from './componentes/SeccionContacto';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BarraNavegacion />
      
      {/* El contenido principal de la página */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* === Sección Héroe (Calculadora) === */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Ocupa toda la altura de la pantalla
            textAlign: 'center',
            pt: { xs: 12, md: 8 }, // Padding top para dejar espacio a la barra de navegación
            pb: { xs: 6, md: 8 },
            background: 'linear-gradient(to bottom, #f0f2f5 70%, #ffffff 30%)' // Un fondo degradado sutil
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
              Ayuda financiera tan valiosa como una gema.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Obtén un crédito de emergencia en minutos, sin papeleos y 100% online.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CalculadoraCredito />
            </Box>
          </Container>
        </Box>

        {/* === Sección Quiénes Somos === */}
        <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <SeccionQuienesSomos />
          </Container>
        </Box>

        {/* === Sección Testimonios === */}
        <Box sx={{ py: { xs: 8, md: 10 } }}>
          <Container maxWidth="lg">
            <SeccionTestimonios />
          </Container>
        </Box>
      </Box>

      {/* === Footer (Contacto) === */}
      <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <SeccionContacto />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
