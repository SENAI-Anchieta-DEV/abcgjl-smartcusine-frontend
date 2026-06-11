import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogContent,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import api from "../../services/api";

function Produtos() {
  const navigate = useNavigate();

  const [modalEditarFichaAberto, setModalEditarFichaAberto] = useState(false);
  const [fichaEditando, setFichaEditando] = useState(null);
  const [fichaEditandoIndex, setFichaEditandoIndex] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("insumos");

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const [dados, setDados] = useState({
    insumos: [],
    equipamentos: [],
    fichas: [],
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const fichas =
      JSON.parse(localStorage.getItem("fichasTecnicas")) || [];

    const equipamentos =
      JSON.parse(localStorage.getItem("equipamentos")) || [];

    try {
      const response = await api.get("/insumos");

      setDados({
        insumos: response.data,
        equipamentos,
        fichas,
      });
    } catch (error) {
      console.error("Erro ao carregar dados:", error);

      setDados({
        insumos: [],
        equipamentos,
        fichas,
      });
    }
  }

  function continuar() {
    if (tipoSelecionado === "insumo") {
      navigate("/insumos/novo");
    } else if (tipoSelecionado === "equipamento") {
      navigate("/equipamentos/novo");
    } else if (tipoSelecionado === "ficha") {
      navigate("/fichas-tecnicas/novo");
    }
  }

  function abrirEditar(item) {
    setProdutoEditando(item);
    setModalEditarAberto(true);
  }

  async function salvarEdicao() {
    try {
      if (Number(produtoEditando.quantidadeEstoque) <= 0) {
        alert("A quantidade deve ser maior que zero!");
        return;
      } 

      await api.put(`/insumos/${produtoEditando.idInsumo}`, {
        nome: produtoEditando.nome,
        unidadeMedida: produtoEditando.unidadeMedida,
        quantidadeEstoque: Number(produtoEditando.quantidadeEstoque),
        dataValidade: produtoEditando.dataValidade,
      });

      alert("Insumo atualizado com sucesso!");

      setModalEditarAberto(false);
      setProdutoEditando(null);
      carregarDados();
    } catch (error) {
      console.error("Erro ao editar insumo:", error);
      alert("Erro ao editar insumo!");
    }
  }

  async function deletarInsumo(item) {
    const confirmar = window.confirm(
      `Deseja realmente excluir ${item.nome}?`
    );

    if (!confirmar) return;

    try {
      await api.delete(`/insumos/${item.idInsumo}`);

      alert("Insumo excluído com sucesso!");

      carregarDados();
    } catch (error) {
      console.error("Erro ao excluir insumo:", error);
      alert("Erro ao excluir insumo!");
    }
  }

  function excluirEquipamento(index) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este equipamento?"
    );

    if (!confirmar) return;

    const novosEquipamentos = [...dados.equipamentos];

    novosEquipamentos.splice(index, 1);

    localStorage.setItem("equipamentos", JSON.stringify(novosEquipamentos));

    setDados({
      ...dados,
      equipamentos: novosEquipamentos,
    });

    alert("Equipamento excluído com sucesso!");
  }

  function excluirFicha(index) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta ficha técnica?"
    );

    if (!confirmar) return;

    const novasFichas = [...dados.fichas];

    novasFichas.splice(index, 1);

    localStorage.setItem(
      "fichasTecnicas",
      JSON.stringify(novasFichas)
    );

    setDados({
      ...dados,
      fichas: novasFichas,
    });
  }

  function editarFicha(ficha, index) {
    setFichaEditando(ficha);
    setFichaEditandoIndex(index);
    setModalEditarFichaAberto(true);
  }

  function salvarEdicaoFicha() {
    if (
      !fichaEditando.nomePreparo ||
      !fichaEditando.tipoEquipamento ||
      !fichaEditando.temperaturaMinima ||
      !fichaEditando.temperaturaMaxima
    ) {
      alert("Preencha todos os campos da ficha!");
      return;
    }

    if (
      Number(fichaEditando.temperaturaMinima) <= 0 ||
      Number(fichaEditando.temperaturaMaxima) <= 0
    ) {
      alert("As temperaturas devem ser maiores que zero!");
      return;
    }

    if (
      Number(fichaEditando.temperaturaMinima) >
      Number(fichaEditando.temperaturaMaxima)
    ) {
      alert("A temperatura mínima não pode ser maior que a máxima!");
      return;
    }

    const fichasSalvas =
      JSON.parse(localStorage.getItem("fichasTecnicas")) || [];

    const novasFichas = fichasSalvas.map((ficha, index) => {
      if (index === fichaEditandoIndex) {
        return {
          ...ficha,
          ...fichaEditando,
          temperaturaMinima: Number(fichaEditando.temperaturaMinima),
          temperaturaMaxima: Number(fichaEditando.temperaturaMaxima),
        };
      }
      return ficha;
    });

    localStorage.setItem(
      "fichasTecnicas",
      JSON.stringify(novasFichas)
    );

    setDados((prev) => ({
      ...prev,
      fichas: novasFichas,
    }));

    setModalEditarFichaAberto(false);
    setFichaEditando(null);
    setFichaEditandoIndex(null);

    alert("Ficha técnica atualizada com sucesso!");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#b8ced8",
        p: { xs: 2, sm: 3, md: 5 }, 
      }}
    >
      <Button
        startIcon={
          <ArrowBackIcon
            sx={{
              fontSize: { xs: 22, sm: 28 },
              stroke: "#2C3E50",
              strokeWidth: 1.8,
            }}
          />
        }
        onClick={() => navigate("/dashboard")}
        sx={{
          color: "#2C3E50",
          textTransform: "none",
          fontSize: { xs: "18px", sm: "22px" },
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Home
      </Button>

      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{
          color: "#2C3E50",
          mb: 5,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, 
        }}
      >
        Adicionar Produto
      </Typography>

      <Button
        onClick={() => setModalAberto(true)}
        fullWidth
        sx={{
          maxWidth: 900,
          width: "100%",
          mx: "auto",
          mb: 4,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 2,
          borderRadius: { xs: 5, sm: 10 }, 
          backgroundColor: "#fff",
          color: "#8b8b8b",
          fontSize: { xs: 18, sm: 22 }, 
          textTransform: "none",
          px: 3,
          py: 1.5,
        }}
      >
        <AddCircleIcon
          sx={{
            color: "#ff8c42",
            fontSize: { xs: 35, sm: 50 }, 
          }}
        />
        Cadastrar um produto
      </Button>

      <Paper
        elevation={0}
        sx={{
          maxWidth: 520,
          width: "100%",
          mx: "auto",
          mb: 6,
          borderRadius: { xs: 5, sm: 10 },
          display: "flex",
          justifyContent: "space-around",
          py: 1.5,
          px: 1,
        }}
      >
        <Box
          textAlign="center"
          onClick={() => setAbaAtiva("insumos")}
          sx={{ cursor: "pointer", flex: 1 }}
        >
          <Typography fontWeight="bold" fontSize={{ xs: 18, sm: 24 }}>
            {dados.insumos.length}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              borderBottom:
                abaAtiva === "insumos" ? "3px solid black" : "none",
              pb: 0.5,
            }}
          >
            Insumos
          </Typography>
        </Box>

        <Box
          textAlign="center"
          onClick={() => setAbaAtiva("equipamentos")}
          sx={{ cursor: "pointer", flex: 1 }}
        >
          <Typography fontWeight="bold" fontSize={{ xs: 18, sm: 24 }}>
            {dados.equipamentos.length}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              borderBottom:
                abaAtiva === "equipamentos" ? "3px solid black" : "none",
              pb: 0.5,
            }}
          >
            Equipamentos
          </Typography>
        </Box>

        <Box
          textAlign="center"
          onClick={() => setAbaAtiva("fichas")}
          sx={{ cursor: "pointer", flex: 1 }}
        >
          <Typography fontWeight="bold" fontSize={{ xs: 18, sm: 24 }}>
            {dados.fichas.length}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              borderBottom:
                abaAtiva === "fichas" ? "3px solid black" : "none",
              pb: 0.5,
            }}
          >
            Fichas
          </Typography>
        </Box>
      </Paper>

      {abaAtiva === "insumos" &&
        dados.insumos.map((item, index) => (
          <ProdutoCard
            key={item.idInsumo || index}
            nome={item.nome}
            quantidade={item.quantidadeEstoque}
            unidade={item.unidadeMedida}
            data={item.dataValidade}
            onEditar={() => abrirEditar(item)}
            onExcluir={() => deletarInsumo(item)}
          />
        ))}

      {abaAtiva === "equipamentos" &&
        dados.equipamentos.map((item, index) => (
          <ProdutoCard
            key={index}
            nome={item.nome}
            categoria={item.categoria}
            data={`${item.tempMin}°C até ${item.tempMax}°C`}
            isEquipamento
            onExcluir={() => excluirEquipamento(index)}
          />
        ))}

      {abaAtiva === "fichas" &&
        dados.fichas.map((ficha, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              maxWidth: 800,
              width: "100%",
              mx: "auto",
              mb: 5,
              borderRadius: { xs: 5, sm: 8 },
              p: { xs: 2.5, sm: 4 },
              boxShadow: { xs: "-10px 10px 0px #7996b4", sm: "-18px 18px 0px #7996b4" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#7996b4",
                mb: 2,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              {ficha.nomePreparo}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 2, fontSize: { xs: 14, sm: 16 } }}>
              Equipamento: {ficha.tipoEquipamento}
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: { xs: 14, sm: 16 } }}>
              Temperatura Ideal: {ficha.temperaturaMinima}°C até {ficha.temperaturaMaxima}°C
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: { xs: 14, sm: 16 } }}>
              Insumos utilizados: {ficha.insumosUtilizados?.length || 0}
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Box display="flex" gap={1} alignItems="center">
                <CalendarTodayIcon fontSize="small" color="disabled" />
                <Typography color="text.secondary" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                  {ficha.dataCriacao?.split("-").reverse().join("/")}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <DeleteIcon
                  sx={{
                    color: "red",
                    fontSize: { xs: 30, sm: 35 },
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                  onClick={() => excluirFicha(index)}
                />

                <Button
                  onClick={() => editarFicha(ficha, index)}
                  sx={{
                    backgroundColor: "#7996b4",
                    color: "#fff",
                    px: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    textTransform: "none",
                    minWidth: { xs: "80px", sm: "100px" },
                    fontSize: { xs: 14, sm: 16 },
                    "&:hover": { backgroundColor: "#6f8aa5" },
                  }}
                >
                  Editar
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}

      <Dialog
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 5, sm: 8 },
            width: "100%",
            mx: 2,
            p: { xs: 1, sm: 2 },
            boxShadow: { xs: "-8px 8px 0px #7996b4", sm: "-14px 14px 0px #7996b4" },
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" sx={{ color: "#7996b4", mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Que tipo de produto você pretende cadastrar?
          </Typography>
          <RadioGroup value={tipoSelecionado} onChange={(e) => setTipoSelecionado(e.target.value)}>
            <FormControlLabel value="insumo" control={<Radio />} label="Insumo" />
            <FormControlLabel value="equipamento" control={<Radio />} label="Equipamento" />
            <FormControlLabel value="ficha" control={<Radio />} label="Ficha" />
          </RadioGroup>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={continuar}
              disabled={!tipoSelecionado}
              sx={{
                backgroundColor: "#7996b4",
                color: "#fff",
                textTransform: "none",
                px: 4,
                "&:hover": { backgroundColor: "#6f8aa5" },
              }}
            >
              Continuar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalEditarAberto}
        onClose={() => setModalEditarAberto(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 4, sm: 5 },
            width: "100%",
            mx: 2,
            p: 2,
            boxShadow: { xs: "-8px 8px 0px #7996b4", sm: "-14px 14px 0px #7996b4" },
          },
        }}
      >
        <DialogContent>
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            sx={{ 
              color: "#7996b4", 
              mb: 3, 
              fontSize: { xs: '1.3rem', sm: '1.5rem' } 
              }}>

            Editar Produto
          </Typography>

          <TextField fullWidth 
          label="Nome" 
          value={produtoEditando?.nome || ""} 
          onChange={(e) => setProdutoEditando({ ...produtoEditando, nome: e.target.value })} 
          sx={{ mb: 3 }} />

          <TextField fullWidth 
          label="Quantidade" 
          type="number" 
          value={produtoEditando?.quantidadeEstoque || ""} 
          onChange={(e) => setProdutoEditando({ ...produtoEditando, 
          quantidadeEstoque: e.target.value })} 
          sx={{ mb: 3 }} />
          
          <TextField select fullWidth 
            label="Unidade de medida" 
            value={produtoEditando?.unidadeMedida || ""} 
            onChange={(e) => setProdutoEditando({ ...produtoEditando, unidadeMedida: e.target.value })} 
            sx={{ mb: 3 }}>

            <MenuItem value="kg">Kg</MenuItem>
            <MenuItem value="g">g</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="ml">ml</MenuItem>
            <MenuItem value="UND">UND</MenuItem>
          </TextField>
          
          <TextField fullWidth 
          label="Data de validade" type="date" 
          value={produtoEditando?.dataValidade || ""} 
          onChange={(e) => setProdutoEditando({ ...produtoEditando, dataValidade: e.target.value })} 
          InputLabelProps={{ shrink: true }} 
          sx={{ mb: 4 }} />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setModalEditarAberto(false)}>Cancelar</Button>
            <Button 
              onClick={salvarEdicao} 
              sx={{ backgroundColor: "#ff8c42", 
              color: "#fff", 
              px: 4, 
              textTransform: "none" 
              }}>

              Salvar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalEditarFichaAberto}
        onClose={() => setModalEditarFichaAberto(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 4, sm: 5 },
            width: "100%",
            mx: 2,
            p: 2,
            boxShadow: { xs: "-8px 8px 0px #7996b4", sm: "-14px 14px 0px #7996b4" },
          },
        }}
      >
        <DialogContent>
          <Typography variant="h5" fontWeight="bold" 
            sx={{ 
              color: "#7996b4", 
              mb: 3, fontSize: { xs: '1.3rem', sm: '1.5rem' } 
              }}>

            Editar Ficha Técnica
          </Typography>
          
          <TextField fullWidth 
          label="Nome do preparo" 
          value={fichaEditando?.nomePreparo || ""} 
          onChange={(e) => setFichaEditando({ ...fichaEditando, nomePreparo: e.target.value })} 
          sx={{ mb: 3 }} />

          <TextField fullWidth 
          label="Equipamento" 
          value={fichaEditando?.tipoEquipamento || ""} 
          onChange={(e) => setFichaEditando({ ...fichaEditando, tipoEquipamento: e.target.value })} 
          sx={{ mb: 3 }} />

          <TextField fullWidth 
          label="Temperatura mínima" 
          type="number" value={fichaEditando?.temperaturaMinima || ""} 
          onChange={(e) => setFichaEditando({ ...fichaEditando, temperaturaMinima: e.target.value })} 
          sx={{ mb: 3 }} />

          <TextField fullWidth 
          label="Temperatura máxima" 
          type="number" 
          value={fichaEditando?.temperaturaMaxima || ""} 
          onChange={(e) => setFichaEditando({ ...fichaEditando, temperaturaMaxima: e.target.value })} 
          sx={{ mb: 4 }} />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setModalEditarFichaAberto(false)}>Cancelar</Button>
            <Button 
              onClick={salvarEdicaoFicha} 
              sx={{ backgroundColor: "#ff8c42", 
              color: "#fff", 
              px: 4, 
              textTransform: "none" 
              }}>
                
              Salvar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function ProdutoCard({
  nome,
  quantidade,
  unidade,
  categoria,
  data,
  isEquipamento,
  onEditar,
  onExcluir,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 800,
        width: "100%",
        mx: "auto",
        mb: 5,
        borderRadius: { xs: 5, sm: 8 },
        p: { xs: 2.5, sm: 4 },
        boxShadow: { xs: "-10px 10px 0px #7996b4", sm: "-18px 18px 0px #7996b4" },
      }}
    >
      <Typography variant="h5" sx={{ color: "#7996b4", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
        {nome}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4, fontSize: { xs: 14, sm: 16 } }}>
        {isEquipamento
          ? `Categoria: ${categoria}`
          : `Quantidade: ${quantidade} ${unidade}`}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={1} alignItems="center">
          {isEquipamento ? (
            <DeviceThermostatIcon fontSize="small" color="disabled" />
          ) : (
            <CalendarTodayIcon fontSize="small" color="disabled" />
          )}

          <Typography color="text.secondary" sx={{ fontSize: { xs: 14, sm: 16 } }}>
            {isEquipamento
              ? data
              : data?.split("-").reverse().join("/")}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <DeleteIcon
            onClick={onExcluir}
            sx={{
              color: "red",
              fontSize: { xs: 30, sm: 35 },
              cursor: "pointer",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />

          {!isEquipamento && (
            <Button
              onClick={onEditar}
              sx={{
                backgroundColor: "#7996b4",
                color: "#fff",
                px: { xs: 2, sm: 3 },
                borderRadius: 2,
                textTransform: "none",
                minWidth: { xs: "80px", sm: "100px" },
                fontSize: { xs: 14, sm: 16 },
              }}
            >
              Editar
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default Produtos;