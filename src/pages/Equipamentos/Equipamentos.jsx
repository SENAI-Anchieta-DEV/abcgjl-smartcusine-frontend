import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CadastroEquipamento() {
  const navigate = useNavigate();

  const [nomeEquipamento, setNomeEquipamento] = useState("");
  const [marcaModelo, setMarcaModelo] = useState("");
  const [numeroPatrimonio, setNumeroPatrimonio] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrarEquipamento() {
    if (!nomeEquipamento || !marcaModelo) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      setCarregando(true);

      const novoEquipamento = {
        nome: nomeEquipamento.trim(),
        marcaModelo: marcaModelo.trim(),
        patrimonio: numeroPatrimonio.trim(),
      };

      await api.post("/equipamentos", novoEquipamento);

      alert("Equipamento cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao cadastrar equipamento:", error);
      alert("Erro ao cadastrar equipamento!");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        backgroundColor: "#b8ced8", 
        p: { xs: 2, sm: 5 },
        boxSizing: "border-box"
      }}
    >

      <Button
        startIcon={
          <ArrowBackIcon
            sx={{
              fontSize: { xs: 28, sm: 36 },
              stroke: "#2C3E50",
              strokeWidth: 2.5,
            }}
          />
        }
        onClick={() => navigate("/produtos")}
        sx={{
          color: "#2C3E50",
          textTransform: "none",
          fontSize: { xs: "18px", sm: "22px" },
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
        sx={{ 
          color: "#2C3E50", 
          mb: { xs: 3, sm: 5 },
          fontSize: { xs: "26px", sm: "40px" } 
        }}
      >
        Adicionar Equipamento
      </Typography>

      <Paper
        elevation={0}
        sx={{
          maxWidth: 850,
          mx: "auto",
          p: { xs: 3, sm: 4 },
          borderRadius: { xs: 4, sm: 6 },
          backgroundColor: "#efbc97",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" },
          gap: { xs: 2, sm: 4 },
          mb: 5,
          boxSizing: "border-box"
        }}
      >
        <Box
          sx={{
            width: { xs: 80, sm: 110 },
            height: { xs: 80, sm: 110 },
            borderRadius: 3,
            backgroundColor: "#ff8c42",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0
          }}
        >
          <AddIcon sx={{ fontSize: { xs: 50, sm: 70 } }} />
        </Box>

        <Box>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            sx={{ 
              color: "#d35400", 
              fontSize: { xs: "22px", sm: "30px" },
              mb: 0.5
            }}
          >
            Adicionar Equipamento
          </Typography>

          <Typography sx={{ fontSize: { xs: 15, sm: 18 }, color: "#2C3E50", fontWeight: 500 }}>
            Preencha todos os campos abaixo para cadastrar o maquinário ou utensílio desejado
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ maxWidth: 750, mx: "auto" }}>
        
        <Typography 
          variant="h5" 
          sx={{ 
            color: "#2C3E50", 
            mb: 1, 
            fontWeight: 600, 
            fontSize: { xs: "16px", sm: "20px" } 
          }}>

          Nome do Equipamento:
        </Typography>

        <TextField
          fullWidth
          placeholder="Ex: Forno Industrial, Geladeira"
          value={nomeEquipamento}
          onChange={(e) => setNomeEquipamento(e.target.value)}
          slotProps={{ input: { style: { color: "#2C3E50", fontWeight: 500, borderRadius: "8px" } } }}
          sx={{ 
            backgroundColor: "#fff", borderRadius: "8px", mb: 4,
            "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } }
          }}
        />

        
        <Typography 
          variant="h5" 
          sx={{ 
            color: "#2C3E50", 
            mb: 1, 
            fontWeight: 600, 
            fontSize: { xs: "16px", sm: "20px" } 
          }}>
          Marca / Modelo:
        </Typography>

        <TextField
          fullWidth
          placeholder="Insira a marca ou o modelo"
          value={marcaModelo}
          onChange={(e) => setMarcaModelo(e.target.value)}
          slotProps={{ input: { style: { color: "#2C3E50", fontWeight: 500, borderRadius: "8px" } } }}
          sx={{ 
            backgroundColor: "#fff", borderRadius: "8px", mb: 4,
            "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } }
          }}
        />

  
        <Typography 
          variant="h5" 
          sx={{ 
            color: "#2C3E50", 
            mb: 1, 
            fontWeight: 600, 
            fontSize: { xs: "16px", sm: "20px" } 
          }}>

          Número de Patrimônio / Identificação:
        </Typography>
        
        <TextField
          fullWidth
          placeholder="Insira o número de identificação"
          value={numeroPatrimonio}
          onChange={(e) => setNumeroPatrimonio(e.target.value)}
          slotProps={{ input: { style: { color: "#2C3E50", fontWeight: 500, borderRadius: "8px" } } }}
          sx={{ 
            backgroundColor: "#fff", borderRadius: "8px", mb: 4,
            "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } }
          }}
        />


        <Box display="flex" justifyContent={{ xs: "stretch", sm: "flex-end" }} sx={{ mt: 2 }}>
          <Button
            onClick={cadastrarEquipamento}
            disabled={carregando}
            fullWidth={{ xs: true, sm: false }}
            sx={{
              backgroundColor: "#ff8c42",
              color: "#fff",
              px: { xs: 4, sm: 8 },
              py: 1.5,
              borderRadius: 2,
              fontSize: { xs: 16, sm: 18 },
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 4px 10px rgba(255,140,66,0.3)",
              "&:hover": {
                backgroundColor: "#f47c2d",
              },
            }}
          >
            {carregando ? "Cadastrando..." : "Cadastrar Equipamento"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CadastroEquipamento;