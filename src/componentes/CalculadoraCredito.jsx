// src/componentes/CalculadoraCredito.jsx
import React, { useState } from 'react';
import { Slider, Typography, Paper, Button, Box } from '@mui/material';
import FormularioTelefono from './FormularioTelefono';

function CalculadoraCredito() {
  const [monto, definirMonto] = useState(250000);
  const [dias, definirDias] = useState(30);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const manejarTelefonoVerificado = (datos) => {
    console.log("✅ Datos registrados:", datos);
    alert(`Número verificado: ${datos.telefono}\nContraseña: ${datos.password}`);
    setMostrarFormulario(false);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        padding: { xs: 3, md: 4 },
        borderRadius: '16px',
        maxWidth: '500px',
        width: '100%'
      }}
    >
      {!mostrarFormulario ? (
        <>
          <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
            Simula tu Crédito al Instante
          </Typography>

          <Box mt={4}>
            <Typography gutterBottom sx={{ color: 'text.secondary' }}>
              Monto que necesitas:
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {formatearMoneda(monto)}
            </Typography>
            <Slider
              value={monto}
              onChange={(e, val) => definirMonto(val)}
              min={100000}
              max={1200000}
              step={10000}
              aria-label="Slider de monto"
            />
          </Box>

          <Box mt={2} mb={4}>
            <Typography gutterBottom sx={{ color: 'text.secondary' }}>
              Elige el plazo:
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {dias} días
            </Typography>
            <Slider
              value={dias}
              onChange={(e, val) => definirDias(val)}
              min={8}
              max={120}
              step={1}
              aria-label="Slider de plazo en días"
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ py: 1.5 }}
            onClick={() => setMostrarFormulario(true)}
          >
            ¡Solicítalo Ahora!
          </Button>
        </>
      ) : (
        <FormularioTelefono
          onVerificado={manejarTelefonoVerificado}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}
    </Paper>
  );
}

export default CalculadoraCredito;
