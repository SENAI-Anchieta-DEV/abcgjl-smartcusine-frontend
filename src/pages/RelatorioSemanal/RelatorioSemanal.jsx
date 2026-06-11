import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const dadosPizza = [
  { name: "Novos Produtos", value: 50, cor: "#4CAF82" },
  { name: "Novos Equipamentos", value: 16.7, cor: "#F4A623" },
  { name: "Insumos em estado crítico", value: 25, cor: "#E8534A" },
  { name: "Produtos Vencidos", value: 8.3, cor: "#5B8DEF" },
];

const fichasUsadas = [
  "Frango assado com ervas", "Carne assada ao forno", "Legumes assados",
  "Lasanha de carne gratinada", "Peixe assado com limão", "Mousse de maracujá",
  "Pudim de leite condensado", "Salada de frutas", "Molho de queijo caseiro",
  "Caldo de legumes", "Frango desfiado", "Arroz pronto",
  "Salada verde (alface, rúcula e agrião)", "Salada de tomate com cebola", "Salada de maionese",
];

const textoRelatorioGeral = `Durante a presente semana, foram realizadas atualizações e registros importantes relacionados à estrutura, equipamentos e controle de insumos da cozinha.

No que se refere aos equipamentos, foram incorporados novos itens ao setor, incluindo uma geladeira, um forno e um sistema de monitoramento de temperatura ambiente. Todos os equipamentos foram devidamente instalados, testados e encontram-se em pleno funcionamento, atendendo às exigências de conservação e preparo dos alimentos.

Em relação aos produtos, houve a entrada de novos insumos alimentícios, bem como o desenvolvimento de novas preparações no cardápio. Todos os itens foram devidamente registrados, identificados e armazenados conforme as normas de segurança alimentar.

No controle de validade, foi realizado o monitoramento dos alimentos armazenados. Durante o período, foi identificado o vencimento de alguns produtos, os quais foram descartados de forma adequada. Além disso, alguns produtos encontram-se próximos da data de vencimento, sendo sinalizados para uso prioritário, a fim de evitar desperdícios.

Por fim, reforça-se a importância da continuidade dos controles de qualidade, organização e monitoramento, garantindo a segurança alimentar e a eficiência operacional da cozinha.`;

const LegendaPersonalizada = ({ payload }) => {
  if (!payload) return null;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0 0" }}>
      {payload.map((entry, i) => (
        <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: entry.color, flexShrink: 0 }} />
          <span style={{ color: "#444" }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default function RelatorioSemanal() {
  const navigate = useNavigate();

  const [nomeRelatorio, setNomeRelatorio] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleConcluir = () => {
    if (!nomeRelatorio.trim()) {
      alert("Por favor, informe o nome do relatório antes de concluir.");
      return;
    }
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (

    
    
    // Box adaptável ao tema light/dark do seu projeto
    <Box style={{ fontFamily: "'Segoe UI', sans-serif", width: "100%" }}>
      
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 4px" }}>

    <div
  style={{
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 20,
  }}
>
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
    textTransform: "uppercase",
    px: 2,
    py: 1,
  }}
>
    HOME
  </Button>
</div>

        <h1 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, color: "#2D2D2D", marginBottom: 32 }}>
          Relatório Semanal
        </h1>

        <div style={{ marginBottom: 24 }}>
          <button style={{
            background: "#fff", border: "2px solid #F4A623", color: "#F4A623",
            borderRadius: 10, padding: "12px 22px", fontWeight: 700, fontSize: 15,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8
          }}>
            <span style={{ fontSize: 20 }}>＋</span> Gerar relatório semanal
          </button>
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: 15, color: "#333", marginBottom: 8 }}>
            Nome do Relatório:
          </label>
          <input
            type="text"
            placeholder="Nome do relatório"
            value={nomeRelatorio}
            onChange={e => setNomeRelatorio(e.target.value)}
            style={{
              width: "100%", maxWidth: 500, padding: "12px 16px", borderRadius: 8,
              border: "1.5px solid #DDD", fontSize: 14, background: "#fff", outline: "none"
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
          
          {/* Card Gráfico */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", minHeight: 380 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#333", marginBottom: 16 }}>
              Distribuição Semanal
            </h2>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dadosPizza} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ value }) => `${value}%`} labelLine={true}>
                    {dadosPizza.map((entry, i) => <Cell key={i} fill={entry.cor} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Legend content={<LegendaPersonalizada />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card Fichas */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", maxHeight: 410, overflowY: "auto" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#333", marginBottom: 16 }}>
              Fichas Usadas:
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {fichasUsadas.map((ficha, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < fichasUsadas.length - 1 ? "1px solid #F3F3F3" : "none", fontSize: 13, color: "#444" }}>
                  <span style={{ color: "#4CAF82", fontWeight: 700, fontSize: 15 }}>•</span>
                  {ficha}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Relatório Geral */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "28px 32px", marginBottom: 32, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2D2D2D", marginBottom: 16 }}>
            Relatório Geral:
          </h2>
          <div style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
            {textoRelatorioGeral.split("\n\n").map((paragrafo, i) => (
              <p key={i} style={{ marginBottom: i < 4 ? 14 : 0 }}>{paragrafo}</p>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleConcluir}
            style={{
              background: enviado ? "#4CAF82" : "#F4A623", border: "none", color: "#fff",
              borderRadius: 10, padding: "14px 48px", fontWeight: 700, fontSize: 16, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(244,166,35,0.3)"
            }}
          >
            {enviado ? "✓ Concluído!" : "Concluir"}
          </button>

        </div>

      </main>
    </Box>
    
  );
}