import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function ListaRelatorios({ setTelaAtiva }) {
  const [busca, setBusca] = useState("");

  const [relatorios, setRelatorios] = useState(() => {
    const salvos = localStorage.getItem("relatoriosSemanais");
    return salvos ? JSON.parse(salvos) : [];
  });

  const excluirRelatorio = (id) => {
    const novaLista = relatorios.filter((relatorio) => relatorio.id !== id);
    setRelatorios(novaLista);
    localStorage.setItem("relatoriosSemanais", JSON.stringify(novaLista));
  };

  const editarRelatorio = (relatorio) => {
    localStorage.setItem("relatorioEditando", JSON.stringify(relatorio));
    setTelaAtiva("relatorio-semanal");
  };

  const relatoriosFiltrados = relatorios.filter((relatorio) =>
    relatorio.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#b8ccdd",
        px: 4,
        py: 5
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ color: "#7996b4", mb: 5 }}
      >
        Relatório
      </Typography>

      <TextField
        placeholder="Busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        fullWidth
        sx={{
          maxWidth: 650,
          display: "block",
          mx: "auto",
          mb: 5,
          backgroundColor: "#fff",
          borderRadius: 8,
          "& fieldset": { border: "none" }
        }}
      />
    <Box
      display="flex"
      justifyContent="center"
      mb={4}
        >
        <Button
            variant="contained"
            onClick={() => setTelaAtiva("relatorio-semanal")}
            sx={{
            backgroundColor: "#ff8c42",
            color: "#fff",
            borderRadius: 3,
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
                backgroundColor: "#e67e3a"
            }
            }}
        >
            + Criar Relatório
        </Button>
    </Box>

      <Stack spacing={4} alignItems="center">
        {relatoriosFiltrados.map((relatorio) => (
          <Paper
            key={relatorio.id}
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 650,
              borderRadius: 6,
              p: 3,
              borderLeft: "8px solid #ff8c42",
              backgroundColor: "#fff"
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#7996b4", mb: 2 }}
            >
              {relatorio.nome}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <CalendarMonthIcon sx={{ fontSize: 18, color: "#999" }} />
              <Typography variant="body2" color="text.secondary">
                {relatorio.data}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => excluirRelatorio(relatorio.id)}
              >
                Excluir
              </Button>

              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: "#d9d9d9",
                  color: "#333",
                  "&:hover": { backgroundColor: "#c7c7c7" }
                }}
                startIcon={<EditIcon />}
                onClick={() => editarRelatorio(relatorio)}
              >
                Editar
              </Button>
            </Box>
          </Paper>
        ))}

        {relatoriosFiltrados.length === 0 && (
          <Typography color="text.secondary">
            Nenhum relatório encontrado.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default ListaRelatorios;