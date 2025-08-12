// src/paginas/PaginaLogin.jsx
import React from 'react';
import { Container, Box, Paper, Typography, TextField, Button, Avatar, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function PaginaLogin() {
  return (
    // Container centra el contenido horizontalmente y le da un ancho máximo
    <Container component="main" maxWidth="xs">
      {/* Paper es el "papel" o tarjeta blanca que contiene el formulario */}
      <Paper 
        elevation={6} 
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        {/* Avatar muestra el ícono de candado */}
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>

        {/* Box actúa como el formulario */}
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained" // El estilo "contained" usa el color primario de fondo
            sx={{ mt: 3, mb: 2, py: 1.5 }} // py es padding vertical
          >
            Ingresar a Painita
          </Button>
          
          {/* Grid para los enlaces de "olvidé contraseña" y "registrarse" */}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"¿No tienes una cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default PaginaLogin;
