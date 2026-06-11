import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogContent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import api from "../../services/api";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function CadastroFichaTecnica() {
  const navigate = useNavigate();

  const [insumosCadastrados, setInsumosCadastrados] = useState([]);
  const [popupAberto, setPopupAberto] = useState(false);

  const [insumoSelecionado, setInsumoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");

  const [nomePreparo, setNomePreparo] = useState("");
  const [tipoEquipamento, setTipoEquipamento] = useState("");
  const [temperaturaMinima, setTemperaturaMinima] = useState("");
  const [temperaturaMaxima, setTemperaturaMaxima] = useState("");

  const [insumosUtilizados, setInsumosUtilizados] = useState([]);

  useEffect(() => {
    carregarInsumos();
  }, []);

  async function carregarInsumos() {
    try {
      const response = await api.get("/insumos");
      setInsumosCadastrados(response.data);
    } catch (error) {
      console.error("Erro ao carregar insumos:", error);
      alert("Erro ao carregar insumos cadastrados!");
    }
  }

  function converterParaBase(quantidade, unidade) {
    const valor = Number(quantidade);
    if (unidade === "kg") return valor * 1000;
    if (unidade === "g") return valor;
    if (unidade === "L") return valor * 1000;
    if (unidade === "ml" || unidade === "ML") return valor;
    if (unidade === "UND") return valor;
    return valor;
  }

  function tiposCompativeis(unidadeEstoque, unidadeUsada) {
    const peso = ["kg", "g"];
    const volume = ["L", "ml", "ML"];
    const unidade = ["UND", "und"];

    return (
      (peso.includes(unidadeEstoque) && peso.includes(unidadeUsada)) ||
      (volume.includes(unidadeEstoque) && volume.includes(unidadeUsada)) ||
      (unidade.includes(unidadeEstoque) && unidade.includes(unidadeUsada))
    );
  }

  function adicionarInsumo() {
    if (!insumoSelecionado || !quantidade || !unidade) {
      alert("Preencha todos os campos do insumo.");
      return;
    }

    const insumoJaAdicionado = insumosUtilizados.some(
      (insumo) => insumo.idInsumo === insumoSelecionado.idInsumo
    );

    if (insumoJaAdicionado) {
      alert("Este insumo já foi adicionado à ficha técnica!");
      return;
    }

    if (Number(quantidade) <= 0) {
      alert("A quantidade utilizada deve ser maior que zero!");
      return;
    }

    if (!tiposCompativeis(insumoSelecionado.unidadeMedida, unidade)) {
      alert(
        `Unidade incompatível! O insumo 
        ${insumoSelecionado.nome} está cadastrado em 
        ${insumoSelecionado.unidadeMedida}, 
        mas você tentou usar ${unidade}.`
      );
      return;
    }

    const estoqueConvertido = converterParaBase(
      insumoSelecionado.quantidadeEstoque,
      insumoSelecionado.unidadeMedida
    );

    const quantidadeUsadaConvertida = converterParaBase(quantidade, unidade);

    if (quantidadeUsadaConvertida > estoqueConvertido) {
      alert(
        `Quantidade inválida! No estoque existem apenas 
        ${insumoSelecionado.quantidadeEstoque} 
        ${insumoSelecionado.unidadeMedida} 
        de ${insumoSelecionado.nome}.`
      );
      return;
    }

    const novoInsumo = {
      nome: insumoSelecionado.nome,
      idInsumo: insumoSelecionado.idInsumo,
      quantidade,
      unidade,
    };

    setInsumosUtilizados([...insumosUtilizados, novoInsumo]);
    setInsumoSelecionado("");
    setQuantidade("");
    setUnidade("");
    setPopupAberto(false);
  }

  function removerInsumo(index) {
    const novaLista = insumosUtilizados.filter((_, i) => i !== index);
    setInsumosUtilizados(novaLista);
  }

  async function cadastrarFicha() {
    if (!nomePreparo || !tipoEquipamento || !temperaturaMinima || !temperaturaMaxima) {
      alert("Preencha todos os campos da ficha!");
      return;
    }

    if (Number(temperaturaMinima) <= 0 || Number(temperaturaMaxima) <= 0) {
      alert("As temperaturas devem ser maiores que zero!");
      return;
    }

    if (Number(temperaturaMinima) > Number(temperaturaMaxima)) {
      alert("A temperatura mínima não pode ser maior que a máxima!");
      return;
    }

    if (insumosUtilizados.length === 0) {
      alert("Adicione pelo menos um insumo para cadastrar a ficha técnica!");
      return;
    }

    const ficha = {
      id: Date.now(),
      nomePreparo,
      tipoEquipamento,
      temperaturaMinima: Number(temperaturaMinima),
      temperaturaMaxima: Number(temperaturaMaxima),
      insumosUtilizados,
      dataCriacao: new Date().toISOString().split("T")[0],
    };

    try {
      const fichasSalvas = JSON.parse(localStorage.getItem("fichasTecnicas")) || [];
      fichasSalvas.push(ficha);
      localStorage.setItem("fichasTecnicas", JSON.stringify(fichasSalvas));

      alert("Ficha técnica cadastrada com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar ficha");
    }
  }

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        backgroundColor: "#b8ced8", 
        p: { xs: 2, sm: 5 },
        boxSizing: "border-box"
      }}
    >
      <Button
        startIcon={
          <ArrowBackIcon
            sx={{
              fontSize: { xs: 28, sm: 36 },
              stroke: "#2C3E50",
              strokeWidth: 2.5,
            }}
          />
        }
        onClick={() => navigate("/produtos")}
        sx={{
          color: "#2C3E50",
          textTransform: "none",
          fontSize: { xs: "18px", sm: "22px" },
          fontWeight: 700,
          mb: 2,
        }}
      >
        Voltar
      </Button>

      
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{ 
          color: "#2C3E50", 
          mb: { xs: 3, sm: 5 },
          fontSize: { xs: "26px", sm: "40px" } 
        }}
      >
        Adicionar Ficha Técnica
      </Typography>

      
      <Paper
        elevation={0}
        sx={{
          maxWidth: 850,
          mx: "auto",
          p: { xs: 3, sm: 4 },
          borderRadius: { xs: 4, sm: 6 },
          backgroundColor: "#efbc97",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" },
          gap: { xs: 2, sm: 4 },
          mb: 5,
          boxSizing: "border-box"
        }}
      >
        <Box
          sx={{
            width: { xs: 80, sm: 110 },
            height: { xs: 80, sm: 110 },
            borderRadius: 3,
            backgroundColor: "#ff8c42",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0
          }}
        >
          <AddIcon sx={{ fontSize: { xs: 50, sm: 70 } }} />
        </Box>

        <Box>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            sx={{ 
              color: "#d35400", 
              fontSize: { xs: "22px", sm: "30px" },
              mb: 0.5
            }}
          >
            Adicionar Ficha Técnica
          </Typography>

          <Typography sx={{ fontSize: { xs: 15, sm: 18 }, color: "#2C3E50", fontWeight: 500 }}>
            Preencha todos os campos abaixo para cadastrar o preparo desejado
          </Typography>
        </Box>
      </Paper>


      <Box sx={{ maxWidth: 850, mx: "auto" }}>
        
        <Typography 
          variant="h5" 
          sx={{ 
            color: "#2C3E50", 
            mb: 1, 
            fontWeight: 600, 
            fontSize: { xs: "16px", sm: "20px" } 
          }}>
          Nome do preparo:
        </Typography>
        <TextField
          fullWidth
          placeholder="Insira o nome do preparo"
          value={nomePreparo}
          onChange={(e) => setNomePreparo(e.target.value)}
          slotProps={{ input: { style: { color: "#2C3E50", fontWeight: 500, borderRadius: "8px" } } }}
          sx={{ 
            backgroundColor: "#fff", borderRadius: "8px", mb: 4,
            "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } }
          }}
        />

        
        <Typography variant="h5" 
          sx={{ 
            color: "#2C3E50", 
            mb: 1, 
            fontWeight: 600, 
            fontSize: { xs: "16px", sm: "20px" } 
          }}>
          Tipo de equipamento:
        </Typography>
        <TextField
          fullWidth
          placeholder="Insira o tipo de equipamento"
          value={tipoEquipamento}
          onChange={(e) => setTipoEquipamento(e.target.value)}
          slotProps={{ input: { style: { color: "#2C3E50", fontWeight: 500, borderRadius: "8px" } } }}
          sx={{ 
            backgroundColor: "#fff", borderRadius: "8px", mb: 4,
            "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } }
          }}
        />

        
        <Typography variant="h5" sx={{ color: "#2C3E50", mb: 1, fontWeight: 600, fontSize: { xs: "16px", sm: "20px" } }}>
          Temperatura Ideal:
        </Typography>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#efbc97",
            borderRadius: 4,
            p: { xs: 2, sm: 4 },
            mb: 5,
          }}
        >
          <Box 
            display="flex" 
            flexDirection={{ xs: "column", sm: "row" }} 
            justifyContent="center" 
            alignItems="center" 
            gap={2}
          >
            <TextField
              label="Mínima °C"
              type="number"
              value={temperaturaMinima}
              onChange={(e) => setTemperaturaMinima(e.target.value)}
              sx={{ backgroundColor: "#fff", borderRadius: 2, width: { xs: "100%", sm: 180 } }}
            />

            <Typography sx={{ fontSize: { xs: 20, sm: 26 }, fontWeight: "bold", color: "#2C3E50" }}>
              até
            </Typography>

            <TextField
              label="Máxima °C"
              type="number"
              value={temperaturaMaxima}
              onChange={(e) => setTemperaturaMaxima(e.target.value)}
              sx={{ backgroundColor: "#fff", borderRadius: 2, width: { xs: "100%", sm: 180 } }}
            />
          </Box>
        </Paper>

        
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 4,
            p: { xs: 2, sm: 3 },
            mb: 5,
            boxSizing: "border-box"
          }}
        >
          <Box 
            display="flex" 
            flexDirection={{ xs: "column", sm: "row" }} 
            justifyContent="space-between" 
            alignItems={{ xs: "stretch", sm: "center" }} 
            gap={2} 
            mb={3}
          >
            <Typography variant="h5" fontWeight="bold" 
              sx={{ 
                color: "#2C3E50", 
                fontSize: { xs: "18px", sm: "22px" } 
              }}>
              Insumos utilizados
            </Typography>

            <Button
              onClick={() => setPopupAberto(true)}
              startIcon={<AddIcon />}
              sx={{
                border: "2px solid #ff8c42",
                color: "#ff8c42",
                borderRadius: 2,
                px: 3,
                py: { xs: 1, sm: 0.5 },
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Adicionar Insumo
            </Button>
          </Box>

          
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ minWidth: { xs: 500, sm: "100%" } }}>
              <TableHead sx={{ backgroundColor: "#7996b4" }}>
                <TableRow>
                  <TableCell 
                    sx={{ 
                    color: "#fff", 
                    fontWeight: "bold" 
                    }}>
                    INSUMO
                  </TableCell>

                  <TableCell 
                    sx={{ 
                    color: "#fff", 
                    fontWeight: "bold" 
                    }}>
                    QUANTIDADE
                  </TableCell>

                  <TableCell 
                    sx={{ 
                    color: "#fff", 
                    fontWeight: "bold" 
                    }}>
                    UNIDADE
                  </TableCell>

                  <TableCell 
                    sx={{ 
                    color: "#fff", 
                    fontWeight: "bold" 
                    }}>
                    AÇÕES
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {insumosUtilizados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ color: "#2C3E50", py: 4 }}>
                      Nenhum insumo adicionado.
                    </TableCell>
                  </TableRow>
                ) : (
                  insumosUtilizados.map((insumo, index) => (
                    <TableRow key={index}>
                      <TableCell 
                        sx={{ 
                        color: "#2C3E50", 
                        fontWeight: 500 
                        }}>
                        {insumo.nome}
                      </TableCell>

                      <TableCell 
                        sx={{ 
                          color: "#2C3E50", 
                          fontWeight: 500 
                        }}>
                        {insumo.quantidade}
                      </TableCell>

                      <TableCell 
                        sx={{ 
                        color: "#2C3E50", 
                        fontWeight: 500 
                        }}>
                        {insumo.unidade}
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() => removerInsumo(index)}
                          sx={{ minWidth: 0, color: "#E8534A" }}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </Paper>

        
        <Box display="flex" justifyContent={{ xs: "stretch", sm: "flex-end" }}>
          <Button
            onClick={cadastrarFicha}
            fullWidth={{ xs: true, sm: false }}
            sx={{
              backgroundColor: "#ff8c42",
              color: "#fff",
              px: { xs: 4, sm: 8 },
              py: 1.5,
              borderRadius: 2,
              fontSize: { xs: 16, sm: 18 },
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 4px 10px rgba(255,140,66,0.3)",
              "&:hover": {
                backgroundColor: "#f47c2d",
              },
            }}
          >
            Cadastrar Ficha
          </Button>
        </Box>
      </Box>

      
      <Dialog
        open={popupAberto}
        onClose={() => setPopupAberto(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            width: { xs: "95%", sm: 460 },
            mx: "auto",
            p: { xs: 1, sm: 2 },
            boxShadow: { xs: "0px 8px 24px rgba(0,0,0,0.15)", sm: "-12px 12px 0px #7996b4" },
          },
        }}
      >
        <DialogContent>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#2C3E50", mb: 3, fontSize: "20px" }}>
            Adicionar Insumo
          </Typography>

          <Typography sx={{ color: "#2C3E50", mb: 1, fontWeight: 500 }}>
            Selecione o insumo:
          </Typography>
            
          <TextField
            select
            fullWidth
            value={insumoSelecionado}
            onChange={(e) => setInsumoSelecionado(e.target.value)}
            sx={{ mb: 2 }}
          >
            {insumosCadastrados.map((insumo) => (
              <MenuItem key={insumo.idInsumo} value={insumo}>
                {insumo.nome}
              </MenuItem>
            ))}
          </TextField>

          {insumoSelecionado && (
            <Typography
              sx={{
                color: "#d35400",
                fontSize: "14px",
                fontWeight: "bold",
                mb: 3,
                mt: -1
              }}
            >
              Estoque disponível: {insumoSelecionado.quantidadeEstoque} {insumoSelecionado.unidadeMedida}
            </Typography>
          )}

          <Typography sx={{ color: "#2C3E50", mb: 1, fontWeight: 500 }}>
            Quantidade:
          </Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="Insira a quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography sx={{ color: "#2C3E50", mb: 1, fontWeight: 500 }}>
            Unidade:
          </Typography>
          <TextField
            select
            fullWidth
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            sx={{ mb: 4 }}
          >
            <MenuItem value="g">g</MenuItem>
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="ml">ml</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="UND">UND</MenuItem>
          </TextField>

          <Box display="flex" justifyContent={{ xs: "stretch", sm: "flex-end" }}>
            <Button
              onClick={adicionarInsumo}
              fullWidth={{ xs: true, sm: false }}
              sx={{
                backgroundColor: "#ff8c42",
                color: "#fff",
                px: 5,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f47c2d",
                },
              }}
            >
              Adicionar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CadastroFichaTecnica;