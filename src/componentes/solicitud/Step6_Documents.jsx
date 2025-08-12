// src/componentes/solicitud/Step6_Documents.jsx
import React from 'react';
import { Button, Typography, Box, Stack } from '@mui/material';

export default function Step6_Documents({ formData, setFormData }) {
  const handleFileChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.files?.[0] || null });

  return (
    <Box sx={{ bgcolor: '#fff', color: '#000', p: 3, border: '2px solid #000', borderRadius: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
        Documento de Identidad
      </Typography>
      <Typography variant="body2" sx={{ color: '#000000b3' }}>
        Sube fotos claras del frente y reverso de tu cédula.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mt: 3 }}>
        <Button
          variant="outlined"
          component="label"
          sx={{
            color: '#d32f2f',
            borderColor: '#d32f2f',
            '&:hover': { borderColor: '#b71c1c', bgcolor: 'rgba(211,47,47,0.06)' }
          }}
        >
          {formData.id_front ? formData.id_front.name : 'Subir Cédula (Frente)'}
          <input type="file" name="id_front" hidden onChange={handleFileChange} accept="image/*" />
        </Button>

        <Button
          variant="outlined"
          component="label"
          sx={{
            color: '#d32f2f',
            borderColor: '#d32f2f',
            '&:hover': { borderColor: '#b71c1c', bgcolor: 'rgba(211,47,47,0.06)' }
          }}
        >
          {formData.id_back ? formData.id_back.name : 'Subir Cédula (Reverso)'}
          <input type="file" name="id_back" hidden onChange={handleFileChange} accept="image/*" />
        </Button>
      </Stack>
    </Box>
  );
}
