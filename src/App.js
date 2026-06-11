import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import TelaDeBoasVindas from "./pages/Home/TelaDeBoasVindas";
import Login from "./pages/Auth/Login";
import Cadastro from "./pages/Auth/Cadastro";
import Menu from "./components/layout/Menu";
import Dashboard from "./pages/Dashboard/dashboard";
import Usuarios from "./pages/Usuarios/Usuarios";
import EditarPerfil from "./pages/Auth/EditarPerfil";
import AdicionarProduto from "./pages/AdicionarProduto/AdicionarProduto";
import CadastroInsumo from "./pages/Insumos/CadastroInsumo";
import CadastroFichaTecnica from "./pages/FichaTecnica/CadastroFichaTecnica";
import Produtos from "./pages/Produtos/Produtos";
import Equipamentos from "./pages/Equipamentos/Equipamentos";


function AppContent() {
  const navigate = useNavigate(); 
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
  
  const mudarTelaPorString = (tela) => {
    if (tela === "login") navigate("/login");
    else if (tela === "cadastro") navigate("/cadastro");
    else if (tela === "dashboard") navigate("/dashboard");
    else if (tela === "usuarios") navigate("/usuarios");
    else if (tela === "boas-vindas") navigate("/teladeboasvindas");
    else if (tela === "adicionar-produto") navigate("/adicionar-produto");
    else if (tela === "produtos") navigate("/produtos");
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
              mudarTela={irParaCadastro} 
              onLogin={() => {
                setLogado(true);
                irParaDashboard(); 
              }}
            />
          } />

          <Route path="/cadastro" element={
            <Cadastro mudarTela={irParaLogin} /> 
          } />


          {/* ---- ROTAS PROTEGIDAS ---- */}
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
              <Navigate to="/login" replace /> 
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

          <Route path="/produtos" element={
  logado ? (
    <>
      <Menu 
        onLogout={() => { setLogado(false); irParaBoasVindas(); }} 
        setTelaAtiva={mudarTelaPorString} 
        toggleTema={toggleTema} 
        modo={modo} 
      />
      <main style={{ padding: "20px" }}>
        <Produtos />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  )
} />

          <Route path="/adicionar-produto" element={
  logado ? (
    <>
      <Menu 
        onLogout={() => { setLogado(false); irParaBoasVindas(); }} 
        setTelaAtiva={mudarTelaPorString} 
        toggleTema={toggleTema} 
        modo={modo} 
      />
      <main style={{ padding: "20px" }}>
        <AdicionarProduto />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  )
} />

<Route path="/insumos/novo" element={
  logado ? (
    <>
      <Menu 
        onLogout={() => { setLogado(false); irParaBoasVindas(); }} 
        setTelaAtiva={mudarTelaPorString} 
        toggleTema={toggleTema} 
        modo={modo} 
      />
      <main
  style={{
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <CadastroInsumo />
</main>
    </>
  ) : (
    <Navigate to="/login" replace />
  )
} />

<Route path="/fichas-tecnicas/novo" element={
  logado ? (
    <>
      <Menu 
        onLogout={() => { setLogado(false); irParaBoasVindas(); }} 
        setTelaAtiva={mudarTelaPorString} 
        toggleTema={toggleTema} 
        modo={modo} 
      />
      <main 
  style={{
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  }}>
        <CadastroFichaTecnica />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  )
} />

          <Route path="*" element={<Navigate to="/" replace />} />

<Route path="/equipamentos/novo" element={
  logado ? (
    <>
      <Menu 
        onLogout={() => { setLogado(false); irParaBoasVindas(); }} 
        setTelaAtiva={mudarTelaPorString} 
        toggleTema={toggleTema} 
        modo={modo} 
      />
      <main 
  style={{
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  }}>
        <Equipamentos />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  )
} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
