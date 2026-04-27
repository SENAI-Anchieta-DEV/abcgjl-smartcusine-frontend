import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";

function Dashboard() {

return (
<Container sx={{ mt: 4 }}>
<Typography variant="h4" gutterBottom>
Dashboard do Sistema
</Typography>

<Grid container spacing={3}>

<Grid item xs={12} md={4}>
<Card>

<CardContent>
<SchoolIcon fontSize="large" />
{/* Título do card */}
<Typography variant="h6">
Alunos
</Typography>
{/* Descrição do card */}
<Typography>
Gerenciar usuários cadastrados
</Typography>
</CardContent>
</Card>
</Grid>

{/* Segundo card do sistema */}
<Grid item xs={12} md={4}>
<Card>

<CardContent>
{/* Ícone representando cursos */}
<MenuBookIcon fontSize="large" />
<Typography variant="h6">
Cursos
</Typography>
<Typography>
Gerenciar cursos
</Typography>
</CardContent>
</Card>
</Grid>

{/* Terceiro card */}
<Grid item xs={12} md={4}>
<Card>
<CardContent>
{/* Ícone representando professores */}
<PeopleIcon fontSize="large" />
<Typography variant="h6">
Professores
</Typography>
<Typography>
Gerenciar professores
</Typography>
</CardContent>
</Card>
</Grid>

</Grid>
</Container>
);
}
export default Dashboard;