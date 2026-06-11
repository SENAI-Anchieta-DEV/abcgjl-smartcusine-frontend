# SmartCuisine Web 🍽️

Frontend web do projeto SmartCuisine, desenvolvido para auxiliar no gerenciamento inteligente de cozinhas industriais e hospitalares, permitindo o controle de alimentos, temperatura, validade e relatórios de forma prática e intuitiva.

---

## 📌 Sobre o Projeto

O SmartCuisine Web é a interface web do sistema SmartCuisine, criada para facilitar o monitoramento e gerenciamento de insumos alimentícios em cozinhas profissionais.

---

## O sistema permite:

- Controle de alimentos cadastrados
- Monitoramento de temperatura
- Gestão de validade dos produtos
- Visualização de relatórios
- Controle de usuários
- Navegação intuitiva e responsiva
- Integração com API REST

## 🚀 Tecnologias Utilizadas:
### Frontend:
- React
- JavaScript
- React Router DOM
- Material UI (MUI)
- Lucide React (biblioteca de ícones para React)
- CSS / Styled Components

### Integração:
- Axios (biblioteca usada para fazer requisições HTTP no frontend)
- API REST

### Ferramentas:
- Node.js
- npm

---

# 📂 Estrutura do Projeto:

src/
│
├── app/
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── providers/
│   │   └── ThemeProvider.jsx
│   │
│   └── layouts/
│       └── MainLayout.jsx
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   │   ├── Logo_SmartCuisine.png
│   │   │   └── logo.svg
│   │   │
│   │   ├── backgrounds/
│   │   │   ├── cozinha.webp
│   │   │   └── tela_home_smartcuisine.png
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Loading.jsx
│   │
│   └── layout/
│       ├── Menu.jsx
│       └── Navbar.jsx
│
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Cadastro.jsx
│   │   └── EditarPerfil.jsx
│   │
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   │
│   ├── Usuarios/
│   │   └── Usuarios.jsx
│   │
│   └── Home/
│       └── TelaDeBoasVindas.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── usuarioService.js
│
├── hooks/
│   ├── useAuth.js
│   └── useTheme.js
│
├── contexts/
│   └── AuthContext.jsx
│
├── styles/
│   ├── global.css
│   ├── theme.js
│   └── variables.css
│
├── utils/
│   ├── formatDate.js
│   └── validators.js
│
├── App.jsx
├── main.jsx
└── index.js

---

## ⚙️ Funcionalidades:
### 👤 Autenticação:
- Login de usuários
- Cadastro
- Controle de sessão

### 📦 Gestão de Alimentos:
- Cadastro de alimentos
- Edição e exclusão
- Controle de validade

### 🌡️ Monitoramento:
- Controle de temperatura
- Alertas visuais

### 📊 Dashboard:
- Indicadores em tempo real
- Relatórios semanais
- Visualização de métricas

### 👥 Usuários:
- Gerenciamento de perfis
- Edição de informações

---

# 🖥️ Como Executar o Projeto:

Pré-requisitos
Antes de começar, você precisará ter instalado:
- Node.js
- npm 

## Clone o repositório:
`md
bash
https://github.com/SENAI-Anchieta-DEV/abcgjl-smartcusine-frontend.git


## Acesse a pasta do projeto:
bash
cd abcgjl-smartcusine-frontend


## Instale as dependências:
bash
npm install


## Execute o projeto:
bash
npm start
```

---

# 🔗 Integração com Backend:

## O frontend consome uma API REST responsável pelo gerenciamento de:
- Usuários
- Alimentos
- Temperaturas
- Relatórios
- Autenticação

---

# 🎨 Usabilidade e Interface:
- Interface intuitiva
- Redução de cliques
- Feedback visual ao usuário
- Responsividade
- Prevenção de erros
- Clareza nas informações

---

# 🧪 Testes e Qualidade:

## Durante o desenvolvimento foram aplicadas práticas como:
- Validação de formulários
- Tratamento de exceções
- Controle de status HTTP
- Organização de componentes
- Separação de responsabilidades

---

Projeto desenvolvido para fins acadêmicos no SENAI, com foco em desenvolvimento full stack e integração entre frontend web, mobile e backend.

Este projeto possui finalidade educacional.