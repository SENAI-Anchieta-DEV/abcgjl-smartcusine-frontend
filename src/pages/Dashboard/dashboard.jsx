import React, { useState } from 'react'; 
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Stack, 
  Alert, 
  Container,
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';

const obterStatusValidade = (dataValidadeStr) => {
  if (!dataValidadeStr) return { texto: 'Sem data', cor: 'text.secondary', status: 'Atenção', chipColor: 'default' };

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataValidade = new Date(dataValidadeStr + 'T00:00:00');

    const diferencaTempo = dataValidade.getTime() - hoje.getTime();
    const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

    if (diferencaDias < 0) {
      const diasVencidos = Math.abs(diferencaDias);
      return {
        texto: `Venceu há ${diasVencidos} ${diasVencidos === 1 ? 'dia' : 'dias'}`,
        cor: 'error.main',
        status: 'Vencido',
        chipColor: 'error'
      };
    } else if (diferencaDias === 0) {
      return {
        texto: 'Vence hoje',
        cor: 'error.main',
        status: 'Vencido', 
        chipColor: 'error'
      };
    } else if (diferencaDias <= 3) {
      return {
        texto: `${diferencaDias} ${diferencaDias === 1 ? 'dia restante' : 'dias restantes'}`,
        cor: 'warning.main',
        status: 'Crítico',
        chipColor: 'warning'
      };
    } else {
      return {
        texto: `${diferencaDias} dias restantes`,
        cor: 'text.secondary',
        status: 'Atenção',
        chipColor: 'info'
      };
    }
  };

