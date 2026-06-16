import { useState } from "react";
import imagemLogin from "../../assets/images/logo/Logo_SmartCuisine.png";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  MenuItem,
  Link
} from "@mui/material";

function Cadastro({mudarTela}) {
  const [tipo, setTipo] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const cadastrar = () => {
  setErro("");

  if (senha.length < 7) {
  setErro("A senha deve possuir no mínimo 7 caracteres.");
  return;
}

if (senha !== confirmarSenha) {
  setErro("As senhas não coincidem");
  return;
}

  fetch("https://abcgjl-smartcusine-backend-api.onrender.com/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome,
      email,
      senha,
      tipo
    })
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      return res.json();
    })
    .then((data) => {
  localStorage.setItem(
    `usuario_${data.email}`,
    JSON.stringify(data)
  );

  localStorage.setItem("usuario", JSON.stringify(data));

  if (data.id) {
    localStorage.setItem("usuarioId", data.id);
  }

  alert("Cadastro realizado com sucesso!");
  mudarTela("login");
})
.catch((error) => {
  console.error(error);
  setErro("Não foi possível cadastrar usuário.");
});
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
              background:
                "linear-gradient(135deg, #BFA2FF80, #AEDCFF80, #EB863A80)",
              padding: 4
            }}
          >
            <img
              src={imagemLogin}
              alt="logo"
              style={{ width: "200px" }}
            />
          </Box>

          {/* LADO DIREITO */}
          <Box
            sx={{
              flex: 1,
              padding: 5,
              backgroundColor: "#fff"
            }}
          >
            <Typography 
              variant="h3" 
              sx={{
                fontFamily: "'Glacial Indifference', sans-serif",
                fontWeight: 700, 
                mb: 2 }}
            >
              Cadastro
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>

              {/* TIPO DE PERFIL */}
              <TextField
                select
                label="Selecione um perfil"
                size="small"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                fullWidth
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
              >
                <MenuItem value="ADMIN">Administrador</MenuItem>
                <MenuItem value="GERENTE">Gerente</MenuItem>
                <MenuItem value="COZINHEIRO">Cozinheiro</MenuItem>
              </TextField>

              {/* NOME */}
              <TextField
                label="Seu nome"
                size="small"
                fullWidth
                onChange={(e) => setNome(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiUser />
                    </InputAdornment>
                  )
                }}
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
              />

              {/* EMAIL */}
              <TextField
                label="Seu email"
                size="small"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiMail />
                    </InputAdornment>
                  )
                }}
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
              />

              {/* SENHA */}
              <TextField
                label="Senha"
                type="password"
                size="small"
                fullWidth
                onChange={(e) => setSenha(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock />
                    </InputAdornment>
                  )
                }}
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
              />

              {/* CONFIRMAR SENHA */}
              <TextField
                label="Confirmar senha"
                type="password"
                size="small"
                fullWidth
                onChange={(e) => setConfirmarSenha(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock />
                    </InputAdornment>
                  )
                }}
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
              />

              {/* BOTÃO */}
              <Button
                variant="contained"
                fullWidth
                onClick={cadastrar}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  mt: 1,
                  padding: 1.2,
                  borderRadius: 2,
                  backgroundColor: "#ff7a00",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#e66a00"
                  }
                }}
              >
                Criar conta
              </Button>

              {erro && (
                <Typography color="error" align="center">
                  {erro}
                </Typography>
              )}

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography 
                  variant="body2" 
                  sx={{ color: "#666" }}>

                  Já possui uma conta?{" "}
                  <Link
                    onClick={() => mudarTela("login")}
                    sx={{
                      color: "#ff7a00",
                      fontWeight: "bold",
                      textDecoration: "none",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline"
                      }
                    }}
                  >
                    Faça Login
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

export default Cadastro;