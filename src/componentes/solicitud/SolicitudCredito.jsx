// src/componentes/solicitud/SolicitudCredito.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography, Alert } from '@mui/material';
import Step1_PersonalInfo from './Step1_PersonalInfo';
import Step2_ResidenceInfo from './Step2_ResidenceInfo';
import Step3_WorkInfo from './Step3_WorkInfo';
import Step4_References from './Step4_References';
import Step5_DepositInfo from './Step5_DepositInfo';
import Step6_Documents from './Step6_Documents';
import Step7_Selfie from './Step7_Selfie';

const steps = [
  'Información personal',
  'Residencia',
  'Trabajo e ingresos',
  'Referencias',
  'Depósito',
  'Documentos',
  'Selfie'
];

export default function SolicitudCredito() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('solicitudFormData')) || {};
    } catch {
      return {};
    }
  });
  const [errorMsg, setErrorMsg] = useState('');
  const API = useMemo(
    () =>
      import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace(/\/+$/, '')
        : '/api',
    []
  );

  useEffect(() => {
    sessionStorage.setItem('solicitudFormData', JSON.stringify(formData));
  }, [formData]);

  const validateStep = (step) => {
    // Validaciones básicas por paso
    if (step === 0) {
      const req = ['first_name', 'last_name', 'email', 'document_number', 'birth_date', 'document_issue_date', 'education_level', 'marital_status', 'gender'];
      const missing = req.filter((k) => !formData[k]);
      if (missing.length) return `Faltan: ${missing.join(', ')}`;
    }
    if (step === 1) {
      const req = ['department', 'city', 'address'];
      const missing = req.filter((k) => !formData[k]);
      if (missing.length) return `Faltan: ${missing.join(', ')}`;
    }
    if (step === 2) {
      const req = ['employment_status', 'payment_cycle', 'monthly_income'];
      const missing = req.filter((k) => !formData[k]);
      if (missing.length) return `Faltan: ${missing.join(', ')}`;
    }
    if (step === 3) {
      const req = [
        'reference_one_relationship',
        'reference_one_name',
        'reference_one_phone',
        'reference_two_relationship',
        'reference_two_name',
        'reference_two_phone'
      ];
      const missing = req.filter((k) => !formData[k]);
      if (missing.length) return `Faltan: ${missing.join(', ')}`;
    }
    if (step === 4) {
      if (!formData.bank_name || !formData.account_number) return 'Banco y número de cuenta son obligatorios';
      if (formData.account_number_confirm && formData.account_number !== formData.account_number_confirm) {
        return 'El número de cuenta y su confirmación no coinciden';
      }
    }
    if (step === 5) {
      if (!formData.id_front || !formData.id_back) return 'Debes subir frente y reverso de la cédula';
    }
    if (step === 6) {
      if (!formData.selfie) return 'Debes subir tu selfie para verificación';
    }
    return '';
  };

  const handleNext = () => {
    const err = validateStep(activeStep);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => {
    setErrorMsg('');
    setActiveStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const err = validateStep(6);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');

    // Envío: multipart/form-data (incluye archivos)
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v != null) fd.append(k, v);
      });

      const resp = await fetch(`${API}/solicitud`, {
        method: 'POST',
        // no definas Content-Type manualmente, el navegador lo hace con boundary
        headers: {
          ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {})
        },
        body: fd
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data.error || 'No se pudo enviar la solicitud');

      // Limpia y confirma
      sessionStorage.removeItem('solicitudFormData');
      alert('Solicitud enviada con éxito. Pronto nos comunicaremos contigo.');
      // Opcional: redirigir a una pantalla de confirmación
      // navigate('/confirmacion');
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1_PersonalInfo formData={formData} setFormData={setFormData} />;
      case 1:
        return <Step2_ResidenceInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step3_WorkInfo formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step4_References formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step5_DepositInfo formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step6_Documents formData={formData} setFormData={setFormData} />;
      case 6:
        return <Step7_Selfie formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Solicitud de crédito
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

      <Box sx={{ bgcolor: '#0b1220', p: 3, borderRadius: 2 }}>{renderStep()}</Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
          Atrás
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Siguiente
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Enviar solicitud
          </Button>
        )}
      </Box>
    </Box>
  );
}