function Dashboard() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  const temperaturas = [
    { local: 'Geladeira Principal', ideal: '2-4°C', atual: '4', status: 'Normal', color: '#1976d2' },
    { local: 'Freezer', ideal: '-18°C', atual: '-18', status: 'Normal', color: '#1976d2' },
    { local: 'Área de preparo', ideal: '18-22°C', atual: '22', status: 'Normal', color: '#ed6c02' },
    { local: 'Forno', ideal: '180-200°C', atual: '200', status: 'Normal', color: '#ef5350' },
  ];

  const [alimentos, setAlimentos] = useState([
    {id: 1, nome: 'Frango Grelhado', categoria: 'Carnes', validade: 'YYYY-MM-DD'},
    {id: 2,nome: 'Salada Caesar', categoria: 'Vegetais', validade: 'YYYY-MM-DD'}, 
    {id: 3, nome: 'Leite Integral', categoria: 'Laticínios', validade: 'YYYY-MM-DD'},
    {id: 4, nome: 'Filé mignon', categoria: 'Carnes', validade: 'YYYY-MM-DD'},
    {id: 5, nome: 'Arroz arboreo', categoria: 'Grão', validade: 'YYYY-MM-DD'},
    {id: 6, nome: 'Queijo minas', categoria: 'Laticínios', validade: 'YYYY-MM-DD'},
    {id: 7, nome: 'Macarrão', categoria: 'Massas', validade: 'YYYY-MM-DD'},
    {id: 8, nome: 'Carne moída', categoria: 'Carnes', validade: 'YYYY-MM-DD'},
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [alimentoEditando, setAlimentoEditando] = useState(null);

  const alimentosCalculados = alimentos.map(item => {
    const infoValidade = obterStatusValidade(item.validade);
    return {
      ...item,
      textoDias: infoValidade.texto,
      corDias: infoValidade.cor,
      status: infoValidade.status,
      statusColor: infoValidade.chipColor
    };
  });

  
  const totalVencidos = alimentosCalculados.filter(item => item.status === 'Vencido').length;
  const totalCriticos = alimentosCalculados.filter(item => item.status === 'Crítico').length;

  const categoriasFiltro = ['Todos', 'Crítico', 'Vencido', 'Atenção'];

  const alimentosFiltrados = alimentosCalculados.filter((item) => {
    if (filtroAtivo === 'Todos') return true;
    return item.status === filtroAtivo; 
  });

  const formatarDataBR = (dataStr) => {
    if (!dataStr) return '';
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const handleAbrirEditar = (alimento) => {
    setAlimentoEditando({ ...alimento });
    setModalAberto(true);
  };

  const handleFecharEditar = () => {
    setModalAberto(false);
    setAlimentoEditando(null);
  };

  const handleSalvarEdicao = () => {
    setAlimentos(alimentos.map(item => 
      item.id === alimentoEditando.id ? alimentoEditando : item
    ));
    handleFecharEditar();
  };

  return (
    <Box sx={{ 
      backgroundColor: '#b8ced890', 
      minHeight: '100vh', 
      pt: 2, 
      pb: 6, 
      maxWidth: '1300px',
      mx: 'auto',         
      width: '100%',
      borderRadius: 5
      }}>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box>
          <Stack spacing={2} sx={{ mb: 4 }}>
            {totalVencidos > 0 && (
              <Alert 
                severity="error" 
                variant="outlined" 
                sx={{ backgroundColor: 'background.paper', borderRadius: 2 }}
              >
                <Typography fontWeight="bold">
                  Alimentos Vencidos
                </Typography>

                {totalVencidos} 
                {totalVencidos === 1 ? 'item vencido precisa' : 'itens vencidos precisam'} 
                ser removidos da cozinha.
              </Alert>
            )}
              
            {totalCriticos > 0 && (
              <Alert 
                severity="warning" 
                variant="outlined" 
                sx={{ backgroundColor: 'background.paper', borderRadius: 2 }}
              >
                <Typography fontWeight="bold">
                  Atenção: Validade Próxima
                </Typography>
                {totalCriticos} 
                {totalCriticos === 1 ? 'item com validade próxima precisa' : 'itens com validade próxima precisam'} 
                de atenção.
              </Alert>
            )}
          </Stack>

          <Typography 
            variant="h5" 
            fontWeight="bold"   
            gutterBottom 
            sx={{ 
              color: "#2C3E50", 
              mb: 3 
            }}>
            Monitoramento de Temperatura
          </Typography>
              
          <Grid container spacing={3} sx={{ mb: 6 }} justifyContent="center">
            {temperaturas.map((temp, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                    borderRadius: '24px', 
                    boxShadow: '0px 10px 30px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    height: '100%',
                    overflow: 'hidden', 
                    backgroundColor: 'background.paper',
                    display: 'flex', 
                    flexDirection: 'column', 
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)', 
                    boxShadow: '0px 15px 35px rgba(0,0,0,0.1)' }
                }}
                >
                <Box sx={{ height: '6px', backgroundColor: temp.color, width: '100%' }} />
                <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
                  <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                    {temp.local}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', my: 1 }}>
                    <Typography variant="h3" fontWeight="800" color="text.primary">
                      {temp.atual}
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ ml: 0.5 }}>
                      °C
                    </Typography>
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

          
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            gutterBottom 
            sx={{ 
              color: "#2C3E50", 
              mb: 1 
            }}>
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
              <Typography sx={{ mt: 4, color: 'text.secondary' }}>
                Nenhum item encontrado para este filtro.
              </Typography>
            ) : (
                alimentosFiltrados.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                  <Card sx={{ borderRadius: 4, boxShadow: 3, width: '100%', maxWidth: '360px' }}>

                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                            {item.nome}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary">
                            {item.categoria}
                          </Typography>
                        </Box>

                        <Chip label={item.status} color={item.statusColor} size="small" sx={{ fontWeight: 'bold' }} />
                      </Box>
                        
                      <Stack direction="row" spacing={2} sx={{ mb: 2, color: 'text.secondary' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon fontSize="small" color="disabled" />
                          <Typography variant="caption">
                            {formatarDataBR(item.validade)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="caption" fontWeight="bold" color={item.corDias}>
                            ⚠️ {item.textoDias}
                          </Typography>
                        </Box>
                      </Stack>
                        
                      <Button 
                        variant="outlined" fullWidth size="small" startIcon={<EditIcon />}
                        onClick={() => handleAbrirEditar(item)}
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
      
        <Dialog 
          open={modalAberto} 
          onClose={handleFecharEditar}
          PaperProps={{ sx: { borderRadius: '16px', p: 1, width: '100%', maxWidth: '450px' } }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>
            Editar Preparo
          </DialogTitle>
          
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Altere as informações do insumo ou prato selecionado.
            </Typography>

            {alimentoEditando && (
              <Stack spacing={2.5}>
                <TextField
                  label="Nome do Alimento/Preparo"
                  fullWidth
                  variant="outlined"
                  value={alimentoEditando.nome}
                  onChange={(e) => setAlimentoEditando({ ...alimentoEditando, nome: e.target.value })}
                />

                <TextField
                  label="Categoria"
                  fullWidth
                  variant="outlined"
                  value={alimentoEditando.categoria}
                  onChange={(e) => setAlimentoEditando({ ...alimentoEditando, categoria: e.target.value })}
                />

                <TextField
                  label="Data de Validade"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={alimentoEditando.validade}
                  onChange={(e) => setAlimentoEditando({ ...alimentoEditando, validade: e.target.value })}
                />
              </Stack>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2, pt: 1 }}>
            <Button 
              onClick={handleFecharEditar} 
              variant="text" 
              sx={{ textTransform: 'none', fontWeight: 'bold', color: 'text.secondary' }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSalvarEdicao} 
              variant="contained" 
              disableElevation
              sx={{
                textTransform: 'none', 
                fontWeight: 'bold', 
                borderRadius: '8px', 
                px: 3,
                backgroundColor: '#ff8c42',
              }}
            >
              Salvar Alterações
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Dashboard;