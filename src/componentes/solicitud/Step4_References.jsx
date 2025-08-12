// src/componentes/solicitud/Step4_References.jsx
import React from 'react';
import { TextField, Typography, Box, Divider, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { relationshipTypes } from '../../utils/colombiaData';

const fieldStyles = {
  '& label': { color: '#000000b3' },
  '& label.Mui-focused': { color: '#d32f2f' },
  '& .MuiInputBase-input': { color: '#000' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#00000080' },
    '&:hover fieldset': { borderColor: '#000' },
    '&.Mui-focused fieldset': { borderColor: '#d32f2f' },
    '& .MuiSelect-icon': { color: '#000000b3' }
  }
};

export default function Step4_References({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'reference_one_phone' || name === 'reference_two_phone') {
      const digits = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: digits });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <Box sx={{ bgcolor: '#fff', color: '#000', p: 3, border: '2px solid #000', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
        Referencias
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ color: '#000', fontWeight: 600 }}>
        Referencia Uno
      </Typography>
      <FormControl fullWidth margin="normal" sx={fieldStyles}>
        <InputLabel>Relación</InputLabel>
        <Select name="reference_one_relationship" label="Relación" value={formData.reference_one_relationship || ''} onChange={handleChange}>
          {relationshipTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField name="reference_one_name" label="Nombre Completo" fullWidth margin="normal" value={formData.reference_one_name || ''} onChange={handleChange} sx={fieldStyles} />
      <TextField name="reference_one_phone" label="Número de Celular" fullWidth margin="normal" value={formData.reference_one_phone || ''} onChange={handleChange} sx={fieldStyles} inputProps={{ inputMode: 'tel', maxLength: 10 }} />

      <Divider sx={{ my: 2, borderColor: '#0000001f' }} />

      <Typography variant="subtitle1" gutterBottom sx={{ color: '#000', fontWeight: 600 }}>
        Referencia Dos
      </Typography>
      <FormControl fullWidth margin="normal" sx={fieldStyles}>
        <InputLabel>Relación</InputLabel>
        <Select name="reference_two_relationship" label="Relación" value={formData.reference_two_relationship || ''} onChange={handleChange}>
          {relationshipTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField name="reference_two_name" label="Nombre Completo" fullWidth margin="normal" value={formData.reference_two_name || ''} onChange={handleChange} sx={fieldStyles} />
      <TextField name="reference_two_phone" label="Número de Celular" fullWidth margin="normal" value={formData.reference_two_phone || ''} onChange={handleChange} sx={fieldStyles} inputProps={{ inputMode: 'tel', maxLength: 10 }} />
    </Box>
  );
}
