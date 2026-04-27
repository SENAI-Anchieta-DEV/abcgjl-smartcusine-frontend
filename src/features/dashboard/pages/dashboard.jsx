// Importação dos componentes visuais do Material UI
// Esses componentes substituem divs e estilos CSS tradicionais
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
// Importação de ícones da biblioteca Material Icons
// Cada ícone representa visualmente uma área do sistema
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
// Componente funcional do React chamado Dashboard
// Ele representa a tela inicial do sistema após o login
function Dashboard() {

return (
// Container centraliza o conteúdo na tela
// sx é utilizado para aplicar estilos diretamente
// mt:4 significa margin-top = 4 (espaçamento superior)
<Container sx={{ mt: 4 }}>
{/* Typography cria um título padronizado */}
{/* variant="h4" define tamanho grande do título */}
{/* gutterBottom adiciona espaço abaixo do título */}
<Typography variant="h4" gutterBottom>
Dashboard do Sistema
</Typography>

{/* Grid é utilizado para criar layout responsivo */}
{/* container indica que é o container principal */}
{/* spacing define o espaçamento entre os elementos */}
<Grid container spacing={3}>

{/* Grid item representa um elemento dentro do layout */}
{/* xs=12 significa ocupar toda a largura no celular */}
{/* md=4 significa ocupar 4 colunas no desktop */}
<Grid item xs={12} md={4}>
{/* Card cria um bloco visual com sombra */}
<Card>
{/* CardContent organiza o conteúdo interno do card */}
<CardContent>
{/* Ícone representando alunos */}
{/* fontSize="large" define tamanho maior */}
<SchoolIcon fontSize="large" />
{/* Título do card */}
<Typography variant="h6">
Alunos
</Typography>
{/* Descrição do card */}
<Typography>
Gerenciar alunos cadastrados
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
// Exporta o componente para ser utilizado em outros arquivos
export default Dashboard;