// src/componentes/solicitud/Step5_DepositInfo.jsx
import React from 'react';
import { TextField, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { banks } from '../../utils/colombiaData';

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

export default function Step5_DepositInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'account_number' || name === 'account_number_confirm') {
      const digits = value.replace(/[^0-9]/g, '').slice(0, 20);
      setFormData({ ...formData, [name]: digits });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <Box sx={{ bgcolor: '#fff', color: '#000', p: 3, border: '2px solid #000', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
        Información de Depósito
      </Typography>

      <FormControl fullWidth margin="normal" sx={fieldStyles}>
        <InputLabel>Banco</InputLabel>
        <Select name="bank_name" label="Banco" value={formData.bank_name || ''} onChange={handleChange}>
          {banks.map((bank) => (
            <MenuItem key={bank} value={bank}>{bank}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField name="account_number" label="Número de Cuenta" fullWidth margin="normal" value={formData.account_number || ''} onChange={handleChange} sx={fieldStyles} inputProps={{ inputMode: 'numeric' }} />
      <TextField name="account_number_confirm" label="Confirmar Número de Cuenta" fullWidth margin="normal" value={formData.account_number_confirm || ''} onChange={handleChange} sx={fieldStyles} inputProps={{ inputMode: 'numeric' }} />
    </Box>
  );
}
