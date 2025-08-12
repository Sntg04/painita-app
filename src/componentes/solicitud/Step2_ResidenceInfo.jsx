// src/componentes/solicitud/Step2_ResidenceInfo.jsx
import React from 'react';
import { TextField, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { departments, citiesByDepartment } from '../../utils/colombiaData';

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

export default function Step2_ResidenceInfo({ formData, setFormData }) {
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDepartmentChange = (e) => setFormData({ ...formData, department: e.target.value, city: '' });

  return (
    <Box sx={{ bgcolor: '#fff', color: '#000', p: 3, border: '2px solid #000', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
        Información de Residencia
      </Typography>

      <FormControl fullWidth margin="normal" sx={fieldStyles}>
        <InputLabel>Departamento</InputLabel>
        <Select name="department" label="Departamento" value={formData.department || ''} onChange={handleDepartmentChange}>
          {departments.map((dep) => (
            <MenuItem key={dep} value={dep}>{dep}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" disabled={!formData.department} sx={fieldStyles}>
        <InputLabel>Ciudad</InputLabel>
        <Select name="city" label="Ciudad" value={formData.city || ''} onChange={handleChange}>
          {(citiesByDepartment[formData.department] || []).map((city) => (
            <MenuItem key={city} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField name="locality" label="Localidad / Barrio" fullWidth margin="normal" value={formData.locality || ''} onChange={handleChange} sx={fieldStyles} />
      <TextField name="address" label="Dirección de Residencia" fullWidth margin="normal" value={formData.address || ''} onChange={handleChange} sx={fieldStyles} />
    </Box>
  );
}
