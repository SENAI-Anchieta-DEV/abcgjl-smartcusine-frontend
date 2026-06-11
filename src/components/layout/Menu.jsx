import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  MenuItem,
  Divider,
  Tooltip
} from "@mui/material";
import { useState } from "react";
import imagemLogin from "../../assets/images/logo/Logo_SmartCuisine.png";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add'; 
import { Menu as MenuDropdown } from "@mui/material";

function Menu({ onLogout, setTelaAtiva, toggleTema, modo }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const abrirMenu = (event) => setAnchorEl(event.currentTarget);
  const fecharMenu = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#b8ced890", 
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider", 
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
        
        {/* LOGO E TITULO */}
        <Box 
          onClick={() => setTelaAtiva("dashboard")} 
          sx={{ 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
            gap: { xs: 1, sm: 1.5 }, 
            cursor: "pointer"
          }}
        >
          <Box
            component="img"
            src={imagemLogin} 
            alt="Logo"
            sx={{
              width: { xs: 40, sm: 50 },
              height: 'auto',
              borderRadius: '4px'
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1.2rem' }, 
                lineHeight: 1.1 
              }}
            >
              SmartCuisine
            </Typography>

            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                fontSize: '0.875rem',
                display: { xs: 'none', md: 'block' } 
              }}
            >
              Bem vindo(a), administrador!
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 1.5, md: 2 }}>
          
          <Button
            startIcon={<AssessmentIcon />}
            onClick={() => setTelaAtiva("relatorio-semanal")}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' }, // Some no mobile, aparece do 'sm' para cima
              fontSize: '0.875rem',
              borderRadius: 3,
              textTransform: "none",
              backgroundColor: "#7996b4", 
              color: "#fff",
              px: 2,
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: "#94a8bd" }
            }}
          >
            Relatório Semanal
          </Button>
          
          <Tooltip title="Relatório Semanal">
            <IconButton 
              onClick={() => setTelaAtiva("relatorio-semanal")}
              sx={{ 
                display: { xs: 'inline-flex', sm: 'none' },
                backgroundColor: "#7996b4",
                color: "#fff",
                '&:hover': { backgroundColor: "#94a8bd" }
              }}
            >
              <AssessmentIcon fontSize="small" />
            </IconButton>
          </Tooltip>


          <Button
            startIcon={<AddIcon />}
            onClick={() => setTelaAtiva("produtos")}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' }, // Some no mobile
              fontSize: '0.875rem',
              borderRadius: 3,
              textTransform: "none",
              backgroundColor: "#ff8c42",
              color: "#fff",
              px: 2,
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: "#e67e3a" }
            }}
          >
            Adicionar Produto
          </Button>


          <Tooltip title="Adicionar Produto">
            <IconButton 
              onClick={() => setTelaAtiva("produtos")}
              sx={{ 
                display: { xs: 'inline-flex', sm: 'none' },
                backgroundColor: "#ff8c42",
                color: "#fff",
                '&:hover': { backgroundColor: "#e67e3a" }
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          {/* <IconButton onClick={toggleTema} color="inherit" size="small">
            {modo === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}

          <IconButton onClick={abrirMenu} sx={{ p: 0.5 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: { xs: 30, sm: 35 }, height: { xs: 30, sm: 35 } }} />
          </IconButton>

          <MenuDropdown
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={fecharMenu}
            PaperProps={{
              sx: {
                borderRadius: 3,
                mt: 1.5,
                minWidth: 240,
                boxShadow: modo === "dark" ? "0px 8px 24px rgba(0,0,0,0.5)" : "0px 8px 24px rgba(0,0,0,0.1)",
                p: 1,
                backgroundColor: "background.paper", 
              }
            }}
          >
            <Box px={2} py={1}>
              <Typography fontWeight="bold" color="text.primary">
                Amanda Marques
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Administradora
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <MenuItem
              onClick={() => {
                setTelaAtiva("perfil");
                fecharMenu();
              }}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
            >
              <EditIcon sx={{ mr: 1, fontSize: 20 }} />
              Editar perfil
            </MenuItem>

            <MenuItem
              onClick={() => {
                setTelaAtiva("usuarios");
                fecharMenu();
              }}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
            >
              <GroupsIcon sx={{ mr: 1, fontSize: 20 }} />
              Gestão de usuários
            </MenuItem>

            <MenuItem
              onClick={onLogout}
              sx={{
                borderRadius: 2,
                mx: 1,
                color: "error.main",
                '&:hover': { backgroundColor: 'error.light', color: 'white' }
              }}
            >
              <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
              Sair da conta
            </MenuItem>
          </MenuDropdown>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;