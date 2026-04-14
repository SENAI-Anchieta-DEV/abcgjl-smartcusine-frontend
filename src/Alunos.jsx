import { useEffect, useState } from "react";
import { Container, Typography, Paper, TextField, Snackbar, Alert, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';

function Alunos() {
const [alunos, setAlunos] = useState([]);
const [busca, setBusca] = useState("");
// Estados para gerir o Alerta (Feedback visual)
const [openAlert, setOpenAlert] = useState(false); // Controla se o alerta está visível
const [mensagem, setMensagem] = useState(""); // Texto do alerta
// useEffect: Executa a busca na API assim que o componente é montado
useEffect(() => {
fetch("http://localhost:8080/api/alunos")
.then((res) => res.json())
.then((data) => setAlunos(data))
.catch(() => {
setMensagem("Erro ao carregar dados da API!");
setOpenAlert(true);
});
}, []);
// Função para simular a exclusão de um registro
const handleEliminar = (nome) => {
setMensagem(`Aluno ${nome} removido com sucesso!`);
setOpenAlert(true);
};
const colunas = [
{ field: "matricula", headerName: "ID", flex: 0.5 },
{ field: "nome", headerName: "Nome do Aluno", flex: 2 },
{ field: "curso", headerName: "Curso", flex: 1 },
{
field: "acoes",
headerName: "Ações",
flex: 0.5,
// renderCell permite colocar componentes (como botões) dentro da célula da tabela
renderCell: (params) => (
<IconButton color="error" onClick={() => handleEliminar(params.row.nome)}>
<DeleteIcon />
</IconButton>
)
}
];
// Lógica de filtro: filtra o array original baseado no que foi digitado

const alunosFiltrados = alunos.filter(a =>
a.nome.toLowerCase().includes(busca.toLowerCase())
);
return (
<Container>
<Typography variant="h4" sx={{ my: 3 }}>Gestão de Alunos</Typography>
<TextField
fullWidth
label="Pesquisar aluno..."
variant="outlined"
sx={{ mb: 3 }}
onChange={(e) => setBusca(e.target.value)}
/>
{/* Paper dá o efeito de "cartão elevado" com sombra à tabela */}
<Paper sx={{ height: 400, width: '100%' }}>
<DataGrid
rows={alunosFiltrados}
columns={colunas}
pageSize={5}
getRowId={(row) => row.matricula}
/>
</Paper>
{/* Snackbar: O componente de notificação que "flutua" na tela */}
<Snackbar
open={openAlert}
autoHideDuration={3000} // Fecha sozinho após 3 segundos
onClose={() => setOpenAlert(false)}
anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
{/* Alert define a cor (severity) e o estilo do alerta */}
<Alert severity="success" variant="filled" sx={{ width: '100%' }}>
{mensagem}
</Alert>
</Snackbar>
</Container>
);
}
export default Alunos;