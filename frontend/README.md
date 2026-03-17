# Frontend - Sistema de Pagamentos

Interface web do sistema de gestão de pagamentos, com controle de acesso, autorização de transações e dashboard financeiro.

---

##  Tecnologias utilizadas

- React + TypeScript
- Vite
- Axios
- Recharts (gráficos)
- CSS customizado
- JWT (autenticação)

---

## Funcionalidades

###  Autenticação
- Login com token JWT
- Controle de acesso por perfil (RBAC)

###  Registro de Pagamentos
- Cadastro de pagamentos
- Envio para aprovação

###  Autorização
- Listagem de pagamentos pendentes
- Aprovação e rejeição com motivo
- Modal de detalhes
- Paginação

###  Consulta
- Listagem completa de pagamentos
- Filtros por status
- Paginação
- Ordenação

###  Dashboard Financeiro
- Total geral de pagamentos
- Valores por status:
  - Autorizados
  - Pendentes
  - Rejeitados
- Gráfico de distribuição (Pizza)
- Evolução mensal (Linha)
- Quantidade por status

---

##  Arquitetura

O frontend consome dois tipos de endpoints:

-  **Paginação** → `/payments`
-  **Dashboard** → `/dashboard`

> O cálculo de métricas é feito no backend para melhor performance e escalabilidade.

---

## Estrutura do projeto

src/
├── api/
├── pages/
├── services/
├── styles/
├── context/
├── routes/
├── components/
├── routes/
└── main.tsx

---

## Como rodar o projeto

###Instalar dependências

npm install
Rodar o projeto
npm run dev
Backend

Este projeto depende do backend:

API: http://localhost:3000

Usuários para teste
Perfil	Login	Senha
Admin	admin	123456
Registro	registro	123456
Autorização	autorizacao	123456
Funcionalidades testadas

✔ Autenticação com JWT
✔ RBAC (controle por perfil)
✔ Paginação
✔ Consumo de API REST
✔ Dashboard com dados reais
✔ Tratamento de erros

Diferenciais do projeto

Separação entre listagem e métricas (arquitetura escalável)
Backend responsável pelos cálculos (performance)
Interface moderna e responsiva
Estrutura pronta para produção

 Preview

(adicione prints aqui depois)

Autor

Vieri Costa de Oliveira

Desenvolvedor Backend / Full Stack

Analista de Dados