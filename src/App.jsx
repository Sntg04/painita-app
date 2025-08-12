// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Toolbar, Container, Box, Typography } from '@mui/material';

// Componentes existentes
import BarraNavegacion from './componentes/BarraNavegacion';
import CalculadoraCredito from './componentes/CalculadoraCredito';
import SeccionQuienesSomos from './componentes/SeccionQuienesSomos';
import SeccionTestimonios from './componentes/SeccionTestimonios';
import SeccionContacto from './componentes/SeccionContacto';
import SolicitudCredito from './componentes/solicitud/SolicitudCredito'; // <-- tu contenedor real

// Ruta protegida simple basada en localStorage
function PrivateRoute({ children }) {
  const isAuth =
    localStorage.getItem('isAuthenticated') === 'true' || !!localStorage.getItem('token');
  return isAuth ? children : <Navigate to="/" replace />;
}

// Página principal (landing) con tu layout existente
function HomeLanding() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            pt: { xs: 6, md: 4 }, // espacio adicional del héroe (la AppBar ya está compensada por <Toolbar /> global)
            pb: { xs: 6, md: 8 },
            background: 'linear-gradient(to bottom, #f0f2f5 70%, #ffffff 30%)',
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

        <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <SeccionQuienesSomos />
          </Container>
        </Box>

        <Box sx={{ py: { xs: 8, md: 10 } }}>
          <Container maxWidth="lg">
            <SeccionTestimonios />
          </Container>
        </Box>
      </Box>

      <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <SeccionContacto />
        </Container>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <BarraNavegacion />
      {/* Espaciador invisible del alto del AppBar/Toolbar para evitar que tape el contenido */}
      <Toolbar />
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route
          path="/solicitud"
          element={
            <PrivateRoute>
              <SolicitudCredito />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
