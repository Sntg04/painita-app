// src/componentes/SeccionTestimonios.jsx
import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Rating } from '@mui/material';

const testimonios = [
  { name: 'Carlos R.', city: 'Bogotá', rating: 5, text: '“Me salvó. Ningún banco te presta en 5 minutos. La app fue rápida y cumplió.”' },
  { name: 'Ana G.', city: 'Medellín', rating: 4, text: '“Los intereses son elevados, pero cuando uno está en apuros, lo último que quiere es esperar. Me ayudó a salir de una deuda más grave.”' },
  { name: 'Javier M.', city: 'Cali', rating: 5, text: '“Lo importante es pagar a tiempo. Si te organizas, la app es muy útil. Me prestaron cuando nadie más lo hacía.”' },
];

function SeccionTestimonios() {
  return (
    <Box>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Lo que dicen nuestros clientes
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {testimonios.map((testimonio, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: '16px', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{testimonio.name.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{testimonio.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{testimonio.city}</Typography>
                </Box>
              </Box>
              <Rating value={testimonio.rating} readOnly />
              <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic' }} color="text.secondary">{testimonio.text}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SeccionTestimonios;
