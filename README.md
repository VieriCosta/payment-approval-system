# Sistema de Gestão de Pagamentos

Sistema web para **registro, autorização e consulta de pagamentos a fornecedores**, desenvolvido como desafio técnico.

O sistema possui **controle de acesso por perfil**, fluxo de **aprovação de pagamentos** e persistência em banco de dados.

---

#  Funcionalidades

O sistema permite:

✔ Autenticação de usuários com JWT  
✔ Registro de pagamentos  
✔ Autorização de pagamentos  
✔ Rejeição de pagamentos com motivo  
✔ Consulta de histórico de pagamentos  
✔ Controle de acesso por perfil (RBAC)  
✔ Paginação e filtros  
✔ Documentação da API com Swagger  

---

#  Regras de Negócio

O sistema possui **3 perfis de acesso**:

### Registro
- Pode registrar pagamentos
- Pode visualizar o status dos pagamentos que enviou

### Autorização
- Pode registrar pagamentos
- Pode autorizar pagamentos
- Pode rejeitar pagamentos

### Administração
- Acesso total ao sistema
- Pode cadastrar usuários
- Pode autorizar pagamentos
- Pode visualizar todos os registros

---

# Fluxo de Pagamentos

1️⃣ Usuário registra um pagamento  
2️⃣ O pagamento recebe status **PENDENTE**  
3️⃣ Usuário com permissão de autorização pode:

- Autorizar → status **AUTORIZADO**
- Rejeitar → status **REJEITADO** + motivo

4️⃣ O sistema registra:

- usuário solicitante
- usuário autorizador
- data de registro
- data de autorização

---

#  Tecnologias Utilizadas

## Backend

- Node.js
- Express
- Prisma ORM
- MySQL
- JWT Authentication
- Bcrypt
- Express Validator
- Swagger (documentação da API)

## Frontend

- React
- Axios
- React Router

---

# Banco de Dados

O sistema utiliza **MySQL** com **Prisma ORM**.

As principais entidades são:

- Users
- Payments

---

# Estrutura do Projeto

mini-pagamentos
│
├── backend
│ ├── src
│ │ ├── controllers
│ │ ├── routes
│ │ ├── middlewares
│ │ └── config
│ │
│ ├── prisma
│ │ ├── schema.prisma
│ │ └── seed.js
│ │
│ └── package.json
│
├── frontend
│ ├── src
│ └── package.json
│
└── README.md

#  Como Rodar o Projeto

##  Clonar o repositório


git clone https://github.com/VieriCosta/mini-pagamentos.git


---

#  Backend

### Entrar na pasta


cd backend


### Instalar dependências


npm install


### Configurar variáveis de ambiente

Crie um arquivo `.env`:


DATABASE_URL="mysql://root:root123@localhost:3306/pagamentos_db"
JWT_SECRET="secret"


---

### Rodar migrations


npx prisma migrate dev


---

### Criar usuário administrador


npx prisma db seed


Usuário criado:


login: admin
senha: admin123


---

### Rodar o backend


npm run dev


Servidor rodando em:


http://localhost:3000


---

#  Documentação da API

A documentação da API está disponível em:


http://localhost:3000/api-docs


Através do Swagger é possível testar todos os endpoints.

---

#  Autenticação

A API utiliza **JWT (JSON Web Token)**.

Após login:


POST /auth/login


O token deve ser enviado no header:


Authorization: Bearer TOKEN


---

# Principais Endpoints

### Autenticação


POST /auth/login


---

### Usuários


POST /users


---

### Pagamentos

Registrar pagamento


POST /payments


Listar pagamentos


GET /payments


Buscar pagamento por ID


GET /payments/{id}


Autorizar pagamento


POST /payments/{id}/authorize


Rejeitar pagamento


POST /payments/{id}/reject


---

#  Filtros disponíveis

A consulta de pagamentos suporta filtros:


/payments?status=PENDENTE

/payments?page=1

/payments?dataInicio=2026-03-01&dataFim=2026-03-20

/payments?sort=valor&order=desc


---

#  Segurança

- Senhas armazenadas com **hash bcrypt**
- Autenticação com **JWT**
- Controle de acesso baseado em **perfil (RBAC)**

---

#  Autor

Desenvolvido por:

**Vieri Costa**

Estudante de Sistemas de Informação  
Desenvolvedor Backend / Analista de Dados

---
