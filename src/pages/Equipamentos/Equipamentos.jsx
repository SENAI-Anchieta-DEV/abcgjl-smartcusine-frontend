import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeviceThermostatRoundedIcon from "@mui/icons-material/DeviceThermostatRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Equipamentos() {
  const navigate = useNavigate();
  const [equipamento, setEquipamento] = useState("");

  const equipamentos = {
    freezer: {
      nome: "Freezer",
      categoria: "Refrigeração",
      tempMin: -25,
      tempMax: -18,
    },
    camara_fria: {
      nome: "Câmara fria",
      categoria: "Refrigeração",
      tempMin: 0,
      tempMax: 5,
    },
    forno_combinado: {
      nome: "Forno combinado",
      categoria: "Aquecimento",
      tempMin: 80,
      tempMax: 250,
    },
    fogao_industrial: {
      nome: "Fogão industrial",
      categoria: "Aquecimento",
      tempMin: 100,
      tempMax: 300,
    },
  };

  function cadastrarEquipamento() {
    if (!equipamento) {
      alert("Selecione um equipamento!");
      return;
    }

    const selecionado = equipamentos[equipamento];

    const novoEquipamento = {
      id: Date.now(),
      nome: selecionado.nome,
      categoria: selecionado.categoria,
      tempMin: selecionado.tempMin,
      tempMax: selecionado.tempMax,
      dataCriacao: new Date().toISOString().split("T")[0],
    };

    const equipamentosSalvos =
      JSON.parse(localStorage.getItem("equipamentos")) || [];

    const equipamentoExiste = equipamentosSalvos.some(
      (item) => item.nome.toLowerCase() === novoEquipamento.nome.toLowerCase()
    );

    if (equipamentoExiste) {
      alert("Esse equipamento já foi cadastrado!");
      return;
    }

    equipamentosSalvos.push(novoEquipamento);

    localStorage.setItem(
      "equipamentos",
      JSON.stringify(equipamentosSalvos)
    );

    alert("Equipamento cadastrado com sucesso!");
    navigate("/produtos");
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
        Adicionar Equipamento
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
          <AddRoundedIcon sx={{ fontSize: 90 }} />
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#ff8c42" }}>
            Adicionar Equipamento
          </Typography>

          <Typography fontSize={22}>
            Selecione o equipamento que deseja cadastrar
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ maxWidth: 950, mx: "auto" }}>
        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Equipamento:
        </Typography>

        <TextField
          select
          fullWidth
          value={equipamento}
          onChange={(e) => setEquipamento(e.target.value)}
          placeholder="Selecione o equipamento"
          sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
        >
          <MenuItem value="freezer">Freezer</MenuItem>
          <MenuItem value="camara_fria">Câmara fria</MenuItem>
          <MenuItem value="forno_combinado">Forno combinado</MenuItem>
          <MenuItem value="fogao_industrial">Fogão industrial</MenuItem>
        </TextField>

        {equipamento && (
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 5,
              p: 3,
              mb: 5,
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <DeviceThermostatRoundedIcon sx={{ color: "#7996b4", fontSize: 40 }} />

              <Box>
                <Typography sx={{ color: "#666", fontWeight: "bold" }}>
                  Categoria: {equipamentos[equipamento].categoria}
                </Typography>

                <Typography sx={{ color: "#666" }}>
                  Temperatura ideal: {equipamentos[equipamento].tempMin}°C até{" "}
                  {equipamentos[equipamento].tempMax}°C
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}

        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={cadastrarEquipamento}
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
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Equipamentos;