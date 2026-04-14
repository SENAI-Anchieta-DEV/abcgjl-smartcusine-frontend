import { useState } from "react";
import imagemLogin from "./Logo_SmartCuisine.png";
import { FiMail, FiLock } from 'react-icons/fi';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Link
} from "@mui/material";

function Login({ onLogin, mudarTela }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const autenticar = () => {
    // Limpa o erro anterior antes de tentar de novo.....
    setErro("");

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email , senha })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro na rede");
        return res.json();
      })
      .then(data => {
        if (data === true) {
          onLogin();
        } else {
          setErro("Email ou senha inválidos");
        }
      })
      .catch((err) => {
        setErro("Não foi possível conectar ao servidor.");
        console.error(err);
      });
  };

  // Permite logar apertando a tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      autenticar();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #b896ff4b, #e9e3f74b)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            borderRadius: 5,
            overflow: "hidden",
            backdropFilter: "blur(15px)",
            background: "rgba(255,255,255,0.6)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
          }}
        >
          {/* LADO ESQUERDO */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #BFA2FF80, #AEDCFF80, #EB863A80)",
                padding: 4
            }}
          >
            <img
              src={imagemLogin} // Usando o import corretamente
              alt="logo smartcuisine"
              style={{ width: "200px" }}
            />
          </Box>

          {/* LADO DIREITO */}
          <Box
            sx={{
              flex: 1,
              padding: 5,
              backgroundColor: "#ffff",
            }}
          >
            <Typography
              variant="h3"
              sx={{ 
                fontFamily: "'Glacial Indifference', sans-serif",
                fontWeight: 700, 
                marginBottom: 1 }}
            >
              Login
            </Typography>

            <Typography
              variant="body2"
              sx={{ 
                fontFamily: "'Glacial Indifference', sans-serif",
                color: "#666", 
                marginBottom: 3 }}
            >
              Bem-vindo de volta! Insira suas credenciais.
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiMail />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2
                }}
              />

              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => setSenha(e.target.value)}
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1
                }}
              >

              <FormControlLabel
                control={
                  <Checkbox 
                    size="small"
                    sx={{
                      padding: "4px" 
                    }}
                  />
                }
                label="Me lembre"
                sx={{
                  margin: 0
                }}
              />
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={autenticar}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  marginTop: 1,
                  padding: 1.2,
                  borderRadius: 2,
                  backgroundColor: "#ff7a00",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#e66a00"
                  }
                }}
              >
                Entrar
              </Button>

              {erro && (
                <Typography color="error" align="center" sx={{ mt: 1 }}>
                  {erro}
                </Typography>
              )}

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Não possui uma conta?{" "}
                  <Link
                    component="button" // Faz o Link se comportar como botão (evita refresh)
                    type="button"
                    onClick={() => mudarTela("cadastro")} 
                    sx={{
                      color: "#ff7a00",
                      fontWeight: "bold",
                      textDecoration: "none",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                      "&:hover": {
                        textDecoration: "underline"
                      }
                    }}
                  >
                    Cadastre-se
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;