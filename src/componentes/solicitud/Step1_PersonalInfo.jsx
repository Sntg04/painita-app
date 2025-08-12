// src/componentes/solicitud/Step1_PersonalInfo.jsx
import React from 'react';
import { TextField, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { educationLevels, maritalStatuses, genders } from '../../utils/colombiaData';

// Estilos para paleta rojo (#d32f2f), blanco (#fff) y negro (#000)
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

export default function Step1_PersonalInfo({ formData, setFormData }) {
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Box sx={{ bgcolor: '#fff', color: '#000', p: 3, border: '2px solid #000', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
        Información Personal
      </Typography>

      <TextField name="first_name" label="Primer Nombre" fullWidth margin="normal" value={formData.first_name || ''} onChange={handleChange} required sx={fieldStyles} />
      <TextField name="second_name" label="Segundo Nombre (Opcional)" fullWidth margin="normal" value={formData.second_name || ''} onChange={handleChange} sx={fieldStyles} />
      <TextField name="last_name" label="Primer Apellido" fullWidth margin="normal" value={formData.last_name || ''} onChange={handleChange} required sx={fieldStyles} />
      <TextField name="second_last_name" label="Segundo Apellido (Opcional)" fullWidth margin="normal" value={formData.second_last_name || ''} onChange={handleChange} sx={fieldStyles} />
      <TextField name="email" label="Correo Electrónico" type="email" fullWidth margin="normal" value={formData.email || ''} onChange={handleChange} required sx={fieldStyles} />
      <TextField name="document_number" label="Número de Cédula" fullWidth margin="normal" value={formData.document_number || ''} onChange={handleChange} required sx={fieldStyles} />
      <TextField name="birth_date" label="Fecha de Nacimiento" type="date" InputLabelProps={{ shrink: true }} fullWidth margin="normal" value={formData.birth_date || ''} onChange={handleChange} required sx={fieldStyles} />
      <TextField name="document_issue_date" label="Fecha de Expedición de la Cédula" type="date" InputLabelProps={{ shrink: true }} fullWidth margin="normal" value={formData.document_issue_date || ''} onChange={handleChange} required sx={fieldStyles} />

      <FormControl fullWidth margin="normal" required sx={fieldStyles}>
        <InputLabel>Nivel Educativo</InputLabel>
        <Select name="education_level" label="Nivel Educativo" value={formData.education_level || ''} onChange={handleChange}>
          {educationLevels.map((level) => (
            <MenuItem key={level} value={level}>{level.replace('_', ' ')}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required sx={fieldStyles}>
        <InputLabel>Estado Civil</InputLabel>
        <Select name="marital_status" label="Estado Civil" value={formData.marital_status || ''} onChange={handleChange}>
          {maritalStatuses.map((status) => (
            <MenuItem key={status} value={status}>{status.replace('_', ' ')}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required sx={fieldStyles}>
        <InputLabel>Género</InputLabel>
        <Select name="gender" label="Género" value={formData.gender || ''} onChange={handleChange}>
          {genders.map((g) => (
            <MenuItem key={g} value={g}>{g}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
