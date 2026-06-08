import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeviceThermostatRoundedIcon from "@mui/icons-material/DeviceThermostatRounded";

function Equipamentos() {

    const navigate = useNavigate();
    const [equipamento, setEquipamento] = useState("");

    const equipamentos = {
    freezer: {
        categoria: "Refrigeração",
        tempMin: -25,
        tempMax: -18,
    },

    camara_fria: {
        categoria: "Refrigeração",
        tempMin: 0,
        tempMax: 5,
    },

    forno_combinado: {
        categoria: "Aquecimento",
        tempMin: 80,
        tempMax: 250,
    },

    fogao_industrial: {
        categoria: "Aquecimento",
        tempMin: 100,
        tempMax: 300,
    },
    };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #c9d9e7 0%, #b7c9d9 100%)",
      }}
    >
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 3,
          py: 4,
        }}
      >
        
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#6d86a3",
            mb: 3,
          }}
        >
          Adicionar Equipamento
        </Typography>

        
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "#eab996",
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            gap: 3,
            p: 2.5,
            mb: 4,
          }}
        >
          
          <Box
            sx={{
              width: 75,
              height: 75,
              borderRadius: "18px",
              backgroundColor: "#ff8c42",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AddRoundedIcon
              sx={{
                fontSize: 55,
                color: "white",
              }}
            />
          </Box>

         
          <Box>
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#ef7f2d",
                mb: 0.5,
              }}
            >
              Adicionar Equipamento
            </Typography>

            <Typography
              sx={{
                fontSize: "1rem",
                color: "#1f1f1f",
                lineHeight: 1.4,
              }}
            >
              Preencha todos os campos abaixo para
              <br />
              cadastrar o equipamento desejado
            </Typography>
          </Box>
        </Paper>

        
        <Box
          sx={{
            width: "100%",
            maxWidth: "700px",
          }}
        >
          
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "#6d86a3",
              mb: 1,
            }}
          >
            Equipamento:
          </Typography>

          <TextField
                select
                fullWidth
                label="Equipamento"
                value={equipamento}
                onChange={(e) => setEquipamento(e.target.value)}

                sx={{
                    mb: 3,

                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: "18px",
                        height: "50px",
                        fontSize: "1rem",
                    },

                    "& input::placeholder": {
                        color: "#9cb1c7",
                        opacity: 1,
                    },
                }}
            >
                <MenuItem value="freezer">Freezer</MenuItem>
                <MenuItem value="camara_fria">Câmara Fria</MenuItem>
                <MenuItem value="forno_combinado">Forno Combinado</MenuItem>
                <MenuItem value="fogao_industrial">Fogão Industrial</MenuItem>
            </TextField>

            
            {equipamento && (
            <>
                <Typography
                sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#6d86a3",
                    mt: 3,
                    mb: 1,
                }}
                >
                Categoria:
                </Typography>

                <TextField
                fullWidth
                value={equipamentos[equipamento].categoria}
                disabled
                
                sx={{
                    mb: 3,

                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: "18px",
                        height: "50px",
                        fontSize: "1rem",
                    },

                    "& input::placeholder": {
                        color: "#9cb1c7",
                        opacity: 1,
                    },
                }}
                />
            </>
            )}

            
            {equipamento && (
            <>
                <Typography
                sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#6d86a3",
                    mt: 3,
                    mb: 1,
                }}
                >
                Temperatura Ideal:
                </Typography>

                <Paper
                elevation={0}
                sx={{
                    backgroundColor: "#eab996",
                    borderRadius: "25px",
                    p: 4,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
                >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                    >
                    <DeviceThermostatRoundedIcon
                        sx={{
                        fontSize: 40,
                        color: "white",
                        }}
                    />
                </Box>

                <Typography
                    sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    }}
                >
                    {equipamentos[equipamento].tempMin}°C
                </Typography>

                 
                <Box
                sx={{
                    width: "80px",
                    height: "5px",
                    backgroundColor: "#ff8c42",
                    borderRadius: "10px",
                }}
                />

                <Typography
                    sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    }}
                >
                    {equipamentos[equipamento].tempMax}°C
                </Typography>

                <DeviceThermostatRoundedIcon
                sx={{
                  fontSize: 40,
                  color: "white",
                }}
                />
                </Paper>
            </>
            )}

          {/* BOTÃO */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/produtos")}
              sx={{
                backgroundColor: "#ff8c42",
                width: "150px",
                height: "45px",
                borderRadius: "12px",
                fontSize: "1rem",
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#ef7f2d",
                  boxShadow: "none",
                },
              }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Equipamentos;