import React, { useState } from 'react'; 
import { Box, Typography, Grid, Card, CardContent, Button, Chip, Stack, Alert, Container } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  const temperaturas = [
    { local: 'Geladeira Principal', ideal: '2-4°C', atual: '4', status: 'Normal', color: '#1976d2' },
    { local: 'Freezer', ideal: '-18°C', atual: '-18', status: 'Normal', color: '#1976d2' },
    { local: 'Área de preparo', ideal: '18-22°C', atual: '22', status: 'Normal', color: '#ed6c02' },
    { local: 'Forno', ideal: '180-200°C', atual: '200', status: 'Normal', color: '#ef5350' },
  ];

  const alimentos = [
    { nome: 'Frango Grelhado', categoria: 'Carnes', validade: '18/03/2026', dias: '2 dias', status: 'Crítico', statusColor: 'warning' },
    { nome: 'Salada Caesar', categoria: 'Vegetais', validade: '16/03/2026', dias: 'Vence hoje', status: 'Vencido', statusColor: 'error' }, 
    { nome: 'Leite Integral', categoria: 'Laticínios', validade: '19/03/2026', dias: '4 dias', status: 'Atenção', statusColor: 'default' },
    { nome: 'Filé mignon', categoria: 'Carnes', validade: '19/03/2026', dias: '3 dias', status: 'Atenção', statusColor: 'default' },
    { nome: 'Arroz arboreo', categoria: 'Grão', validade: '27/03/2026', dias: '7 dias', status: 'Atenção', statusColor: 'default' },
    { nome: 'Queijo minas', categoria: 'Laticínios', validade: '06/03/2026', dias: 'Vence hoje', status: 'Vencido', statusColor: 'error' },
    { nome: 'Macarrão', categoria: 'Massas', validade: '12/03/2026', dias: 'Vence hoje', status: 'Vencido', statusColor: 'error' },
    { nome: 'Carne moída', categoria: 'Carnes', validade: '21/03/2026', dias: '5 dias', status: 'Atenção', statusColor: 'default' },
  ];

  const categoriasFiltro = ['Todos', 'Crítico', 'Vencido', 'Atenção'];

  const alimentosFiltrados = alimentos.filter((item) => {
    if (filtroAtivo === 'Todos') return true; // Mostra tudo
    return item.status === filtroAtivo; 
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box>
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

            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
                Monitoramento de Temperatura
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 6 }} justifyContent="center">
                {temperaturas.map((temp, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card 
                    sx={{ 
                        borderRadius: '24px', boxShadow: '0px 10px 30px rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.05)', height: '100%',
                        overflow: 'hidden', backgroundColor: 'background.paper',
                        display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease',
                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0px 15px 35px rgba(0,0,0,0.1)' }
                    }}
                    >
                    <Box sx={{ height: '6px', backgroundColor: temp.color, width: '100%' }} />
                    <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
                            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                            {temp.local}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', my: 1 }}>
                                <Typography variant="h3" fontWeight="800" color="text.primary">{temp.atual}</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ ml: 0.5 }}>°C</Typography>
                            </Box>

                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                <Box sx={{ 
                                    width: 8, height: 8, borderRadius: '50%', 
                                    backgroundColor: temp.status === 'Normal' ? '#4caf50' : '#f44336' 
                                }} />
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    Ideal: {temp.ideal} • {temp.status}
                                </Typography>
                            </Stack>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>

        
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'text.primary', mb: 1 }}>
            Controle de Validade e Estoque
          </Typography>

          <Stack 
            direction="row" spacing={1.5} 
            sx={{ 
              mb: 5, mt: 2, overflowX: 'auto', pb: 1, 
              justifyContent: { xs: 'flex-start', sm: 'center' },
              '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none',
            }}
          >
            {categoriasFiltro.map((label, i) => {
             
              const isSelected = filtroAtivo === label; 
              
              return (
                <Chip 
                  key={i} 
                  label={label} 
                  clickable 
                  onClick={() => setFiltroAtivo(label)} 
                  variant={isSelected ? "filled" : "outlined"} 
                  color={isSelected ? "primary" : "default"}
                  sx={{ 
                    px: 1.5, py: 2, fontWeight: isSelected ? 'bold' : 500, fontSize: '0.85rem',
                    borderRadius: '12px', transition: 'all 0.2s',
                    backgroundColor: isSelected ? 'primary.main' : 'background.paper',
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    '&:hover': {
                      backgroundColor: isSelected ? 'primary.dark' : 'rgba(0,0,0,0.04)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                />
              );
            })}
          </Stack>

          <Grid container spacing={3} justifyContent="center">
            
            {alimentosFiltrados.length === 0 ? (
                <Typography sx={{ mt: 4, color: 'text.secondary' }}>Nenhum item encontrado para este filtro.</Typography>
            ) : (
                alimentosFiltrados.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                    <Card sx={{ borderRadius: 4, boxShadow: 3, width: '100%', maxWidth: '360px' }}>

                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'flex-start', mb: 2 }}>
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
                            <Typography variant="caption" fontWeight="bold" color={item.status === 'Crítico' || item.status === 'Vencido' ? 'error.main' : 'text.secondary'}>
                            ⚠️ {item.dias}
                            </Typography>
                        </Box>
                        </Stack>
                        
                        <Button 
                            variant="outlined" fullWidth size="small" startIcon={<EditIcon />}
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                            >
                            Editar
                        </Button>
                    </CardContent>
                    </Card>
                </Grid>
                ))
            )}
          </Grid>
        </Box>
    </Container>
  );
}

export default Dashboard;