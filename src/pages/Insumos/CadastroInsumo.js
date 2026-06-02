import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


function CadastroInsumo() {
  const navigate = useNavigate();

  const [nomeInsumo, setNomeInsumo] = useState("");
  const [quantidadeInsumo, setQuantidadeInsumo] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [unidade, setUnidade] = useState("kg");
  const [carregando, setCarregando] = useState(false);

  async function cadastrarInsumo() {
    if (!nomeInsumo || !unidade || !quantidadeInsumo || !dataValidade) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      setCarregando(true);

      const novoInsumo = {
        nome: nomeInsumo.trim(),
        unidadeMedida: unidade,
        quantidadeEstoque: Number(quantidadeInsumo),
        dataValidade,
      };

      await api.post("/insumos", novoInsumo);

      alert("Insumo cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao cadastrar insumo:", error);
      console.error("Resposta do backend:", error.response?.data);
      alert("Erro ao cadastrar insumo!");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#b8ced8", p: 5 }}>

      <Button
  startIcon={
    <ArrowBackIcon
      sx={{
        fontSize: 48,
        stroke: "#7996b4",
        strokeWidth: 2.5,
      }}
    />
  }
  onClick={() => navigate("/produtos")}
  sx={{
    color: "#7996b4",
    textTransform: "none",
    fontSize: "22px",
    fontWeight: 700,
    mb: 2,
  }}
>
       Voltar
      </Button>

      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{ color: "#7996b4", mb: 5 }}
      >
        Adicionar Insumo
      </Typography>

      <Paper
        elevation={0}
        sx={{
          maxWidth: 850,
          mx: "auto",
          p: 4,
          borderRadius: 8,
          backgroundColor: "#efbc97",
          display: "flex",
          alignItems: "center",
          gap: 4,
          mb: 5,
        }}
      >
        <Box
          sx={{
            width: 110,
            height: 110,
            borderRadius: 4,
            backgroundColor: "#ff8c42",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <AddIcon sx={{ fontSize: 90 }} />
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#ff8c42" }}>
            Adicionar Insumo
          </Typography>

          <Typography fontSize={22}>
            Preencha todos os campos abaixo para cadastrar o insumo desejado
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ maxWidth: 950, mx: "auto" }}>
        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Nome do Insumo:
        </Typography>

        <TextField
          fullWidth
          value={nomeInsumo}
          onChange={(e) => setNomeInsumo(e.target.value)}
          placeholder="Insira o nome do Insumo"
          sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
        />

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Unidade do Insumo:
        </Typography>

        <RadioGroup
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          sx={{ mb: 4 }}
        >
          <FormControlLabel value="kg" control={<Radio />} label="Kg" />
          <FormControlLabel value="L" control={<Radio />} label="L" />
          <FormControlLabel value="g" control={<Radio />} label="g" />
          <FormControlLabel value="ml" control={<Radio />} label="ml" />
          <FormControlLabel value="UND" control={<Radio />} label="UND" />
        </RadioGroup>

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Quantidade de Insumo:
        </Typography>

        <TextField
          fullWidth
          value={quantidadeInsumo}
          onChange={(e) => setQuantidadeInsumo(e.target.value)}
          placeholder="Insira a quantidade de Insumo"
          type="number"
          sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
        />

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Data de validade:
        </Typography>

        <TextField
          fullWidth
          value={dataValidade}
          onChange={(e) => setDataValidade(e.target.value)}
          type="date"
          sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
        />

        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={cadastrarInsumo}
            disabled={carregando}
            sx={{
              backgroundColor: "#ff8c42",
              color: "#fff",
              px: 8,
              py: 1.5,
              borderRadius: 3,
              fontSize: 20,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f47c2d",
              },
            }}
          >
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CadastroInsumo;