// src/componentes/BarraNavegacion.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

function BarraNavegacion() {
  return (
    <AppBar position="fixed" color="primary" elevation={1}>
      <Toolbar>
        {/* Logo y nombre de la app */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <DiamondIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" fontWeight="bold">
            Painita
          </Typography>
        </Box>

        {/* Botón de inicio de sesión */}
        <Button
          color="inherit"
          variant="outlined"
          sx={{
            borderColor: 'white',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Iniciar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default BarraNavegacion;
