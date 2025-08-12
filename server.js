// server.js
import express from 'express';
import cors from 'cors';

const app = express();

// 🛡️ Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // permite peticiones desde tu frontend Vite

// 📲 Ruta para envío de OTP (simulado)
app.post('/auth/otp/send', (req, res) => {
  const { telefono } = req.body;
  if (!telefono) return res.status(400).json({ error: 'Teléfono requerido' });
  console.log(`🔐 Enviando OTP simulado a ${telefono}`);
  return res.json({ ok: true, mensaje: 'OTP enviado correctamente (simulado)' });
});

// 🔐 Ruta para registrar usuario (simulado)
app.post('/auth/register', (req, res) => {
  const { telefono, otp, password } = req.body;
  if (!telefono || !otp || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  console.log(`✅ Registrando usuario ${telefono} con contraseña segura`);
  return res.json({ ok: true, token: 'TOKEN_EJEMPLO', userId: '12345' });
});

// 🚀 Activamos el backend
app.listen(3001, () => {
  console.log('✅ Backend corriendo en http://localhost:3001');
});
