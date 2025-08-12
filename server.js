// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Helpers para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());

// CORS seguro: permite tu dominio de Render y localhost para desarrollo.
// Opcional: configura CORS_ORIGINS en Render: "https://painita.onrender.com,http://localhost:5173"
const defaultAllowedOrigins = ['https://painita.onrender.com', 'http://localhost:5173'];
const envAllowed =
  process.env.CORS_ORIGINS?.split(',').map(s => s.trim()).filter(Boolean) || [];
const allowedOrigins = envAllowed.length ? envAllowed : defaultAllowedOrigins;

app.use(
  cors({
    origin(origin, callback) {
      // Permite requests sin Origin (Postman, curl) y los orígenes en la lista
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
    credentials: true,
  })
);

// Rutas API (demo)
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

// Fallback de SPA: enviar index.html para rutas NO-API (evita capturar /auth o /api)
app.get(/^(?!\/(auth|api)\/).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Manejo básico de errores CORS y otros
app.use((err, _req, res, _next) => {
  console.error('❌ Error global:', err?.message || err);
  if (err?.message?.startsWith('Origen no permitido por CORS')) {
    return res.status(403).json({ error: 'CORS: origen no permitido' });
  }
  return res.status(500).json({ error: 'Error interno del servidor' });
});

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Painita corriendo en http://localhost:${PORT}`);
  console.log(`   CORS permitidos: ${allowedOrigins.join(', ') || '(ninguno)'}`);
});
