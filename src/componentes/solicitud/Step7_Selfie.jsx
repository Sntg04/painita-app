// src/componentes/solicitud/Step7_Selfie.jsx
import React from 'react';
import { Button, Typography, Box } from '@mui/material';

export default function Step7_Selfie({ formData, setFormData }) {
  const handleFileChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.files?.[0] || null });

  return (
    <Box sx={{ bgcolor: '#fff', color: '#000', p: 3, border: '2px solid #000', borderRadius: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
        Verificación de Identidad
      </Typography>
      <Typography variant="body2" sx={{ color: '#000000b3' }}>
        Tómate una foto clara de tu rostro (selfie).
      </Typography>

      <Button
        variant="outlined"
        component="label"
        sx={{
          mt: 3,
          color: '#d32f2f',
          borderColor: '#d32f2f',
          '&:hover': { borderColor: '#b71c1c', bgcolor: 'rgba(211,47,47,0.06)' }
        }}
      >
        {formData.selfie ? formData.selfie.name : 'Subir Selfie'}
        <input type="file" name="selfie" accept="image/*" capture="user" hidden onChange={handleFileChange} />
      </Button>
    </Box>
  );
}
