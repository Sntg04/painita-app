import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function FormularioTelefono({ onVerificado, onCancelar }) {
  const [telefono, setTelefono] = useState("");
  const [otp, setOtp] = useState("");
  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [paso, setPaso] = useState(1); // 1 = teléfono, 2 = OTP, 3 = contraseña

  // Contraseña
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Limitar número de teléfono
  const manejarCambioTelefono = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setTelefono(valor);
  };

  // Limitar OTP a 4 dígitos
  const manejarCambioOtp = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    setOtp(valor);
  };

  // Enviar teléfono y generar OTP
  const enviarTelefono = () => {
    if (telefono.length !== 10) {
      alert("El número debe tener exactamente 10 dígitos");
      return;
    }

    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    setCodigoGenerado(codigo);

    console.log(`Código OTP enviado a ${telefono}: ${codigo}`);
    alert(`(Simulación) Código OTP enviado: ${codigo}`);

    setPaso(2);
  };

  // Verificar OTP
  const verificarOtp = () => {
    if (otp === codigoGenerado) {
      setPaso(3);
    } else {
      alert("❌ Código OTP incorrecto");
    }
  };

  // Guardar contraseña
  const guardarPassword = () => {
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("✅ Registro completado con éxito");
    onVerificado({ telefono, password });
  };

  return (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      {/* Paso 1: Teléfono */}
      {paso === 1 && (
        <>
          <Typography variant="h6" gutterBottom>
            Digite su número de teléfono
          </Typography>
          <TextField
            value={telefono}
            onChange={manejarCambioTelefono}
            placeholder="Ej: 3101234567"
            sx={{ mb: 2, width: "250px" }}
          />
          <Box>
            <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={enviarTelefono}>
              Enviar
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancelar}>
              Cancelar
            </Button>
          </Box>
        </>
      )}

      {/* Paso 2: OTP */}
      {paso === 2 && (
        <>
          <Typography variant="h6" gutterBottom>
            Ingrese el código OTP de 4 dígitos
          </Typography>
          <TextField
            value={otp}
            onChange={manejarCambioOtp}
            placeholder="----"
            sx={{ mb: 2, width: "150px" }}
          />
          <Box>
            <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={verificarOtp}>
              Verificar
            </Button>
            <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={enviarTelefono}>
              Reenviar
            </Button>
            <Button variant="outlined" color="warning" onClick={() => setPaso(1)}>
              Corregir Número
            </Button>
          </Box>
        </>
      )}

      {/* Paso 3: Contraseña */}
      {paso === 3 && (
        <>
          <Typography variant="h6" gutterBottom>
            Crea tu contraseña
          </Typography>
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            sx={{ mb: 2, width: "250px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar contraseña"
            sx={{ mb: 2, width: "250px", display: "block", margin: "0 auto" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box>
            <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={guardarPassword}>
              Guardar
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancelar}>
              Cancelar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
