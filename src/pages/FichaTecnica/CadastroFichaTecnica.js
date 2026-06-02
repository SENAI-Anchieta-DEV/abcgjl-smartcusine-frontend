import { useEffect, useState } from "react";
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

import api from "../../services/api";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function CadastroFichaTecnica() {

  const navigate = useNavigate();

  const [insumosCadastrados, setInsumosCadastrados] = useState([]);
  const [popupAberto, setPopupAberto] = useState(false);

  const [insumoSelecionado, setInsumoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");

  const [nomePreparo, setNomePreparo] = useState("");
  const [tipoEquipamento, setTipoEquipamento] = useState("");
  const [temperaturaMinima, setTemperaturaMinima] = useState("");
  const [temperaturaMaxima, setTemperaturaMaxima] = useState("");

  const [insumosUtilizados, setInsumosUtilizados] = useState([]);

  useEffect(() => {
  carregarInsumos();
  }, []);

  async function carregarInsumos() {
  try {
    const response = await api.get("/insumos");
    setInsumosCadastrados(response.data);
  } catch (error) {
    console.error("Erro ao carregar insumos:", error);
  }
}

  function converterParaBase(quantidade, unidade) {
  const valor = Number(quantidade);

  if (unidade === "kg") return valor * 1000;
  if (unidade === "g") return valor;

  if (unidade === "L") return valor * 1000;
  if (unidade === "ml" || unidade === "ML") return valor;

  if (unidade === "UND") return valor;

  return valor;
}

function tiposCompativeis(unidadeEstoque, unidadeUsada) {
  const peso = ["kg", "g"];
  const volume = ["L", "ml", "ML"];

  return (
    (peso.includes(unidadeEstoque) && peso.includes(unidadeUsada)) ||
    (volume.includes(unidadeEstoque) && volume.includes(unidadeUsada))
  );
}

  function adicionarInsumo() {
  if (!insumoSelecionado || !quantidade || !unidade) {
    alert("Preencha todos os campos do insumo.");
    return;
  }

  if (!tiposCompativeis(insumoSelecionado.unidadeMedida, unidade)) {
    alert(
      `Unidade incompatível! O insumo ${insumoSelecionado.nome} está cadastrado em ${insumoSelecionado.unidadeMedida}, mas você tentou usar ${unidade}.`
    );
    return;
  }

  const estoqueConvertido = converterParaBase(
    insumoSelecionado.quantidadeEstoque,
    insumoSelecionado.unidadeMedida
  );

  const quantidadeUsadaConvertida = converterParaBase(
    quantidade,
    unidade
  );

  if (quantidadeUsadaConvertida > estoqueConvertido) {
    alert(
      `Quantidade inválida! No estoque existem apenas ${insumoSelecionado.quantidadeEstoque} ${insumoSelecionado.unidadeMedida} de ${insumoSelecionado.nome}.`
    );
    return;
  }

  const novoInsumo = {
    nome: insumoSelecionado.nome,
    idInsumo: insumoSelecionado.idInsumo,
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

  async function cadastrarFicha() {
  if (
    !nomePreparo ||
    !tipoEquipamento ||
    !temperaturaMinima ||
    !temperaturaMaxima
  ) {
    alert("Preencha todos os campos da ficha!");
    return;
  }

  const ficha = {
    id: Date.now(),
    nomePreparo,
    tipoEquipamento,
    temperaturaMinima: Number(temperaturaMinima),
    temperaturaMaxima: Number(temperaturaMaxima),
    insumosUtilizados,
    dataCriacao: new Date().toISOString().split("T")[0],
  };

  try {
    const fichasSalvas =
      JSON.parse(localStorage.getItem("fichasTecnicas")) || [];

    fichasSalvas.push(ficha);

    localStorage.setItem(
      "fichasTecnicas",
      JSON.stringify(fichasSalvas)
    );

    alert("Ficha técnica cadastrada com sucesso!");
    navigate("/produtos");
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar ficha");
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
  {insumosUtilizados.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} align="center">
        Nenhum insumo adicionado.
      </TableCell>
    </TableRow>
  ) : (
    insumosUtilizados.map((insumo, index) => (
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
    ))
  )}
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
           <MenuItem key={insumo.idInsumo} value={insumo}>
             {insumo.nome}
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
            <MenuItem value="UND">UND</MenuItem>
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