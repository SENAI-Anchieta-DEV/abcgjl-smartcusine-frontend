import React from 'react';
import {
  Box, 
  Typography, 
  Button, 
  Grid, 
  AppBar, 
  Container, 
  Toolbar, 
  Paper,       
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MenuIcon from '@mui/icons-material/Menu';
import imagemLogin from "../../assets/images/logo/Logo_SmartCuisine.png";
import cozinhaImg from "../../assets/images/backgrounds/cozinha.webp";

function TelaDeBoasVindas({ irParaLogin, irParaCadastro }) {

  const [open, setOpen] = useState(false);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#FAF9F6', minHeight: '100vh', overflowX: 'hidden' }}>
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          backgroundColor: "#ffffff29", 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          py: 1
        }}
      >
        <Toolbar 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            px: { xs: 2, md: 8 } 
          }}>

          {/* Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center' 
            }}>
            <img 
              src={imagemLogin} 
              alt="Logo" 
              style={{ 
                height: '60px', 
                marginRight: '10px' 
              }} 
            />

            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              SMARTCUISINE
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            <Button onClick={() => scrollToSection('funcionalidades')} 
              sx={{ 
                color: '#1a1a1a', 
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#EF6C00'
                }
              }}>
              Funcionalidades
            </Button>

            <Button onClick={() => scrollToSection('como-funciona')} 
              sx={{ 
                color: '#1A1A1A',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#EF6C00'
                }
                }}>
              Como Funciona
            </Button>

            <Button variant="contained" 
              onClick={irParaLogin} 
              sx={{ 
                backgroundColor: '#ff8b31', 
                color: '#ffff' 
              }}>

              Entrar
            </Button>
          </Box>


          <IconButton 
            sx={{ 
              display: { xs: 'flex', 
                md: 'none' } 
            }} 
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          
          <Button fullWidth 
            onClick={() => scrollToSection('funcionalidades')}
            sx={{ 
              color: '#1a1a1a', 
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#EF6C00'
              }
            }}>
              
            Funcionalidades
          </Button>

          <Button fullWidth 
            onClick={() => scrollToSection('como-funciona')}
            sx={{ 
              color: '#1a1a1a', 
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#EF6C00'
              }
            }}>
            
            Como Funciona
          </Button>

          <Button fullWidth variant="contained" 
            onClick={irParaLogin}
            sx={{ 
              backgroundColor: '#ff8b31', 
              color: '#ffff' 
            }}>

            Entrar
          </Button>

        </Box>
      </Drawer>

      <Box
        sx={{
          position: 'relative',
          px: { xs: 4, md: 15 },
          py: { xs: 10, md: 14 },
          color: '#fff',
          overflow: 'hidden',
        }}>

        <Box
          component="img"
          src={cozinhaImg}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        />

        <Box 
          sx={{ 
            position: 'relative', 
            zIndex: 2, 
            maxWidth: '600px' 
          }}>
          
          <Box 
            sx={{ 
              display: 'inline-flex',
              bgcolor: '#fff',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              mb: 3,
            }}
          >
            <Typography variant="caption" 
              sx={{ 
                fontWeight: 'bold',  
                color: '#EF6C00'
              }}>

              Sua Cozinha Inteligente
            </Typography>
          </Box>

          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 900, 
              fontSize: { xs: '2.5rem', md: '4.5rem' },
              lineHeight: 1.1,
              mb: 3
            }}>

            Chega de desperdício: <br />
            <span style={{ color: '#EF6C00' }}>
              Organize a sua cozinha com inteligência!
            </span>
          </Typography>

          <Typography sx={{ fontSize: '1.2rem', mb: 4 }}>
            Utilize os nossos recursos de monitoramento de temperatura,
            relatórios semanais e segurança para as suas produções!
          </Typography>

        </Box>
      </Box>

  
      <Box 
        id= "funcionalidades" 
        sx={{ 
          py: 20, 
          px: { xs: 2, md: 4 }, 
          textAlign: 'center', 
          backgroundColor: '#fcfcfc' 
        }}>


        <Box 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto', 
            mb: 8 
          }}>

          <Typography variant="h5" 
            sx={{ 
              fontWeight: 800, 
              mb: 1, 
              fontSize: { xs: '2rem', md: '3rem' } 
            }}>

            Sua cozinha tecnológica
          </Typography>

          <Typography sx={{ color: '#666', fontSize: '1.1rem' }}>
            Sua cozinha organizada, eficiente e sem desperdícios!
          </Typography>
        </Box>

        
        <Grid 
          container 
          spacing={2} 
          sx={{ 
            display: 'flex',
            flexWrap: { xs: 'wrap', md: 'nowrap' }, 
            justifyContent: 'center',
            width: '100%',
            margin: 0 
          }}
        >
          {[
            {
              title: 'Evite Desperdícios',
              desc: 'Tenha controle total dos insumos e reduza perdas \n com monitoramento em tempo real.',
              icon: <DeleteOutlineIcon />,
              color: '#FF7043'
            },
            {
              title: 'Relatórios Semanais',
              desc: 'Acompanhe o desempenho da sua cozinha \n com relatórios automáticos e insights.',
              icon: <BarChartIcon />,
              color: '#5C6BC0'
            },
            {
              title: 'Monitoramento Inteligente',
              desc: 'Controle temperatura e condições dos alimentos \n com alertas em tempo real.',
              icon: <ThermostatIcon />,
              color: '#66BB6A'
            },
            {
              title: 'Rastreabilidade',
              desc: 'Acompanhe todo o ciclo dos alimentos \n garantindo segurança e controle.',
              icon: <FactCheckIcon />,
              color: '#AB47BC'
            }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2.5, 
                  borderRadius: '24px', 
                  border: '1px solid #f0f0f0', 
                  textAlign: 'left', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  width: '100%',
                  boxSizing: 'border-box',
                  minWidth: 0, 
                  transition: 'all 0.3s ease-in-out', 
                  '&:hover': { 
                    transform: 'translateY(-8px)', 
                    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                    borderColor: 'transparent'
                  } 
                }}
              >
                <Box 
                  sx={{ 
                    color: item.color, 
                    mb: 2, 
                    backgroundColor: `${item.color}15`,
                    width: 'fit-content',
                    p: 1.5,
                    borderRadius: '12px',
                    display: 'flex'
                  }}
                >
                  {item.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.2 }}>
                  {item.title}
                </Typography>

                <Typography variant="body1" 
                  sx={{ 
                    color: '#777', 
                    lineHeight: 1.6, 
                    flexGrow: 1,
                    whiteSpace: 'pre-line'
                  }}>

                  {item.desc}
                </Typography>

              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box 
        id="como-funciona"
        sx={{ 
          py: { xs: 8, md: 12 }, 
          backgroundColor: "#d8d8d8", 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="lg">
          {/* Título e Subtítulo da Seção */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#1a1a1a' }}>
              Veja como o SmartCuisine funciona
            </Typography>
            <Typography sx={{ color: '#666', maxWidth: '600px', mx: 'auto', fontSize: '1.1rem' }}>
              Assista ao vídeo abaixo e conheça todas as ferramentas que vão 
              revolucionar a gestão da sua cozinha.
            </Typography>
          </Box>


          <Paper 
            elevation={6}
            sx={{ 
              position: 'relative', 
              width: '100%',
              maxWidth: '900px',
              mx: 'auto',
              borderRadius: '24px', 
              overflow: 'hidden',
              pt: '36%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              src="https://www.youtube.com/embed/g0HONsygJ_0?si=BMhTNrVmThVhUKxq" 
              title="Pitch do SmartCuisine"
              frameBorder="0" 
              allow="accelerometer; 
              autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture; 
              web-share" referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen>
            </iframe>
          </Paper>
        </Container>
      </Box>
     
      <Box 

        sx={{ 
          py: { xs: 10, md: 15 },
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #ffb049 0%, #ff8b31 100%)',
          color: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.1)',
        }} />

        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              lineHeight: 1.2,
              textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Transforme sua cozinha em um <br /> 
            sistema inteligente hoje mesmo.
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ mb: 5, opacity: 0.9, fontSize: '1.1rem' }}
          >
            Junte-se a centenas de pessoas que simplificaram sua rotina culinária.
          </Typography>

          <Button 
            variant="contained" 
            onClick={irParaCadastro}
            sx={{ 
              backgroundColor: '#e7751e', 
              color: '#ffff', 
              fontWeight: 'bold',
              borderRadius: '50px', 
              px: 8, 
              py: 2,
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
              '&:hover': { 
                backgroundColor: '#f97326',
                transform: 'scale(1.05)', 
                transition: 'all 0.3s ease'
              }
            }}
          >
            Quero começar agora
          </Button>
        </Container>
      </Box>


      <Box component="footer" 
        sx={{ 
          bgcolor: '#121212', 
          color: '#fff', 
          py: 8 
        }}>

        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={4}>

              <Typography variant="h6" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2 
                }}>
                  SMARTCUISINE
              </Typography>

              <Typography variant="body2" 
                sx={{ 
                  opacity: 0.6, 
                  maxWidth: '300px' 
                }}>

                Tecnologia e inteligência aplicadas à segurança alimentar e gestão de cozinhas profissionais.
              </Typography>
            </Grid>
          </Grid>

          <Divider 
            sx={{ 
              my: 4, 
              borderColor: 'rgba(255,255,255,0.1)' 
            }} 
          />

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              gap: 2, 
              opacity: 0.5 
            }}>
            <Typography variant="caption">© {new Date().getFullYear()} 
              SmartCuisine. Todos os direitos reservados.
            </Typography>

            <Typography variant="caption">
              Feito com foco em eficiência e segurança.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default TelaDeBoasVindas;