# Sistema de Produtos - Backend

Este projeto é o backend da API de produtos, utilizando Node.js, Express, Sequelize e MySQL via Docker.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão recomendada >=16)
- [Docker](https://www.docker.com/) instalado e rodando
- [npm](https://www.npmjs.com/) (vem junto com Node.js)
- Editor de texto (ex: VSCode)

---

## Passo a passo para rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone <url-do-seu-repositorio>
cd sistema-produtos/backend
```

---

### 2. Configurar variáveis de ambiente

Crie um arquivo .env na raiz da pasta backend/ com o conteúdo:

DB_HOST=host.docker.internal
DB_PORT=3307
DB_USER=root
DB_PASSWORD=root
DB_NAME=produtos_db

---

### 3. Subir o container MySQL via Docker

Na raiz do projeto (sistema-produtos), execute:

```bash
docker compose up -d
```

Esse comando vai iniciar o container do MySQL na porta 3307.

---

### 4. Instalar as dependências do backend

No diretório backend:

```bash
npm install
```

---

### 5. Rodar as migrations para criar as tabelas

Ainda no diretório backend:

```bash
npx sequelize-cli db:migrate
```

---

### 6. Rodar as seeds para popular o banco com produtos de exemplo

```bash
npx sequelize-cli db:migrate
```

---

### 7. Iniciar o servidor backend

```bash
node server.js
```

---

### 8. Testar a API

Após rodar o backend, você pode testar os endpoints da API de produtos (exemplo):

GET http://localhost:3001/products

POST http://localhost:3001/products

PUT http://localhost:3001/products/:id

DELETE http://localhost:3001/products/:id

---

### 8. Observações

O banco MySQL está rodando via Docker e a conexão usa a porta 3307.
Caso tenha problema de conexão, verifique se o Docker está ativo e o container do MySQL está rodando (docker ps).
Se quiser alterar usuário ou senha, ajuste também o arquivo .env e o docker-compose.yml.
Para limpar o banco, rode npx sequelize-cli db:migrate:undo:all e depois npx sequelize-cli db:migrate novamente.

---
# Frontend

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão recomendada >=16)
- [npm](https://www.npmjs.com/) (vem junto com Node.js)
- Editor de texto (ex: VSCode)

---

## Passo a passo para rodar o projeto localmente

### 1. Instalar as dependências

O frontend é simples, feito em Next.JS, utilizando API Context do React, TailwindCSS e alguns elementos de UI, veja o arquivo package.json
para vizualizar as demais dependências.
Para o front rode o comando:

```bash
npm install
```

---

### 2. Criar o arquivo .env

Exemplo de arquivo:

BASE_URL=http://localhost:3001/products

---
# Considerações e Contato

Para considerações, sugestões ou dúvidas entre em contato pelo e-mail pedrolima.dev@hotmail.com
