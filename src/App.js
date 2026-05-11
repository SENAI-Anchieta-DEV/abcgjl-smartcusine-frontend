import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Importações das tuas telas originais (intactas!)
import TelaDeBoasVindas from "./TelaDeBoasVindas";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Menu from "./Menu";
import Dashboard from "./dashboard";
import Usuarios from "./Usuarios";
import EditarPerfil from "./EditarPerfil";

function AppContent() {
  const navigate = useNavigate(); // Hook poderoso que muda as rotas
  const [logado, setLogado] = useState(false);
  const [modo, setModo] = useState("light");

  const theme = useMemo(() => createTheme({
      palette: {
          mode: modo,
          primary: { main: '#1976d2' },
      },
  }), [modo]);

  const toggleTema = () => {
      setModo((prev) => (prev === "light" ? "dark" : "light"));
  };

  const irParaBoasVindas = () => navigate("/teladeboasvindas");
  const irParaLogin = () => navigate("/login");
  const irParaCadastro = () => navigate("/cadastro");
  const irParaDashboard = () => navigate("/dashboard");
  

  // O teu Menu e Dashboard passavam uma string (ex: "alunos") no setTelaAtiva.
  // Esta função recebe a string e transforma no link correto!
  const mudarTelaPorString = (tela) => {
    if (tela === "login") navigate("/login");
    else if (tela === "cadastro") navigate("/cadastro");
    else if (tela === "dashboard") navigate("/dashboard");
    else if (tela === "usuarios") navigate("/usuarios");
    else if (tela === "boas-vindas") navigate("/teladeboasvindas");
    else navigate(`/${tela}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh', 
        bgcolor: modo === "light" ? "#DEE4E9" : "background.default", 
        width: "100%" 
        }}>
        
        <Routes>
          
          {/* ---- ROTAS PÚBLICAS ---- */}
          <Route path="/" element={
            <TelaDeBoasVindas 
              irParaLogin={irParaLogin} 
              irParaCadastro={irParaCadastro} 
            />
          } />

          <Route path="/login" element={
            <Login 
              mudarTela={irParaCadastro} // Do login vai pro cadastro
              onLogin={() => {
                setLogado(true);
                irParaDashboard(); // Vai direto pro dashboard ao logar
              }}
            />
          } />

          <Route path="/cadastro" element={
            <Cadastro mudarTela={irParaLogin} /> // Do cadastro volta pro login
          } />


          {/* ---- ROTAS PROTEGIDAS (PRECISA ESTAR LOGADO) ---- */}
          <Route path="/dashboard" element={
            logado ? (
              <>
                <Menu 
                  onLogout={() => { setLogado(false); irParaBoasVindas(); }} 
                  setTelaAtiva={mudarTelaPorString} 
                  toggleTema={toggleTema} 
                  modo={modo} 
                />
                <main style={{ padding: "20px" }}>
                  <Dashboard mudarTela={mudarTelaPorString} />
                </main>
              </>
            ) : (
              <Navigate to="/login" replace /> // Se tentar entrar sem logar, chuta pro login
            )
          } />

          <Route path="/usuarios" element={
            logado ? (
              <>
                <Menu 
                  onLogout={() => { setLogado(false); irParaBoasVindas(); }} 
                  setTelaAtiva={mudarTelaPorString} 
                  toggleTema={toggleTema} 
                  modo={modo} 
                />
                <main style={{ padding: "20px" }}>
                  <Usuarios mudarTela={mudarTelaPorString} />
                </main>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          } />

          <Route path="/perfil" element={
            logado ? (
              <>
                <Menu 
                  onLogout={() => { setLogado(false); irParaBoasVindas(); }} 
                  setTelaAtiva={mudarTelaPorString} 
                  toggleTema={toggleTema} 
                  modo={modo} 
                />
                <main style={{ padding: "20px" }}>
                  <EditarPerfil />
                </main>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          } />

          {/*se o usúario digitar um link errado, volta pro inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Box>
    </ThemeProvider>
  );
}

//O App principal agora apenas envolve tudo no BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
