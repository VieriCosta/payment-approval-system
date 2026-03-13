# Backend - Sistema de Gestão de Pagamentos

Este diretório contém a **API REST responsável pela lógica de negócio** do sistema de gestão de pagamentos a fornecedores.

A API permite registrar, autorizar, rejeitar e consultar pagamentos, além de gerenciar usuários com controle de acesso baseado em perfil.

---

# Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- MySQL
- JWT (JSON Web Token)
- Bcrypt
- Express Validator
- Swagger (documentação da API)

---

# Arquitetura

A estrutura do backend segue uma organização baseada em camadas.

src
│
├── controllers  
│ Responsáveis pela lógica das requisições
│
├── routes  
│ Definição das rotas da API
│
├── middlewares  
│ Autenticação, autorização e validações
│
├── config  
│ Configuração do banco de dados
│
└── app.js  
Arquivo principal da aplicação

---

# Banco de Dados

O sistema utiliza **MySQL** com **Prisma ORM**.

## Modelos principais

### User

Representa usuários do sistema.

Campos principais:

- id
- name
- login
- password
- role

Perfis disponíveis:

REGISTRO  
AUTORIZACAO  
ADMIN  

---

### Payment

Representa pagamentos registrados no sistema.

Campos principais:

- id
- cnpj
- razaoSocial
- valor
- descricao
- dataRegistro
- status
- solicitanteId
- autorizadorId
- dataAutorizacao
- motivoRejeicao

Status possíveis:

PENDENTE  
AUTORIZADO  
REJEITADO  

---

# Segurança

A API possui mecanismos de segurança.

## Autenticação

A autenticação é realizada utilizando **JWT (JSON Web Token)**.

Após login, o cliente recebe um token que deve ser enviado no header:

Authorization: Bearer TOKEN

---

## Senhas

As senhas são armazenadas utilizando **hash bcrypt**, garantindo maior segurança no armazenamento.

---

## Controle de acesso (RBAC)

O sistema possui controle de acesso baseado em perfil.

Perfis disponíveis:

REGISTRO  
AUTORIZACAO  
ADMIN  

Cada rota verifica permissões através de middleware.

---

# Rotas da API

## Autenticação

Login de usuário

POST /auth/login

Body:

{
  "login": "admin",
  "password": "admin123"
}

---

# Usuários

Criar usuário

POST /users

Campos:

- name
- login
- password
- role

---

# Pagamentos

Registrar pagamento

POST /payments

Campos:

- cnpj
- razaoSocial
- valor
- descricao

Status inicial:

PENDENTE

---

Listar pagamentos

GET /payments

Suporte a filtros:

status  
page  
limit  
sort  
order  
dataInicio  
dataFim  

Exemplo:

/payments?status=PENDENTE&page=1  

/payments?dataInicio=2026-03-01&dataFim=2026-03-20  

/payments?sort=valor&order=desc  

---

Buscar pagamento por ID

GET /payments/{id}

---

Autorizar pagamento

POST /payments/{id}/authorize

---

Rejeitar pagamento

POST /payments/{id}/reject

Body:

{
  "motivo": "Valor incorreto"
}

---

# Documentação da API

A API possui documentação interativa com **Swagger**.

Disponível em:

http://localhost:3000/api-docs

Através da interface é possível:

- visualizar endpoints
- testar requisições
- validar parâmetros

---

# Como Rodar o Backend

## 1 Clonar o projeto

git clone https://github.com/seuusuario/mini-pagamentos.git

---

## 2 Entrar na pasta backend

cd backend

---

## 3 Instalar dependências

npm install

---

## 4 Criar arquivo .env

DATABASE_URL="mysql://root:root123@localhost:3306/pagamentos_db"  
JWT_SECRET="secret"

---

## 5 Rodar migrations

npx prisma migrate dev

---

## 6 Criar usuário administrador

npx prisma db seed

Credenciais criadas:

login: admin  
senha: admin123  

---

## 7 Rodar aplicação

npm run dev

Servidor disponível em:

http://localhost:3000

---

# Estrutura de Pastas

backend
│
├── src
│   ├── controllers
│   ├── routes
│   ├── middlewares
│   ├── config
│   └── app.js
│
├── prisma
│   ├── schema.prisma
│   └── seed.js
│
├── package.json
└── README.md

---

#  Autor

Desenvolvido por:

**Vieri Costa**

Estudante de Sistemas de Informação  
Desenvolvedor Backend / Analista de Dados
