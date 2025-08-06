# Sistema de Produtos

## 🚀 Tecnologias

### Frontend (Next.js)
- **Framework**: Next.js 15.4.3 (App Router)
- **Linguagem**: TypeScript
- **UI**: Shadcn/ui (Componentes acessíveis)
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: React Context API
- **Formulários**: React Hook Form
- **Padronização**: ESLint + Prettier (Padronização de código)

### Backend (Node.js)
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **ORM**: Sequelize
- **Banco de Dados**: MySQL 8 (Container Docker)
- **Autenticação**: JWT
- **Validação**: Yup
- **Padronização**: ESLint + Prettier

## 🛠️ Configuração do Ambiente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão recomendada >=16)
- [Docker](https://www.docker.com/) instalado e rodando
- [npm](https://www.npmjs.com/) (vem junto com Node.js)
- Editor de texto (ex: VSCode)

---

## Passo a passo para rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/pedro-v-bezerra/sistema-produtos.git
cd sistema-produtos/backend
```

---

### 2. Configurar variáveis de ambiente

Crie um arquivo .env na raiz da pasta backend/ com o conteúdo:
```
DB_HOST=host.docker.internal
DB_PORT=3307
DB_USER=root
DB_PASSWORD=root
DB_NAME=mydb
JWT_SECRET=SEUJWTSECRET
JWT_EXPIRES_IN=1h
AUTH_EMAIL=EMAIL_DE_LOGIN_PADRÃO
AUTH_PASSWORD=SENHA_DE_LOGIN_PADRÃO
```
---

### 3. Instalar as dependências do backend

No diretório backend:

```bash
npm install
```

---

### 4. Subir o container MySQL via Docker

Na raiz do projeto (sistema-produtos), execute:

```bash
docker compose up --build
```

- Esse comando vai iniciar o container do MySQL na porta 3307.
- O projeto está configurado para rodar migrations ao subir o container, então não precisa se preocupar em rodar manualmente.
- Após este comando o container já terá início, abra um novo terminal para o próximo passo.

---

### 5. Rodar as seeds para popular o banco com produtos de exemplo (Opcional)

Em outro terminal, com o docker rodando execute:

```bash
cd backend
npx sequelize-cli db:seed:all
```

---

### 7. Testar a API

Após rodar o backend, você pode testar os endpoints da API de produtos (exemplo):
- POST http://localhost:3001/auth/login --> Faça login com as variáveis definidas em .env
- GET http://localhost:3001/products
- POST http://localhost:3001/products
- PUT http://localhost:3001/products/:id
- DELETE http://localhost:3001/products/:id

---

### 8. Observações

- O banco MySQL está rodando via Docker e a conexão usa a porta 3307.
- Caso tenha problema de conexão, verifique se o Docker está ativo e o container do MySQL está rodando (docker ps).
- Se quiser alterar usuário ou senha, ajuste também o arquivo .env e o docker-compose.yml.
- Para limpar o banco, rode npx sequelize-cli db:migrate:undo:all e depois npx sequelize-cli db:migrate novamente.

---
# Frontend

---

### 1. Instalar as dependências

Rode esse comando para instalar as dependências do projeto.

```bash
npm install
```

---

### 2. Criar o arquivo .env

Exemplo de arquivo:
```
BASE_URL=http://localhost:3001
```

---

### 3. Rodar o projeto localmente

```bash
npm run dev
```

# Considerações e Contato
Foi feito o deploy público do projeto, para acessar https://sistema-produtos.vercel.app/.


Serviços utilizados no deploy:
- Frontend - [Vercel](https://vercel.com/)
- Backend - [Railway](https://railway.com/)
- Database - [AivenConsole](https://console.aiven.io/)


Para considerações, sugestões ou dúvidas entre em contato pelo e-mail pedrolima.dev@hotmail.com
