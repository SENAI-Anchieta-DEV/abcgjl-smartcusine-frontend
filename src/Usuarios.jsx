import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Box,
  Button,
  Chip
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";

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
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(() => {
        setMensagem("Erro ao carregar usuários!");
        setOpenAlert(true);
      });
  }, []);

  const handleEliminar = async (id, nome) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      `https://abcgjl-smartcusine-backend-api.onrender.com/usuarios/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) throw new Error();

    setUsuarios((prev) => prev.filter((u) => u.id !== id));

    setMensagem(`Usuário ${nome} removido!`);
    setOpenAlert(true);
  } catch {
    setMensagem("Erro ao excluir usuário!");
    setOpenAlert(true);
  }

};

  const getTipoColor = (tipo) => {
    if (tipo === "ADMIN") return "primary";
    if (tipo === "GERENTE") return "warning";

    return "default";
  };

  const colunas = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "nome",
      headerName: "Nome",
      flex: 2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          
          <Avatar
            sx={{
              width: 35,
              height: 35,
              fontSize: 14
            }}
          >
            {params.value?.charAt(0)}
          </Avatar>

          {params.value}
        </Box>
      )
    },

    { field: "email", headerName: "Email", flex: 2 },

    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getTipoColor(params.value)}
          sx={{ fontWeight: "bold" }}
        />
      )
    },

    {
      field: "acoes",
      headerName: "Ações",
      flex: 0.7,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEliminar(params.row.id, params.row.nome)}
          color="error" 
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestão de Usuários
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Gerencie os usuários do sistema.
        </Typography>

        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            display: "flex",
            gap: 2,
            backgroundColor: "background.paper"
          }}
        >
          <TextField
            fullWidth
            placeholder="Pesquisar usuário..."
            onChange={(e) => setBusca(e.target.value)}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              padding: { xs: '6px 12px', sm: '8px 16px' },
              minWidth: { xs: '120px', sm: '150px' },
              whiteSpace: 'nowrap',
              borderRadius: 3, 
              textTransform: "none" 
            }}
          >
            Novo Usuário
          </Button>
        </Paper>

       
        <Paper sx={{ borderRadius: 4, overflow: "hidden" }}>
          <DataGrid
            rows={usuariosFiltrados}
            columns={colunas}
            pageSizeOptions={[5]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              backgroundColor: "background.paper",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "background.default"
              },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: "action.hover"
              }
            }}
          />
        </Paper>

        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={() => setOpenAlert(false)}
        >
          <Alert severity="success" variant="filled">
            {mensagem}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Usuarios;