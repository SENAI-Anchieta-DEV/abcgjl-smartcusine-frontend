import React from 'react'; // Corrigido de 'mport' para 'import'
import { Box, Typography, Grid, Card, CardContent, Button, Chip, Stack, Alert, Container } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
  const temperaturas = [
    {   local: 'Geladeira Principal', 
        ideal: '2-4°C',
        atual: '4', 
        status: 'Normal', 
        color: '#1976d2' 
    },
    {   local: 'Freezer', 
        ideal: '-18°C', 
        atual: '-18', 
        status: 'Normal', 
        color: '#1976d2' 
    },
    {   local: 'Área de preparo', 
        ideal: '18-22°C', 
        atual: '22', 
        status: 'Normal', 
        color: '#ed6c02' 
    },
    {   local: 'Forno', 
        ideal: '180-200°C', 
        atual: '200', 
        status: 'Normal', 
        color: '#ef5350' 
    },
  ];

  const alimentos = [
    {   nome: 'Frango Grelhado', 
        categoria: 'Carnes', 
        validade: '18/03/2026', 
        dias: '2 dias', 
        status: 'Crítico', 
        statusColor: 'warning' 
    },
    {   nome: 'Salada Caesar', 
        categoria: 'Vegetais', 
        validade: '16/03/2026',
        dias: 'Vence hoje', 
        status: 'Crítico', 
        statusColor: 'warning' 
    },
    {   nome: 'Leite Integral', 
        categoria: 'Laticínios', 
        validade: '19/03/2026', 
        dias: '4 dias', 
        status: 'Atenção', 
        statusColor: 'default' 
    },
  ];

  const filtros = ['Todos (6)', 'Em Preparo (0)', 'Críticos (3)', 'Vencidos (1)', 'Prontos (5)'];

  return (
    <Box sx={{ 
        backgroundColor: "#d8e0e8", 
        minHeight: "100vh",         
        width: "100%",
        pt: 4,                      
        pb: 4
        }}>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box>
            {/* --- 1. ALERTAS DE TOPO --- */}
            <Stack spacing={2} sx={{ mb: 4 }}>
            <Alert severity="error" variant="outlined" sx={{ backgroundColor: 'background.paper', borderRadius: 2 }}>
                <Typography fontWeight="bold">Alimentos Vencidos</Typography>
                1 Item vencido precisa ser removido da cozinha.
            </Alert>
            <Alert severity="warning" variant="outlined" sx={{ backgroundColor: 'background.paper', borderRadius: 2 }}>
                <Typography fontWeight="bold">Atenção: Validade Próxima</Typography>
                1 Item com validade próxima precisa de atenção.
            </Alert>
            </Stack>

            {/* --- 2. TÍTULO MONITORAMENTO --- */}
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
            Monitoramento de Temperatura
            </Typography>
            
            {/* --- 3. CARDS DE TEMPERATURA --- */}
           <Grid container spacing={7} sx={{ mb: 5 }} justifyContent="center">
                {temperaturas.map((temp, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} display="flex" justifyContent="center">
                        <Card 
                            sx={{ 
                            borderRadius: '32px', // Arredondamento um pouco maior
                            boxShadow: '0px 4px 20px rgba(0,0,0,0.08)', 
                            width: '300px', 
                            maxWidth: '350px', // Aumentado de 280px para 350px
                            minHeight: '220px', // Definida uma altura mínima para dar corpo ao card
                            overflow: 'hidden', 
                            backgroundColor: 'background.paper',
                            display: 'flex',
                            transition: 'transform 0.2s', // Efeito hover básico
                            '&:hover': { transform: 'scale(1.02)' }
                            }}
                        >
                            
                            <Box 
                            sx={{ 
                                width: '10px', // Largura da barrinha
                                backgroundColor: temp.color, 
                                height: '100%', 
                                borderRadius: '24px 0 0 24px' // Arredonda só os cantos da esquerda
                            }} 
                            />

                            {/* Conteúdo do Card Centralizado */}
                            <CardContent 
                            sx={{ 
                                flexGrow: 1, 
                                textAlign: 'center', // Centraliza todo o texto
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: '20px !important' // Ajusta o padding interno
                            }}
                            >
                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                {temp.local}
                            </Typography>
                            
                            <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.7rem' }}>
                                Ideal: {temp.ideal}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mt: 1.5, mb: 1 }}>
                                {/* H2 para o número bem grande, alinhado com o °C menor */}
                                <Typography variant="h2" fontWeight="bold" color="text.primary" sx={{ lineHeight: 1 }}>
                                {temp.atual}
                                </Typography>
                                <Typography variant="h5" color="text.primary" sx={{ ml: 0.5 }}>
                                °C
                                </Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7, fontWeight: 500 }}>
                                {temp.status}
                            </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* --- 4. FILTROS --- */}
            <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
                mb: 4, 
                overflowX: 'auto', 
                pb: 1, 
                justifyContent: { xs: 'flex-start', sm: 'center' },
                '&::-webkit-scrollbar': { height: '6px' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '3px' }
            }}
            >
            {filtros.map((label, i) => (
                <Chip 
                key={i} 
                label={label} 
                clickable 
                variant={i === 0 ? "filled" : "outlined"} 
                color={i === 0 ? "primary" : "default"}
                sx={{ px: 1, fontWeight: 'bold', fontSize: '0.85rem' }}
                />
            ))}
            </Stack>

            {/* --- 5. GRID DE ALIMENTOS --- */}
            <Grid container spacing={3} justifyContent="center">
            {alimentos.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                <Card sx={{ borderRadius: 4, boxShadow: 3, width: '100%', maxWidth: '360px' }}>
                    <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>{item.nome}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.categoria}</Typography>
                        </Box>
                        <Chip label={item.status} color={item.statusColor} size="small" sx={{ fontWeight: 'bold' }} />
                    </Box>
                    
                    <Stack direction="row" spacing={2} sx={{ mb: 2, color: 'text.secondary' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon fontSize="small" color="disabled" />
                        <Typography variant="caption">{item.validade}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="caption" fontWeight="bold" color={item.status === 'Crítico' ? 'error.main' : 'text.secondary'}>
                            ⚠️ {item.dias}
                        </Typography>
                        </Box>
                    </Stack>
                    
                    <Button 
                        variant="outlined" 
                        fullWidth 
                        size="small" 
                        startIcon={<EditIcon />}
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                    >
                        Editar
                    </Button>
                    </CardContent>
                </Card>
                </Grid>
            ))}
            </Grid>
        </Box>
        </Container> 
    </Box>
  );
}

export default Dashboard;