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

    if (Number(quantidadeInsumo) <= 0) {
      alert("A quantidade deve ser maior que zero!");
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

      const response = await api.get("/insumos");

      const insumoExiste = response.data.some(
        (insumo) =>
          insumo.nome.toLowerCase().trim() === nomeInsumo.toLowerCase().trim()
      );

      if (insumoExiste) {
        alert("Já existe um insumo com esse nome!");
        return;
      }

      await api.post("/insumos", novoInsumo);

      alert("Insumo cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao cadastrar insumo:", error);
      alert("Erro ao cadastrar insumo!");
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
          fontSize: { xs: "28px", sm: "40px" } 
        }}
      >
        Adicionar Insumo
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
            Adicionar Insumo
          </Typography>

          <Typography sx={{ fontSize: { xs: 15, sm: 18 }, color: "#2C3E50", fontWeight: 500 }}>
            Preencha todos os campos abaixo para cadastrar o insumo desejado
          </Typography>
        </Box>
      </Paper>

      
      <Box sx={{ maxWidth: 750, mx: "auto", px: { xs: 0.5, sm: 0 } }}>
        
        <Typography variant="h5" sx={{ color: "#2C3E50", mb: 1, fontWeight: 600, fontSize: { xs: "16px", sm: "20px" } }}>
          Nome do Insumo:
        </Typography>
        <TextField
          fullWidth
          value={nomeInsumo}
          onChange={(e) => setNomeInsumo(e.target.value)}
          placeholder="Insira o nome do Insumo"
          slotProps={{
            input: {
              style: { color: "#2C3E50", fontWeight: 500, borderRadius: "8px" }
            }
          }}
          sx={{ 
            backgroundColor: "#fff", 
            borderRadius: "8px", 
            mb: 4,
            "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } } 
          }}
        />

        
        <Typography variant="h5" sx={{ color: "#2C3E50", mb: 1, fontWeight: 600, fontSize: { xs: "16px", sm: "20px" } }}>
          Unidade do Insumo:
        </Typography>
        <RadioGroup
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          row
          sx={{ mb: 4, gap: { xs: 1, sm: 3 }, color: "#2C3E50" }}
        >
          <FormControlLabel value="kg" control={<Radio sx={{ color: "#2C3E50" }} />} label="Kg" />
          <FormControlLabel value="L" control={<Radio sx={{ color: "#2C3E50" }} />} label="L" />
          <FormControlLabel value="g" control={<Radio sx={{ color: "#2C3E50" }} />} label="g" />
          <FormControlLabel value="ml" control={<Radio sx={{ color: "#2C3E50" }} />} label="ml" />
          <FormControlLabel value="UND" control={<Radio sx={{ color: "#2C3E50" }} />} label="UND" />
        </RadioGroup>

        
        <Typography variant="h5" sx={{ color: "#2C3E50", mb: 1, fontWeight: 600, fontSize: { xs: "16px", sm: "20px" } }}>
          Quantidade de Insumo:
        </Typography>
        <TextField
          fullWidth
          value={quantidadeInsumo}
          onChange={(e) => setQuantidadeInsumo(e.target.value)}
          placeholder="Insira a quantidade de Insumo"
          type="number"
          slotProps={{
            input: {
              style: { color: "#2C3E50", fontWeight: 500, borderRadius: "8px" }
            }
          }}
          sx={{ 
            backgroundColor: "#fff", 
            borderRadius: "8px", 
            mb: 4,
            "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } }
          }}
        />

        
        <Typography variant="h5" sx={{ color: "#2C3E50", mb: 1, fontWeight: 600, fontSize: { xs: "16px", sm: "20px" } }}>
          Data de validade:
        </Typography>
        <TextField
          fullWidth
          value={dataValidade}
          onChange={(e) => setDataValidade(e.target.value)}
          type="date"
          slotProps={{
            input: {
              style: { color: "#2C3E50", fontWeight: 500, borderRadius: "8px" }
            }
          }}
          sx={{ 
            backgroundColor: "#fff", 
            borderRadius: "8px", 
            mb: 4,
            "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } }
          }}
        />

        
        <Box display="flex" justifyContent={{ xs: "stretch", sm: "flex-end" }} sx={{ mt: 2 }}>
          <Button
            onClick={cadastrarInsumo}
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
            {carregando ? "Cadastrando..." : "Cadastrar Insumo"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CadastroInsumo;