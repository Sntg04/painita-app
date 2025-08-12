// src/componentes/SeccionQuienesSomos.jsx
import React from 'react';
import { Box, Typography, Grid, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VisibilityIcon from '@mui/icons-material/Visibility';

function SeccionQuienesSomos() {
  return (
    <Stack spacing={8}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
          <PeopleIcon sx={{ fontSize: 60, color: 'primary.main' }} />
        </Grid>
        <Grid item xs={12} md={10}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ¿Quiénes Somos?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Somos una solución financiera digital diseñada para colombianos que necesitan una respuesta rápida. Entendemos que la vida no siempre sigue un plan, y encontrar ayuda en momentos críticos puede ser tan raro como una gema preciosa. <strong>Painita</strong> nace para hacer esa ayuda accesible, transparente y, sobre todo, increíblemente rápida.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <TrackChangesIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" fontWeight="bold">Nuestra Misión</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Ofrecer acceso a créditos de emergencia de forma 100% digital, para que un imprevisto financiero no detenga tu vida.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <VisibilityIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" fontWeight="bold">Nuestra Visión</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Ser la herramienta de confianza para los colombianos, construyendo un ecosistema donde el acceso al crédito sea simple y justo.
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default SeccionQuienesSomos;
