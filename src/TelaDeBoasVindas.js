import React from 'react';
import imagemLogin from "./Logo_SmartCuisine.png";
import imagemHome from "./tela_home_smartcuisine.png"
import { Box, Typography, Button, Container, Grid, AppBar, Toolbar } from '@mui/material';

function TelaDeBoasVindas({ irParaLogin, irParaCadastro }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        // Gradiente linear suave conforme a imagem
        background: 'linear-gradient(135deg, #e0eafc 0%, #f7faff 50%, #fbdec6 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header com Botão Entrar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ p: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ 
            width: "70px" ,
            display: 'flex', 
            alignItems: 'center', 
            gap: 1 
            }}>
            <img
              src={imagemLogin} 
              alt="logo smartcuisine"
              style={{ width: "70px" }}
            />
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              letterSpacing: 1 }}>
            
            SMARTCUISINE
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            onClick={irParaLogin}
            sx={{ 
              backgroundColor: '#f6ad76', 
              color: '#000', 
              borderRadius: '20px',
              textTransform: 'none',
              px: 4,
              '&:hover': { backgroundColor: '#e59a65' }
            }}
          >
            Entrar
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', py: 2 }}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap"> {/* wrap="nowrap" impede que a imagem desça */}
          
          {/* LADO ESQUERDO: TEXTOS */}
          <Grid item md={6} sx={{ minWidth: '50%' }}> {/* Força ocupar metade */}
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 800, 
              mb: 3, 
              color: '#1a1a1a', 
              lineHeight: 1.1,
              maxWidth: '500px' // Limita a largura do título para não empurrar a imagem
            }}>
              Chega de desperdício:<br />
              Organize a sua cozinha com inteligência!
            </Typography>
            
            <Typography variant="body1" sx={{ 
              mb: 4, 
              color: '#555', 
              fontSize: '1.1rem', 
              maxWidth: '400px' // Limita a largura da descrição
            }}>
              Utilize os nossos recursos de monitoramento de temperatura, relatórios semanais e segurança para as suas produções e transforme a sua cozinha.
            </Typography>

            <Button 
              variant="contained" 
              onClick={irParaCadastro}
              sx={{ 
                backgroundColor: '#f6ad76', 
                color: '#000', 
                borderRadius: '25px', 
                px: 6, 
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#e59a65' }
              }}
            >
              Cadastre-se
            </Button>
          </Grid>

          {/* Lado Direito: Imagem (Mockup) */}
          <Grid item md={6} 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '100%'
            }}
            >
            <Box 
              sx={{ 
                width: '100%', 
                maxWidth: '650px', // Aumentei o limite máximo consideravelmente
                height: 'auto',
                filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.15))',
                padding: 2, // Um padding interno para a imagem "respirar"
                display: 'flex', 
                justifyContent: 'center'
              }}
              > 
              <img
                src={imagemHome} 
                alt="home smartcuisine"
                style={{ 
                  width: "100%", // Força a imagem a ocupar 100% do Box pai
                  height: "auto",
                  borderRadius: '40px', // Leve arredondado nas bordas da imagem
                  objectFit: 'contain' // Garante que ela não distorça
                }}
              />
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default TelaDeBoasVindas;