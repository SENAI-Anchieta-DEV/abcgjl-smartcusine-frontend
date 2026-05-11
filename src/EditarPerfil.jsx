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
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const salvar = async () => {

  if (senha && senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("usuarioId");

  try {

    const resposta = await fetch(
      `https://abcgjl-smartcusine-backend-api.onrender.com/usuarios/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          nome,
          senha,
          foto
        })
      }
    );

    if (!resposta.ok) {
      throw new Error("Erro ao salvar");
    }

    alert("Perfil atualizado com sucesso!");

    navigate("/dashboard");

  } catch (error) {

    alert("Erro ao atualizar perfil!");

  }
};

  return (
    <Container maxWidth="md">

      {/* TÍTULO */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Editar Perfil
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Atualize suas informações pessoais
      </Typography>

      {/* CARD PRINCIPAL */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "background.paper"
        }}
      >
        <Stack spacing={4} alignItems="center">

          {/* FOTO */}
          <Typography fontWeight="bold">
            Foto de Perfil
          </Typography>

          <Avatar
            src={preview}
            sx={{ width: 100, height: 100 }}
          />

          <Button 
            variant="outlined"
            color="primary"
            component="label"
          >
            Alterar Foto
            <input hidden type="file" onChange={handleImagem} />
            
          </Button>

          <Typography variant="body2" color="text.secondary">
            PNG, JPG ou GIF. Máx. 5MB.
          </Typography>

          {/* DIVISÃO */}
          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "divider"
            }}
          />

          {/* FORM */}
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

          {/* BOTÕES */}
          <Stack direction="row" spacing={2} width="100%" justifyContent="flex-end">
            
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: 3 }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{ borderRadius: 3,color: "#fff" }}
              onClick={salvar}
            >
              Salvar Alterações
            </Button>

          </Stack>

        </Stack>
      </Paper>
    </Container>
  );
}

export default EditarPerfil;