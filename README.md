# AdminFlow - Dashboard Administrativo

Um dashboard administrativo moderno e responsivo construído com **Next.js 16**, **React 19** e **TypeScript**, oferecendo uma solução completa para gerenciamento de pedidos, pagamentos e usuários.

## 🎯 Visão Geral

O **AdminFlow** é uma plataforma de administração robusta que fornece insights em tempo real sobre operações de negócios, com interfaces intuitivas para gerenciamento sobre pedidos, análise de pagamentos e visualização de dados através de gráficos interativos.

## ✨ Ferramentas Principais

- 🔐 **Autenticação Segura** - Integração com Firebase Authentication
- 📊 **Dashboard Interativo** - Visualização de estatísticas e KPIs em tempo real
- 💳 **Gerenciamento de Pagamentos** - Acompanhamento de transações com filtros e detalhes
- 📦 **Gerenciamento de Pedidos** - Lista completa de pedidos com status e informações detalhadas
- 📈 **Gráficos Analíticos** - Visualizações de receita mensal e pagamentos com Recharts
- 🎨 **UI Moderna** - Componentes Material UI com tema customizado
- ⚡ **Skeleton Loading** - Placeholders animados para melhor UX
- 📱 **Design Responsivo** - Interface adaptada para todos os dispositivos
- 🎬 **Animações Fluidas** - Transições elegantes com Framer Motion
- 🎯 **TypeScript** - Tipagem estrita para maior segurança e manutenibilidade

## 🎨 Design e Estilo

- **Tailwind CSS** para estilização utilitária
- **Material UI** para componentes complexos
- **Emotion** para CSS-in-JS dinâmico
- **Tema customizado** para consistência visual
- **Paleta de cores** moderna e profissional

## 📋 Funcionalidades

### Dashboard

- Visualização de estatísticas principais (Total de Receita, Pedidos, Pagamentos)
- Gráficos de receita mensal
- Distribuição de métodos de pagamento
- Cards de estatísticas com animações

### Pagamentos

- Tabela completa de pagamentos
- Modal com detalhes de pagamento
- Status de pagamento (Pago, Pendente, Falha)
- Filtros por método de pagamento
- Visualização de gráficos de distribuição

### Pedidos

- Lista de pedidos com informações completas
- Status de pedidos
- Detalhes do cliente
- Data e valor do pedido

### Autenticação

- Login seguro com Firebase
- Proteção de rotas
- Contexto de autenticação global
- Logout automático

## 🛠️ Tecnologias Utilizadas

| Tecnologia        | Versão    | Propósito               |
| ----------------- | --------- | ----------------------- |
| **Next.js**       | 16.1.0    | Framework React com SSR |
| **React**         | 19.2.3    | Biblioteca UI           |
| **TypeScript**    | ^5        | Tipagem JavaScript      |
| **Tailwind CSS**  | ^4        | Estilização CSS         |
| **Material UI**   | ^7.3.6    | Componentes de UI       |
| **Firebase**      | ^12.7.0   | Autenticação e Backend  |
| **Recharts**      | ^3.6.0    | Visualização de dados   |
| **Framer Motion** | ^12.23.26 | Animações               |
| **Emotion**       | ^11.14    | CSS-in-JS               |
| **ESLint**        | ^9        | Linting                 |

## 📁 Estrutura de Diretórios

