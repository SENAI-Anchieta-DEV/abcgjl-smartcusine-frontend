import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, CircularProgress, Snackbar, Alert, Typography, Paper, Button } from "@mui/material";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RelatorioSemanal({ setTelaAtiva }) {
  const navigate = useNavigate();

  const [nomeRelatorio, setNomeRelatorio] = useState("");
  const [textoRelatorio, setTextoRelatorio] = useState(""); 
  const [enviado, setEnviado] = useState(false);
  
  const [dadosPizza, setDadosPizza] = useState([]);
  const [fichasUsadas, setFichasUsadas] = useState([]);
  const [descricaoRelatorio, setDescricaoRelatorio] = useState("");
  const [carregando, setCarregando] = useState(true); 

  const [mensagemAberta, setMensagemAberta] = useState(false);

  // Estado para detectar se a tela é um dispositivo móvel (ajuda no layout do gráfico)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Listener para redimensionamento de tela
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Executa no início e adiciona o evento
    handleResize();
    window.addEventListener("resize", handleResize);

    async function buscarDadosDoSistema() {
      try {
        setCarregando(true);

        const response = await api.get("/insumos");
        const listaDeInsumos = response.data;

        const fichasDoMundoReal = JSON.parse(localStorage.getItem("fichasTecnicas")) || [];
        const nomesDasFichas = fichasDoMundoReal.map(ficha => ficha.nomePreparo);

        const dadosGraficoVindosDoBanco = [
          { name: "Novos Produtos", value: listaDeInsumos.length, cor: "#4CAF82" },
          { name: "Novos Equipamentos", value: 20, cor: "#F4A623" },
          { name: "Insumos em estado crítico", value: 30, cor: "#E8534A" },
          { name: "Produtos Vencidos", value: 10, cor: "#5B8DEF" },
        ];

        setFichasUsadas(nomesDasFichas);
        setDadosPizza(dadosGraficoVindosDoBanco); 

      } catch (error) {
        console.error("Erro ao buscar dados da semana:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarDadosDoSistema();

    // Limpa o evento ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleConcluir = () => {
    if (!nomeRelatorio.trim()) {
      alert("Por favor, informe o nome do relatório antes de concluir.");
      return;
    }
    
    setEnviado(true);
    setMensagemAberta(true);
    
    setTimeout(() => setEnviado(false), 3000);
  };

  const handleFecharMensagem = (event, reason) => {
    if (reason === "clickaway") return;
    setMensagemAberta(false);
  };

  const concluirRelatorio = () => {
  const novoRelatorio = {
    id: Date.now(),
    nome: nomeRelatorio || "Relatório Semanal",
    descricao: descricaoRelatorio,
    data: new Date().toLocaleDateString("pt-BR")
  };

  const relatoriosSalvos =
    JSON.parse(localStorage.getItem("relatoriosSemanais")) || [];

  localStorage.setItem(
    "relatoriosSemanais",
    JSON.stringify([...relatoriosSalvos, novoRelatorio])
  );

  alert("Relatório gerado com sucesso!");

  setTelaAtiva("lista-relatorios");
};

  if (carregando) {
    return (
      <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress style={{ color: "#F4A623" }} />
      </Box>
    );
  }

  return (
    <Box style={{ fontFamily: "'Segoe UI', sans-serif", width: "100%", minHeight: "100vh", paddingBottom: "40px", boxSizing: "border-box" }}>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "15px" : "30px 20px", boxSizing: "border-box" }}>
        <Button
  startIcon={
    <ArrowBackIcon
  sx={{
    fontSize: 28,
    stroke: "#7996b4",
    strokeWidth: 1.8,
    
  }}
/>
  }
  onClick={() => navigate("/dashboard")}
  sx={{
  border: "3px solid #7996b4",
  backgroundColor: "#ffffff90",
  borderRadius: "12px",
  color: "#7996b4",
  fontWeight: 700,
  px: 2,
  py: 1,
}}
>
  Home
</Button>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: "#1E293B", marginBottom: 24 }}>
          Relatório Semanal
        </h1>

        {/* Nome do Relatório */}
        <div style={{ marginBottom: 24, backgroundColor: "#fff", padding: "20px", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", boxSizing: "border-box" }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "#475569", marginBottom: 8 }}>
            Nome do Relatório
          </label>
          <input
            type="text"
            placeholder="Ex: Relatório de Insumos - Semana 24"
            value={nomeRelatorio}
            onChange={e => setNomeRelatorio(e.target.value)}
            style={{
              width: "100%", maxWidth: "100%", padding: "12px 16px", borderRadius: 8,
              border: "1.5px solid #E2E8F0", fontSize: 14, background: "#fff", outline: "none", color: "#334155",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Grid de Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "24px", 
          marginBottom: "24px" 
        }}>
          
          {/* Card Gráfico */}
          <div style={{ 
            background: "#fff", 
            borderRadius: 14, 
            padding: "24px", 
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)", 
            display: "flex", 
            flexDirection: "column", 
            height: isMobile ? "400px" : "340px",
            boxSizing: "border-box"
          }}>
            
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1E293B", marginBottom: 12 }}>
              Distribuição Semanal
            </h2>
            
            <div style={{ width: "100%", height: "100%", minHeight: 0 }}>
              {dadosPizza.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={dadosPizza} 
                      cx={isMobile ? "50%" : "35%"} 
                      cy={isMobile ? "40%" : "48%"} 
                      outerRadius={isMobile ? 70 : 85} 
                      dataKey="value" 
                      label={({ value }) => `${value}%`} 
                      labelLine={true}
                    >
                      {dadosPizza.map((entry, i) => (
                        <Cell key={i} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Legend 
                      layout={isMobile ? "horizontal" : "vertical"} 
                      verticalAlign={isMobile ? "bottom" : "middle"} 
                      align={isMobile ? "center" : "right"}
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={isMobile ? {
                        fontSize: "12px",
                        paddingTop: "10px"
                      } : { 
                        paddingLeft: "10px", 
                        fontSize: "13px", 
                        lineHeight: "26px", 
                        color: "#475569" 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ color: "#64748B", fontSize: 14, textAlign: "center", marginTop: "100px" }}>
                  Nenhum dado encontrado para o gráfico.
                </p>
              )}
            </div>
          </div>

          {/* Card Lista de Fichas */}
          <div style={{ 
            background: "#fff", 
            borderRadius: 14, 
            padding: "24px", 
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)", 
            height: "340px", 
            display: "flex", 
            flexDirection: "column",
            boxSizing: "border-box"
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1E293B", marginBottom: 16 }}>
              Fichas Usadas no Período
            </h2>
            <div style={{ overflowY: "auto", flex: 1, paddingRight: "4px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {fichasUsadas.length > 0 ? (
                  fichasUsadas.map((ficha, i) => (
                    <li key={i} style={{ 
                      padding: "10px 12px", marginBottom: "8px", background: "#F8FAFC", borderRadius: "6px",
                      fontSize: "13px", color: "#334155", borderLeft: "4px solid #4CAF82", fontWeight: "500"
                    }}>
                      {ficha}
                    </li>
                  ))
                ) : (
                  <p style={{ color: "#64748B", fontSize: 14, textAlign: "center", marginTop: "100px" }}>
                    Nenhuma ficha utilizada esta semana.
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Considerações Gerais */}
        <div style={{ 
          background: "#fff", 
          borderRadius: 14, 
          padding: isMobile ? "20px" : "28px 32px", 
          marginBottom: 24, 
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          boxSizing: "border-box"
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1E293B", marginBottom: 12 }}>
            Considerações / Relatório Geral
          </h2>
          <TextField
            label="Descrição do Relatório"
            value={descricaoRelatorio}
            onChange={(e) => setDescricaoRelatorio(e.target.value)}
            multiline
            minRows={6}
            fullWidth
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2
            }}
          />
        </div>

        {/* Container do Botão */}
        <div style={{ display: "flex", justifyContent: isMobile ? "stretch" : "flex-end" }}>
          <button
            onClick={concluirRelatorio}
            style={{
              background: enviado ? "#10B981" : "#F4A623", border: "none", color: "#fff",
              borderRadius: 8, padding: "14px 40px", fontWeight: 700, fontSize: 15, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(244,166,35,0.2)", transition: "all 0.2s",
              width: isMobile ? "100%" : "auto" // Botão ocupa tudo no mobile
            }}
          >
            {enviado ? "✓ Salvo com sucesso!" : "Concluir Relatório"}
          </button>
        </div>
      </main>

      <Snackbar 
        open={mensagemAberta} 
        autoHideDuration={4000} 
        onClose={handleFecharMensagem}
        anchorOrigin={isMobile ? { vertical: "bottom", horizontal: "center" } : { vertical: "bottom", horizontal: "end" }}
      >
        <Alert 
          onClose={handleFecharMensagem} 
          severity="success" 
          variant="filled"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          Relatório cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}