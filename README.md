# Backend - Gestão de Publicações DJE-SP

Um projeto para gestão das publicações do Diário da Justiça Eletrônico (DJE-SP), com API RESTful para consumo de dados extraídos via scraping.

## 🛠 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- Docker
- class-validator
- JWT (Autenticação)

## 🚀 Instalação

### 🔧 Com Docker

```bash
docker-compose up
```

> Certifique-se de que o Docker esteja instalado e rodando.

### 🔧 Manualmente

```bash
npm install
npm run dev
```

## ⚙️ Variáveis de ambiente

As variáveis estão definidas no arquivo `.env.example` na raiz do projeto:

```env
# API CONFIG
NODE_ENV=development
PORT=3001
API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000

# Conexão com banco
DB_TYPE=mysql
DB_URL=mysql://root:admin123@localhost:3306/caritas

DB_MIGRATIONS=src/infra/database/typeorm/migrations/*.ts
DB_MIGRATIONS_DIR=src/infra/database/typeorm/migrations
DB_SUBSCRIBERS=src/infra/database/typeorm/subscribers/*.ts
DB_SUBSCRIBERS_DIR=src/infra/database/typeorm/subscribers
DB_ENTITIES=src/entities/*.ts
DB_ENTITIES_DIR=src/entities

# SMTP (opcional)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_SECURE=
```

## 📌 Rotas da API

### 🔐 Autenticação

- `POST /api/auth/login` — Autentica usuário
- `POST /api/auth/redefine/password` — Requisição de redefinição de senha
- `POST /api/auth/change/password` — Alteração de senha com código

### 👤 Usuários

- `POST /api/users/create` — Criação de usuário
- `PUT /api/users/update/:id` — Atualização de usuário
- `GET /api/users/:id` — Buscar usuário por ID

### 📄 Publicações

- `POST /api/publications/create/batch` — Criação em lote de publicações
- `GET /api/publications` — Listagem paginada e filtrável de publicações
- `PUT /api/publications/:id` — Atualização de status da publicação

> Todas as rotas protegidas requerem autenticação com JWT (`bearer token`).

## 📂 Estrutura do projeto

```
src/
├── controllers/
├── services/
├── repositories/
├── entities/
├── dto/
├── middlewares/
└── infra/
    └── database/
        └── typeorm/
```

---
