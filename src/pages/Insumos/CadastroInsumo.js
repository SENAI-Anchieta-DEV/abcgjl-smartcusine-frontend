import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogContent
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function CadastroInsumo() {
  const [unidade, setUnidade] = useState("");
  const [popupAberto, setPopupAberto] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#b8ced8", p: 5 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{ color: "#7996b4", mb: 5 }}
      >
        Adicionar Insumo
      </Typography>

      <Paper
        elevation={0}
        sx={{
          maxWidth: 850,
          mx: "auto",
          p: 4,
          borderRadius: 8,
          backgroundColor: "#efbc97",
          display: "flex",
          alignItems: "center",
          gap: 4,
          mb: 5,
        }}
      >
        <Box
          sx={{
            width: 110,
            height: 110,
            borderRadius: 4,
            backgroundColor: "#ff8c42",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <AddIcon sx={{ fontSize: 90 }} />
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#ff8c42" }}>
            Adicionar Insumo
          </Typography>
          <Typography fontSize={22}>
            Preencha todos os campos abaixo para cadastrar o insumo desejado
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ maxWidth: 950, mx: "auto" }}>
        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Nome do Insumo:
        </Typography>

        <TextField
          fullWidth
          placeholder="Insira o nome do Insumo"
          sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
        />

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Unidade do Insumo:
        </Typography>

        <RadioGroup
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          sx={{ mb: 4 }}
        >
          <FormControlLabel value="kg" control={<Radio />} label="Quilograma" />
          <FormControlLabel value="mg" control={<Radio />} label="Miligrama" />
        </RadioGroup>

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Quantidade de Insumo:
        </Typography>

        <TextField
          fullWidth
          placeholder="Insira a quantidade de Insumo"
          type="number"
          sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
        />

        <Typography variant="h5" sx={{ color: "#7996b4", mb: 1 }}>
          Data de validade:
        </Typography>

        <TextField
          fullWidth
          type="date"
          sx={{ backgroundColor: "#fff", borderRadius: 10, mb: 4 }}
        />

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#efbc97",
            borderRadius: 6,
            p: 3,
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography variant="h5" color="#fff" mb={3}>
            Esse insumo vai para algum preparo específico?
          </Typography>

          <Box display="flex" justifyContent="center" gap={20}>
            <Button
              sx={{
                backgroundColor: "#ff2d2d",
                color: "#fff",
                px: 5,
                textTransform: "none",
              }}
            >
              Não
            </Button>

            <Button
              onClick={() => setPopupAberto(true)}
              sx={{
                backgroundColor: "#ff8c42",
                color: "#fff",
                px: 5,
                textTransform: "none",
              }}
            >
              Sim
            </Button>
          </Box>
        </Paper>

        <Box display="flex" justifyContent="flex-end">
          <Button
            sx={{
              backgroundColor: "#ff8c42",
              color: "#fff",
              px: 8,
              py: 1.5,
              borderRadius: 3,
              fontSize: 20,
              textTransform: "none",
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>

      <Dialog
        open={popupAberto}
        onClose={() => setPopupAberto(false)}
        PaperProps={{
          sx: {
            borderRadius: 8,
            width: 560,
            p: 2,
            boxShadow: "-14px 14px 0px #7996b4",
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" sx={{ color: "#7996b4", mb: 1 }}>
            Nome do preparo:
          </Typography>

          <TextField
            fullWidth
            placeholder="Insira o nome do preparo"
            size="small"
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ color: "#7996b4", mb: 1 }}>
            Quantidade que vai para esse preparo:
          </Typography>

          <TextField
            fullWidth
            placeholder="Insira a quantidade necessária para o preparo"
            size="small"
            type="number"
            sx={{ mb: 4 }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => setPopupAberto(false)}
              sx={{
                backgroundColor: "#7996b4",
                color: "#fff",
                textTransform: "none",
                px: 4,
              }}
            >
              Continuar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CadastroInsumo;