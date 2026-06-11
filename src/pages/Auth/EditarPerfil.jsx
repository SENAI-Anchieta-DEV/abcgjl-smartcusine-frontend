import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Stack
} from "@mui/material";

function EditarPerfil() {
  const navigate = useNavigate();

  const usuarioString = localStorage.getItem("usuario");
  const usuario = usuarioString ? JSON.parse(usuarioString) : null;
  const token = localStorage.getItem("token");

  const id = usuario?.id;

  const [nome, setNome] = useState(usuario?.nome || "");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  if (!usuario) {
    navigate("/login");
    return null;
  }

  const salvar = async () => {
    if (!id) {
      alert("Não foi possível identificar o usuário logado. Faça login novamente.");
      return;
    }

    if (senha && senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const body = {
        nome,
        email: usuario.email,
        tipo: usuario.tipo
      };

      if (senha.trim()) {
        body.senha = senha;
      }

      const resposta = await fetch(
        `https://abcgjl-smartcusine-backend-api.onrender.com/usuarios/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
        }
      );

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro);
      }

      const usuarioAtualizado = {
        ...usuario,
        nome,
        email: usuario.email,
        tipo: usuario.tipo
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));

      localStorage.setItem(
        `usuario_${usuario.email}`,
        JSON.stringify(usuarioAtualizado)
      );

      window.dispatchEvent(new Event("usuarioAtualizado"));

      alert("Perfil atualizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Editar Perfil
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Atualize suas informações pessoais
        </Typography>

        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "background.paper"
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Typography fontWeight="bold">Perfil</Typography>

            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: "3rem",
                fontWeight: "bold",
                bgcolor: "primary.main"
              }}
            >
              {nome?.charAt(0).toUpperCase()}
            </Avatar>

            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "divider"
              }}
            />

            <Box width="100%">
              <Typography fontWeight="bold" mb={2}>
                Informações Pessoais
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Nome Completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Nova Senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  fullWidth
                  helperText="Deixe em branco para manter a senha atual"
                />

                <TextField
                  label="Confirmar Nova Senha"
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  fullWidth
                />
              </Stack>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              width="100%"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: 3 }}
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: 3,
                  color: "#fff"
                }}
                onClick={salvar}
              >
                Salvar
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditarPerfil;