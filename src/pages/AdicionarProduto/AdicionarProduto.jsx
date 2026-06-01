import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdicionarProduto() {
  
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#b8ced8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 5,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          color: "#7996b4",
          mb: 5,
        }}
      >
        Adicionar Produto
      </Typography>

      <Paper
        elevation={0}
        sx={{
          width: "70%",
          maxWidth: 700,
          borderRadius: 8,
          p: 5,
          boxShadow: "-12px 12px 0px #7996b4",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#7996b4",
            mb: 4,
          }}
        >
          Que tipo de produto você pretende cadastrar?
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Button
            onClick={() => navigate("/insumos/novo")}
            sx={{
              justifyContent: "flex-start",
              border: "2px solid black",
              borderRadius: 5,
              color: "black",
              fontSize: 22,
              textTransform: "none",
            }}
          >
            ○ Insumo
          </Button>

          <Button
            onClick={() => navigate("/equipamentos/novo")}
            sx={{
              justifyContent: "flex-start",
              border: "2px solid black",
              borderRadius: 5,
              color: "black",
              fontSize: 22,
              textTransform: "none",
            }}
          >
            ○ Equipamento
          </Button>

          <Button
            onClick={() => navigate("/fichas-tecnicas/novo")}
            sx={{
              justifyContent: "flex-start",
              border: "2px solid black",
              borderRadius: 5,
              color: "black",
              fontSize: 22,
              textTransform: "none",
            }}
          >
            ○ Ficha
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AdicionarProduto;