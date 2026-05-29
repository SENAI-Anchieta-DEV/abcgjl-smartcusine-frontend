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
  Dialog,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CadastroInsumo() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataValidade, setDataValidade] = useState("");

  const [popupAberto, setPopupAberto] = useState(false);
  const [fichaTecnica, setFichaTecnica] = useState("");
  const [quantidadePreparo, setQuantidadePreparo] = useState("");
  const [unidadePreparo, setUnidadePreparo] = useState("");

  async function cadastrarInsumo() {
    try {
      if (!nome || !unidade || !quantidade || !dataValidade) {
        alert("Preencha todos os campos!");
        return;
      }

      await api.post("/insumos", {
        nome,
        unidadeMedida: unidade,
        quantidadeEstoque: Number(quantidade),
        dataValidade,
      });

      alert("Insumo cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao cadastrar insumo:", error);
      alert("Erro ao cadastrar insumo!");
    }
  }

  function abrirPopupFicha() {
    if (!nome || !unidade || !quantidade || !dataValidade) {
      alert("Preencha os dados do insumo antes de relacionar com uma ficha!");
      return;
    }

    setPopupAberto(true);
  }

  async function continuarComFicha() {
    try {
      if (!fichaTecnica || !quantidadePreparo || !unidadePreparo) {
        alert("Preencha os dados da ficha técnica!");
        return;
      }

      await cadastrarInsumo();

      console.log("Relacionar com ficha:", {
        fichaTecnica,
        quantidadePreparo,
        unidadePreparo,
      });
    } catch (error) {
      console.error("Erro ao relacionar ficha:", error);
      alert("Erro ao relacionar ficha!");
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#b8ced8", p: 5 }}>
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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
          <FormControlLabel value="kg" control={<Radio />} label="Quilograma" />
          <FormControlLabel value="mg" control={<Radio />} label="Miligrama" />
        </RadioGroup>

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Quantidade de Insumo:
        </Typography>

        <TextField
          fullWidth
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
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

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#efbc97",
            borderRadius: 6,
            p: 3,
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography variant="h5" color="#fff" mb={3}>
            Esse insumo vai para algum preparo específico?
          </Typography>

          <Box display="flex" justifyContent="center" gap={20}>
            <Button
              onClick={cadastrarInsumo}
              sx={{
                backgroundColor: "#ff2d2d",
                color: "#fff",
                px: 5,
                textTransform: "none",
              }}
            >
              Não
            </Button>

            <Button
              onClick={abrirPopupFicha}
              sx={{
                backgroundColor: "#ff8c42",
                color: "#fff",
                px: 5,
                textTransform: "none",
              }}
            >
              Sim
            </Button>
          </Box>
        </Paper>

        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={cadastrarInsumo}
            sx={{
              backgroundColor: "#ff8c42",
              color: "#fff",
              px: 8,
              py: 1.5,
              borderRadius: 3,
              fontSize: 20,
              textTransform: "none",
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>

      <Dialog
        open={popupAberto}
        onClose={() => setPopupAberto(false)}
        PaperProps={{
          sx: {
            borderRadius: 8,
            width: 560,
            p: 2,
            boxShadow: "-14px 14px 0px #7996b4",
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" sx={{ color: "#7996b4", mb: 1 }}>
            Ficha Técnica:
          </Typography>

          <TextField
            fullWidth
            value={fichaTecnica}
            onChange={(e) => setFichaTecnica(e.target.value)}
            placeholder="Insira o nome da ficha técnica"
            size="small"
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ color: "#7996b4", mb: 1 }}>
            Quantidade utilizada:
          </Typography>

          <TextField
            fullWidth
            value={quantidadePreparo}
            onChange={(e) => setQuantidadePreparo(e.target.value)}
            placeholder="Insira a quantidade necessária para o preparo"
            size="small"
            type="number"
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ color: "#7996b4", mb: 1 }}>
            Unidade da quantidade:
          </Typography>

          <RadioGroup
            value={unidadePreparo}
            onChange={(e) => setUnidadePreparo(e.target.value)}
            row
            sx={{ mb: 4 }}
          >
            <FormControlLabel value="kg" control={<Radio />} label="Kg" />
            <FormControlLabel value="g" control={<Radio />} label="g" />
            <FormControlLabel value="L" control={<Radio />} label="L" />
            <FormControlLabel value="ml" control={<Radio />} label="ml" />
          </RadioGroup>

          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={continuarComFicha}
              sx={{
                backgroundColor: "#7996b4",
                color: "#fff",
                textTransform: "none",
                px: 4,
              }}
            >
              Continuar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CadastroInsumo;