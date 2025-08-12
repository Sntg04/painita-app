import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

function SeccionContacto() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Síguenos en nuestras redes
      </Typography>
      <Box>
        <IconButton href="#" target="_blank" aria-label="Facebook" color="primary">
          <FacebookIcon fontSize="large" />
        </IconButton>
        <IconButton href="#" target="_blank" aria-label="Instagram" color="primary">
          <InstagramIcon fontSize="large" />
        </IconButton>
        <IconButton href="#" target="_blank" aria-label="X (Twitter)" color="primary">
          <XIcon fontSize="large" />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Painita. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}

export default SeccionContacto;
