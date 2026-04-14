import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';

function TelaDeBoasVindas({ irParaLogin, irParaCadastro }) {
  return (
   <Container maxWidth="md">
      <Box 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center' 
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
          SmartCuisine
        </Typography>
        
        <Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
          A gestão inteligente para sua cozinha começar agora.
        </Typography>

        <Stack direction="row" spacing={2}>
          {/* 2. Chamamos as funções nos cliques dos botões */}
          <Button 
            variant="contained" 
            size="large" 
            onClick={irParaCadastro}
          >
            Cadastrar
          </Button>
          
          <Button 
            variant="outlined" 
            size="large" 
            onClick={irParaLogin}
          >
            Entrar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default TelaDeBoasVindas;