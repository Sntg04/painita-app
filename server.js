// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Helpers __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());

// CORS: en producción suele ser same-origin; permite todos por simplicidad.
// Puedes restringir con CORS_ORIGINS="https://tu-frontend.com,https://otro.com"
const allowed =
  (process.env.CORS_ORIGINS && process.env.CORS_ORIGINS.split(',').map(s => s.trim())) || true;
app.use(cors({ origin: allowed, credentials: true }));

// Rutas API (ejemplos simulados)
app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/auth/otp/send', (req, res) => {
  const { telefono } = req.body || {};
  if (!telefono) return res.status(400).json({ error: 'Teléfono requerido' });
  console.log(`🔐 Enviando OTP simulado a ${telefono}`);
  return res.json({ ok: true, mensaje: 'OTP enviado correctamente (simulado)' });
});

app.post('/auth/register', (req, res) => {
  const { telefono, otp, password } = req.body || {};
  if (!telefono || !otp || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  console.log(`✅ Registrando usuario ${telefono} con contraseña segura`);
  return res.json({ ok: true, token: 'TOKEN_EJEMPLO', userId: '12345' });
});

// Servir frontend compilado (Vite → dist)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback de SPA: enviar index.html para rutas NO API
app.get(/^(?!\/(auth|api)\/).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Painita corriendo en http://localhost:${PORT}`);
});
