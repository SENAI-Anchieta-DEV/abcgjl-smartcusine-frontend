import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Snackbar,
  Alert,
  IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://abcgjl-smartcusine-backend-api.onrender.com/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar usuários");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch(() => {
        setMensagem("Erro ao carregar usuários da API!");
        setOpenAlert(true);
      });
  }, []);

  const handleEliminar = (nome) => {
    setMensagem(`Usuário ${nome} removido com sucesso!`);
    setOpenAlert(true);
  };

  const colunas = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "nome", headerName: "Nome", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "tipo", headerName: "Tipo", flex: 1 },
    {
      field: "acoes",
      headerName: "Ações",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleEliminar(params.row.nome)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Gestão de Usuários
      </Typography>

      <TextField
        fullWidth
        label="Pesquisar usuário..."
        variant="outlined"
        sx={{ mb: 3 }}
        onChange={(e) => setBusca(e.target.value)}
      />

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={usuariosFiltrados}
          columns={colunas}
          pageSizeOptions={[5]}
          getRowId={(row) => row.id}
        />
      </Paper>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {mensagem}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Usuarios;