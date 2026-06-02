import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogContent,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function Produtos() {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("insumos");

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  function continuar() {
    if (tipoSelecionado === "insumo") {
      navigate("/insumos/novo");
    } else if (tipoSelecionado === "equipamento") {
      navigate("/equipamentos/novo");
    } else if (tipoSelecionado === "ficha") {
      navigate("/fichas-tecnicas/novo");
    }
  }

  function abrirEditar(item) {
    setProdutoEditando(item);
    setModalEditarAberto(true);
  }

  function salvarEdicao() {
    console.log("Produto editado:", produtoEditando);
    setModalEditarAberto(false);
  }

  useEffect(() => {
  carregarDados();
}, []);

async function carregarDados() {
  try {
    const response = await api.get("/insumos");

    const equipamentosSalvos =
      JSON.parse(localStorage.getItem("equipamentos")) || [];

    setDados({
      insumos: response.data,
      equipamentos: equipamentosSalvos,
      fichas: [],
    });
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

  const [dados, setDados] = useState({
  insumos: [],
  equipamentos: [],
  fichas: [],
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#b8ced8",
        p: 5,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{
          color: "#7996b4",
          mb: 5,
        }}
      >
        Adicionar Produto
      </Typography>

      <Button
        onClick={() => setModalAberto(true)}
        fullWidth
        sx={{
          maxWidth: 900,
          mx: "auto",
          mb: 4,
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          borderRadius: 10,
          backgroundColor: "#fff",
          color: "#8b8b8b",
          fontSize: 22,
          textTransform: "none",
          px: 3,
          py: 1.5,
        }}
      >
        <AddCircleIcon
          sx={{
            color: "#ff8c42",
            fontSize: 50,
          }}
        />
        Cadastrar um produto
      </Button>

      <Paper
        elevation={0}
        sx={{
          maxWidth: 520,
          mx: "auto",
          mb: 6,
          borderRadius: 10,
          display: "flex",
          justifyContent: "space-around",
          py: 1.5,
        }}
      >
        <Box
          textAlign="center"
          onClick={() => setAbaAtiva("insumos")}
          sx={{ cursor: "pointer" }}
        >
          <Typography fontWeight="bold" fontSize={24}>
            {dados.insumos.length}
          </Typography>

          <Typography
            sx={{
              borderBottom:
                abaAtiva === "insumos" ? "3px solid black" : "none",
            }}
          >
            Insumos
          </Typography>
        </Box>

        <Box
          textAlign="center"
          onClick={() => setAbaAtiva("equipamentos")}
          sx={{ cursor: "pointer" }}
        >
          <Typography fontWeight="bold" fontSize={24}>
            {dados.equipamentos.length}
          </Typography>

          <Typography
            sx={{
              borderBottom:
                abaAtiva === "equipamentos" ? "3px solid black" : "none",
            }}
          >
            Equipamentos
          </Typography>
        </Box>

        <Box
          textAlign="center"
          onClick={() => setAbaAtiva("fichas")}
          sx={{ cursor: "pointer" }}
        >
          <Typography fontWeight="bold" fontSize={24}>
            {dados.fichas.length}
          </Typography>

          <Typography
            sx={{
              borderBottom:
                abaAtiva === "fichas" ? "3px solid black" : "none",
            }}
          >
            Fichas
          </Typography>
        </Box>
      </Paper>

      {dados[abaAtiva]?.map((item, index) => (
        <ProdutoCard
          key={item.idInsumo || index}
          nome={item.nome}
          categoria={item.unidadeMedida || item.categoria}
          data={
            item.tempMin !== undefined
              ? `${item.tempMin}°C até ${item.tempMax}°C`
              : item.dataValidade || item.data
          }
          isEquipamento={item.tempMin !== undefined}
          onEditar={() => abrirEditar(item)}
        />
      ))}

      <Dialog
        open={modalAberto}
        onClose={() => setModalAberto(false)}
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
          <Typography
            variant="h6"
            sx={{
              color: "#7996b4",
              mb: 2,
            }}
          >
            Que tipo de produto você pretende cadastrar?
          </Typography>

          <RadioGroup
            value={tipoSelecionado}
            onChange={(e) => setTipoSelecionado(e.target.value)}
          >
            <FormControlLabel
              value="insumo"
              control={<Radio />}
              label="Insumo"
            />

            <FormControlLabel
              value="equipamento"
              control={<Radio />}
              label="Equipamento"
            />

            <FormControlLabel
              value="ficha"
              control={<Radio />}
              label="Ficha"
            />
          </RadioGroup>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={continuar}
              disabled={!tipoSelecionado}
              sx={{
                backgroundColor: "#7996b4",
                color: "#fff",
                textTransform: "none",
                px: 4,
                "&:hover": {
                  backgroundColor: "#6f8aa5",
                },
              }}
            >
              Continuar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalEditarAberto}
        onClose={() => setModalEditarAberto(false)}
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
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "#7996b4",
              mb: 3,
            }}
          >
            Editar Produto
          </Typography>

          <TextField
            fullWidth
            label="Nome"
            value={produtoEditando?.nome || ""}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                nome: e.target.value,
              })
            }
            sx={{ mb: 3 }}
          />

          

          <TextField
            fullWidth
            label="Categoria"
            value={produtoEditando?.categoria || ""}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                categoria: e.target.value,
              })
            }
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Data"
            value={produtoEditando?.data || ""}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                data: e.target.value,
              })
            }
            sx={{ mb: 4 }}
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setModalEditarAberto(false)}>
              Cancelar
            </Button>

            <Button
              onClick={salvarEdicao}
              sx={{
                backgroundColor: "#ff8c42",
                color: "#fff",
                px: 4,
                textTransform: "none",
              }}
            >
              Salvar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function ProdutoCard({ nome, categoria, data, isEquipamento, onEditar}) {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 800,
        mx: "auto",
        mb: 5,
        borderRadius: 8,
        p: 4,
        boxShadow: "-18px 18px 0px #7996b4",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#7996b4",
        }}
      >
        {nome}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {categoria}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={1} alignItems="center">
          {isEquipamento ? (
            <DeviceThermostatIcon fontSize="small" color="disabled" />
          ) : (
            <CalendarTodayIcon fontSize="small" color="disabled" />
          )}

          <Typography color="text.secondary">{data}</Typography>
        </Box>

        <Button
          onClick={onEditar}
          sx={{
            backgroundColor: "#7996b4",
            color: "#fff",
            px: 4,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Editar
        </Button>
      </Box>
    </Paper>
  );
}

export default Produtos;