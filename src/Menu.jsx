import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// Ícones para representar o sol (light) e a lua (dark)
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Menu({ onLogout, setTelaAtiva, toggleTema, modo }) {
return (
<AppBar position="static">
<Toolbar>
{/* flexGrow: 1 faz o título ocupar o máximo de espaço, empurrando os botões para o fim */}
<Typography variant="h6" sx={{ flexGrow: 1 }}>
Sistema Académico
</Typography>

{/* IconButton: Botão circular para o ícone de trocar tema */}
<IconButton onClick={toggleTema} color="inherit" sx={{ mr: 2 }}>
{modo === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
</IconButton>

{/* onClick altera o estado 'telaAtiva' que está no App.js */}
<Button color="inherit" onClick={() => setTelaAtiva("dashboard")}>Dashboard</Button>
<Button color="inherit" onClick={() => setTelaAtiva("usuarios")}>usuários</Button>

<Button
color="inherit"
onClick={onLogout}
sx={{ ml: 2, border: '1px solid white' }}
>
Sair
</Button>

</Toolbar>
</AppBar>
);
}
export default Menu;