// src/componentes/BarraNavegacion.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

function BarraNavegacion() {
  return (
    // AppBar es la barra superior de MUI
    <AppBar position="fixed" color="primary" elevation={1}>
      <Toolbar>
        {/* Contenedor para el logo y el nombre */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <DiamondIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Painita
          </Typography>
        </Box>

        {/* Botón de Iniciar Sesión */}
        <Button color="inherit" variant="outlined">
          Iniciar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default BarraNavegacion;
