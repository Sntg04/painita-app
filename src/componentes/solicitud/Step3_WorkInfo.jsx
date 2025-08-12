// src/componentes/solicitud/Step3_WorkInfo.jsx
import React from 'react';
import { Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { employmentStatuses, paymentCycles, incomeRanges } from '../../utils/colombiaData';

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

export default function Step3_WorkInfo({ formData, setFormData }) {
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Box sx={{ bgcolor: '#fff', color: '#000', p: 3, border: '2px solid #000', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
        Información Laboral
      </Typography>

      <FormControl fullWidth margin="normal" sx={fieldStyles}>
        <InputLabel>Situación Laboral</InputLabel>
        <Select name="employment_status" label="Situación Laboral" value={formData.employment_status || ''} onChange={handleChange}>
          {employmentStatuses.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" sx={fieldStyles}>
        <InputLabel>Ciclo de Pago</InputLabel>
        <Select name="payment_cycle" label="Ciclo de Pago" value={formData.payment_cycle || ''} onChange={handleChange}>
          {paymentCycles.map((cycle) => (
            <MenuItem key={cycle} value={cycle}>{cycle}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" sx={fieldStyles}>
        <InputLabel>Ingresos Mensuales</InputLabel>
        <Select name="monthly_income" label="Ingresos Mensuales" value={formData.monthly_income || ''} onChange={handleChange}>
          {incomeRanges.map((range) => (
            <MenuItem key={range} value={range}>
              {range.replace(/_/g, ' ').replace('K', '000').replace('M', '.000.000')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
