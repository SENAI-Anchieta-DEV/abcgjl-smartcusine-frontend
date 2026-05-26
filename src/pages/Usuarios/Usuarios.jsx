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
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoAlert, setTipoAlert] = useState("success");

  const [openModal, setOpenModal] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "COZINHEIRO" 
  });


  const carregarUsuarios = () => {
    const token = localStorage.getItem("token");
    fetch("https://abcgjl-smartcusine-backend-api.onrender.com/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else if (data && typeof data === "object" && data.id) {
          setUsuarios([data]); 
        } else {
          setUsuarios([]); 
        }
      })
      .catch(() => {
        setTipoAlert("error");
        setMensagem("Erro ao carregar usuários!");
        setOpenAlert(true);
        setUsuarios([]); 
      });
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNovoUsuario((prev) => ({ ...prev, [name]: value }));
  };


  const handleCadastrar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://abcgjl-smartcusine-backend-api.onrender.com/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(novoUsuario)
      });

      if (!res.ok) throw new Error();

      setTipoAlert("success");
      setMensagem("Usuário cadastrado com sucesso!");
      setOpenAlert(true);
      
      setOpenModal(false);
      setNovoUsuario({ nome: "", email: "", senha: "", tipo: "COZINHEIRO" });
      
      carregarUsuarios();
    } catch {
      setTipoAlert("error");
      setMensagem("Erro ao cadastrar usuário! Tente novamente.");
      setOpenAlert(true);
    }
  };

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
      setTipoAlert("success");
      setMensagem(`Usuário ${nome} removido!`);
      setOpenAlert(true);
    } catch {
      setTipoAlert("error");
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
        <Box display="flex" alignItems="center" gap={1} sx={{ height: '100%' }}>
          <Avatar sx={{ width: 35, height: 35, fontSize: 14 }}>
            {params.value?.charAt(0).toUpperCase()}
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
        <Box display="flex" alignItems="center" sx={{ height: '100%' }}>
          <Chip
            label={params.value || "USER"}
            color={getTipoColor(params.value)}
            sx={{ fontWeight: "bold" }}
          />
        </Box>
      )
    },
    {
      field: "acoes",
      headerName: "Ações",
      flex: 0.7,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" sx={{ height: '100%' }}>
          <IconButton
            onClick={() => handleEliminar(params.row.id, params.row.nome)}
            color="error" 
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  const usuariosFiltrados = (usuarios || []).filter((u) =>
    u.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
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
          onClick={() => setOpenModal(true)}
          sx={{ 
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            padding: { xs: '6px 12px', sm: '8px 16px' },
            minWidth: { xs: '120px', sm: '150px' },
            backgroundColor: "#7996b4", 
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
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          autoHeight
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

      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Cadastrar Novo Usuário</DialogTitle>
        
        <form onSubmit={handleCadastrar}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Nome Completo"
              name="nome"
              value={novoUsuario.nome}
              onChange={handleChangeInput}
              fullWidth
              required
            />
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={novoUsuario.email}
              onChange={handleChangeInput}
              fullWidth
              required
            />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              value={novoUsuario.senha}
              onChange={handleChangeInput}
              fullWidth
              required
            />
            <TextField
              select
              label="Tipo de Acesso"
              name="tipo"
              value={novoUsuario.tipo}
              onChange={handleChangeInput}
              fullWidth
              required
            >
              <MenuItem value="COZINHEIRO">Cozinheiro</MenuItem>
              <MenuItem value="GERENTE">Gerente</MenuItem>
              <MenuItem value="ADMIN">Administrador</MenuItem>
            </TextField>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpenModal(false)} color="inherit" sx={{ textTransform: "none" }}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#7996b4", textTransform: "none" }}>
              Salvar Usuário
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity={tipoAlert} variant="filled">
          {mensagem}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Usuarios;