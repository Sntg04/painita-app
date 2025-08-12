// src/componentes/FormularioTelefono.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

export default function FormularioTelefono({ onVerificado, onCancelar }) {
  const navigate = useNavigate();
  const API = useMemo(
    () => (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : 'http://localhost:3001'),
    []
  );

  const [paso, setPaso] = useState(1); // 1 = teléfono, 2 = OTP, 3 = contraseña
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Teléfono
  const [telefono, setTelefono] = useState('');

  // OTP
  const [otp, setOtp] = useState('');
  const [resendLeft, setResendLeft] = useState(0);

  // Contraseña
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Manejo de temporizador para reenviar OTP
  useEffect(() => {
    if (paso !== 2) return;
    if (resendLeft <= 0) return;
    const t = setInterval(() => setResendLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [paso, resendLeft]);

  // Normaliza y limita entradas
  const manejarCambioTelefono = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setTelefono(valor);
  };

  const manejarCambioOtp = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    setOtp(valor);
  };

  // Paso 1: enviar teléfono -> generar/enviar OTP desde backend
  const enviarTelefono = async () => {
    setErrorMsg('');
    if (telefono.length !== 10) {
      setErrorMsg('El número debe tener exactamente 10 dígitos.');
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch(`${API}/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Usamos "telefono" para alinear con tu proyecto (no "phone")
        body: JSON.stringify({ telefono }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'No se pudo enviar el OTP');
      setPaso(2);
      setResendLeft(RESEND_SECONDS);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: verificar OTP (en el backend lo validaremos en el registro final)
  // Aquí solo avanzamos si cumple longitud, el backend validará el código real.
  const verificarOtp = () => {
    setErrorMsg('');
    if (otp.length !== OTP_LENGTH) {
      setErrorMsg(`El OTP debe tener ${OTP_LENGTH} dígitos.`);
      return;
    }
    setPaso(3);
  };

  const reenviarOtp = async () => {
    if (resendLeft > 0) return;
    await enviarTelefono();
  };

  // Paso 3: guardar contraseña y registrar usuario en backend
  const guardarPassword = async () => {
    setErrorMsg('');
    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Importante: enviamos telefono, otp y password como lo espera tu backend
        body: JSON.stringify({ telefono, otp, password }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'No se pudo crear el usuario');

      // Si tu backend devuelve token, lo guardamos
      if (data.token) localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      if (data.userId) localStorage.setItem('userId', data.userId);
      if (data.user && data.user.id) localStorage.setItem('userId', data.user.id);

      // Notifica al padre (si desea registrar algo) y cierra modal si aplica
      if (typeof onVerificado === 'function') onVerificado({ telefono, password });
      if (typeof onCancelar === 'function') onCancelar();

      // Redirige al formulario de 7 pasos
      navigate('/solicitud');
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        {errorMsg && (
          <Alert severity="error" sx={{ width: '100%', maxWidth: 420 }}>
            {errorMsg}
          </Alert>
        )}

        {/* Paso 1: Teléfono */}
        {paso === 1 && (
          <>
            <Typography variant="h6">Digite su número de teléfono</Typography>
            <TextField
              value={telefono}
              onChange={manejarCambioTelefono}
              placeholder="Ej: 3101234567"
              sx={{ width: 280 }}
              inputProps={{ inputMode: 'tel', autoComplete: 'tel', maxLength: 10 }}
              autoFocus
            />
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={enviarTelefono}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={onCancelar} disabled={loading}>
                Cancelar
              </Button>
            </Box>
          </>
        )}

        {/* Paso 2: OTP */}
        {paso === 2 && (
          <>
            <Typography variant="h6">Ingrese el código OTP de {OTP_LENGTH} dígitos</Typography>
            <TextField
              value={otp}
              onChange={manejarCambioOtp}
              placeholder={'-'.repeat(OTP_LENGTH)}
              sx={{ width: 180 }}
              inputProps={{ inputMode: 'numeric', maxLength: OTP_LENGTH }}
              autoFocus
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={verificarOtp}
                disabled={loading || otp.length !== OTP_LENGTH}
              >
                Verificar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={reenviarOtp}
                disabled={loading || resendLeft > 0}
              >
                {resendLeft > 0 ? `Reenviar (${resendLeft}s)` : 'Reenviar'}
              </Button>
              <Button variant="outlined" color="warning" onClick={() => setPaso(1)} disabled={loading}>
                Corregir Número
              </Button>
            </Box>
          </>
        )}

        {/* Paso 3: Contraseña */}
        {paso === 3 && (
          <>
            <Typography variant="h6">Crea tu contraseña</Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              sx={{ width: 280 }}
              autoFocus
              inputProps={{ autoComplete: 'new-password', minLength: 6 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      aria-label="Mostrar u ocultar contraseña"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              sx={{ width: 280 }}
              inputProps={{ autoComplete: 'new-password', minLength: 6 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      aria-label="Mostrar u ocultar confirmación"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={guardarPassword}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={onCancelar} disabled={loading}>
                Cancelar
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
}
