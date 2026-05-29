import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogContent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CadastroFichaTecnica() {
  const [popupAberto, setPopupAberto] = useState(false);

  const [insumoSelecionado, setInsumoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");

const [nomePreparo, setNomePreparo] = useState("");
const [tipoEquipamento, setTipoEquipamento] = useState("");
const [temperaturaMinima, setTemperaturaMinima] = useState("");
const [temperaturaMaxima, setTemperaturaMaxima] = useState("");

  const [insumosUtilizados, setInsumosUtilizados] = useState([
    { nome: "Maionese Helmans", quantidade: 300, unidade: "g" },
    { nome: "Patinho moído", quantidade: 1, unidade: "kg" },
    { nome: "Cebola", quantidade: 200, unidade: "g" },
  ]);

  const insumosCadastrados = [
    "Maionese Helmans",
    "Patinho moído",
    "Cebola",
    "Tomate",
    "Arroz",
  ];

  function adicionarInsumo() {
    if (!insumoSelecionado || !quantidade || !unidade) {
      alert("Preencha todos os campos do insumo.");
      return;
    }

    const novoInsumo = {
      nome: insumoSelecionado,
      quantidade,
      unidade,
    };

    setInsumosUtilizados([...insumosUtilizados, novoInsumo]);

    setInsumoSelecionado("");
    setQuantidade("");
    setUnidade("");
    setPopupAberto(false);
  }

  function removerInsumo(index) {
    const novaLista = insumosUtilizados.filter((_, i) => i !== index);
    setInsumosUtilizados(novaLista);
  }

  function cadastrarFicha() {
  const ficha = {
    nomePreparo,
    tipoEquipamento,
    temperaturaMinima: Number(temperaturaMinima),
    temperaturaMaxima: Number(temperaturaMaxima),
    insumosUtilizados,
  };

  console.log("Ficha técnica cadastrada:", ficha);
}

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#b8ced8", p: 5 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{ color: "#7996b4", mb: 5 }}
      >
        Adicionar Ficha Técnica
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
            Adicionar Ficha Técnica
          </Typography>

          <Typography fontSize={22}>
            Preencha todos os campos abaixo para cadastrar o preparo desejado
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ maxWidth: 950, mx: "auto" }}>
        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Nome do preparo:
        </Typography>

        <TextField
  fullWidth
  placeholder="Insira o nome do preparo"
  value={nomePreparo}
  onChange={(e) => setNomePreparo(e.target.value)}
  sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
/>

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Tipo de equipamento:
        </Typography>

        <TextField
  fullWidth
  placeholder="Insira o tipo de equipamento"
  value={tipoEquipamento}
  onChange={(e) => setTipoEquipamento(e.target.value)}
  sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
/>

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Temperatura Ideal:
        </Typography>

        <Paper
  elevation={0}
  sx={{
    backgroundColor: "#efbc97",
    borderRadius: 6,
    p: 4,
    mb: 5,
  }}
>
  <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
    <TextField
      label="Mínima °C"
      type="number"
      value={temperaturaMinima}
      onChange={(e) => setTemperaturaMinima(e.target.value)}
      sx={{ backgroundColor: "#fff", borderRadius: 3, width: 180 }}
    />

    <Typography fontSize={32} fontWeight="bold">
      até
    </Typography>

    <TextField
      label="Máxima °C"
      type="number"
      value={temperaturaMaxima}
      onChange={(e) => setTemperaturaMaxima(e.target.value)}
      sx={{ backgroundColor: "#fff", borderRadius: 3, width: 180 }}
    />
  </Box>
</Paper>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 5,
            p: 3,
            mb: 5,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#7996b4" }}>
              Insumos utilizados
            </Typography>

            <Button
              onClick={() => setPopupAberto(true)}
              startIcon={<AddIcon />}
              sx={{
                border: "2px solid #ff8c42",
                color: "#ff8c42",
                borderRadius: 3,
                px: 3,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Adicionar Insumo
            </Button>
          </Box>

          <Table>
            <TableHead sx={{ backgroundColor: "#7996b4" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  INSUMO
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  QUANTIDADE
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  UNIDADE
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  AÇÕES
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {insumosUtilizados.map((insumo, index) => (
                <TableRow key={index}>
                  <TableCell>{insumo.nome}</TableCell>
                  <TableCell>{insumo.quantidade}</TableCell>
                  <TableCell>{insumo.unidade}</TableCell>
                  <TableCell>
                    <Button sx={{ minWidth: 0, color: "#7996b4" }}>
                      <EditIcon />
                    </Button>

                    <Button
                      onClick={() => removerInsumo(index)}
                      sx={{ minWidth: 0, color: "red" }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Box display="flex" justifyContent="flex-end">
          <Button
  onClick={cadastrarFicha}
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
            borderRadius: 5,
            width: 500,
            p: 2,
            boxShadow: "-14px 14px 0px #7996b4",
          },
        }}
      >
        <DialogContent>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#7996b4", mb: 3 }}>
            Adicionar Insumo
          </Typography>

          <Typography sx={{ color: "#7996b4", mb: 1 }}>
            Selecione o insumo:
          </Typography>

          <TextField
            select
            fullWidth
            value={insumoSelecionado}
            onChange={(e) => setInsumoSelecionado(e.target.value)}
            sx={{ mb: 3 }}
          >
            {insumosCadastrados.map((insumo) => (
              <MenuItem key={insumo} value={insumo}>
                {insumo}
              </MenuItem>
            ))}
          </TextField>

          <Typography sx={{ color: "#7996b4", mb: 1 }}>
            Quantidade:
          </Typography>

          <TextField
            fullWidth
            type="number"
            placeholder="Insira a quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography sx={{ color: "#7996b4", mb: 1 }}>
            Unidade:
          </Typography>

          <TextField
            select
            fullWidth
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            sx={{ mb: 4 }}
          >
            <MenuItem value="g">g</MenuItem>
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="ml">ml</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="un">un</MenuItem>
          </TextField>

          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={adicionarInsumo}
              sx={{
                backgroundColor: "#ff8c42",
                color: "#fff",
                px: 4,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Adicionar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CadastroFichaTecnica;