```
adminflow/
├── public/              # Arquivos estáticos
├── src/
│   ├── animations/      # Animações reutilizáveis
│   │   └── fadeInUp.ts
│   ├── app/             # Rotas e layouts (App Router do Next.js)
│   │   ├── page.tsx     # Página home
│   │   ├── layout.tsx   # Layout raiz
│   │   ├── globals.css  # Estilos globais
│   │   ├── login/       # Página de login
│   │   └── dashboard/   # Dashboard principal
│   │       ├── page.tsx
│   │       ├── orders/
│   │       └── payments/
│   ├── components/      # Componentes React
│   │   ├── layout/      # Componentes de layout
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── pageContainer.tsx
│   │   │   └── protectedRoute.tsx
│   │   ├── ui/          # Componentes de interface
│   │   │   ├── statCard.tsx
│   │   │   ├── statusBadge.tsx
│   │   │   ├── monthlyRevenueChart.tsx
│   │   │   ├── paymentsChart.tsx
│   │   │   └── paymentsDetailsModal.tsx
│   │   └── skeletons/   # Componentes skeleton loading
│   │       ├── skeleton.tsx
│   │       ├── dashboardSkeleton.tsx
│   │       ├── chartSkeleton.tsx
│   │       ├── statsSkeleton.tsx
│   │       └── tableSkeleton.tsx
│   ├── context/         # React Context API
│   │   └── authContext.tsx
│   ├── hooks/           # Custom Hooks
│   │   └── useAuth.ts
│   ├── services/        # Serviços e integrações
│   │   ├── api.ts
│   │   ├── firebase.ts
│   │   ├── orders.ts
│   │   └── payments.ts
│   ├── types/           # Definições de tipos TypeScript
│   │   ├── order.ts
│   │   ├── payment.ts
│   │   └── user.ts
│   └── utils/           # Utilitários
│       ├── format.ts
│       └── payments.ts
├── package.json         # Dependências do projeto
├── tsconfig.json        # Configuração TypeScript
├── tailwind.config.js   # Configuração Tailwind CSS
├── postcss.config.mjs   # Configuração PostCSS
├── next.config.ts       # Configuração Next.js
└── eslint.config.mjs    # Configuração ESLint
```

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** 18.17 ou superior
- **npm** ou **yarn**
- Conta Firebase (para autenticação)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/VyniciusBras/AdminFlow-DashBoard.git
cd adminflow
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
```

5. **Abra o navegador**

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Executar linter
npm run lint
```

## 🔐 Autenticação

### Sistema de Login

- Integração com Firebase Authentication
- Proteção de rotas com componente `ProtectedRoute`
- Context API para gerenciamento de estado de autenticação
- Hook customizado `useAuth` para fácil acesso ao estado de autenticação

### Fluxo de Autenticação

1. Usuário acessa a página de login
2. Credenciais são validadas via Firebase
3. Token é armazenado localmente
4. Usuário é redirecionado para o dashboard
5. Rotas protegidas verificam autenticação

## 📊 Componentes Principais

### Dashboard Page

Exibe o resumo executivo com:

- Estatísticas em cards
- Gráfico de receita mensal
- Distribuição de pagamentos por método
- Loading skeletons durante carregamento

### Payments Page

Gerenciamento de pagamentos com:

- Tabela de pagamentos
- Modal de detalhes
- Filtros e busca
- Status visual com badges

### Orders Page

Lista de pedidos com:

- Tabela completa de pedidos
- Informações do cliente
- Status e datas
- Valores e métodos de entrega

## 📦 Dados Firestore

Para desenvolvimento, o projeto inclui dados firebase em:

- `src/services/payments.ts` - Dados de pagamentos
- `src/services/orders.ts` - Dados de pedidos
- `src/services/users.ts` - Dados de usuários

## 🚦 Roadmap Futuro

- [ ] Exportação de relatórios em PDF
- [ ] Notificações em tempo real
- [ ] Temas claro/escuro
- [ ] Gráficos adicionais
- [ ] API RESTful completa

## 🐛 Troubleshooting

### Problema: Firebase não conecta

**Solução:** Verifique se as variáveis de ambiente estão corretas no `.env.local`

### Problema: Estilos Tailwind não aplicam

**Solução:** Execute `npm run dev` e limpe o cache do navegador

### Problema: Componentes não carregam

**Solução:** Certifique-se que todas as dependências estão instaladas com `npm install`

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

Desenvolvido por **Vynícius Brasil**

- GitHub: [@VyniciusBras](https://github.com/VyniciusBras)
- LinkedIn: [Seu LinkedIn]
