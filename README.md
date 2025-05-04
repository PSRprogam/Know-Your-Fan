# Know Your Fan

Este é um projeto React com TypeScript, voltado para a criação de uma aplicação que permite aos fãs do time de eSports FURIA interagirem com o time. O sistema oferece funcionalidades como cadastro de usuários, acompanhamento de eventos e postagens, envio de documentos para verificação (com extração e validação de dados utilizando OCR via Tesseract.js), além de um sistema de pontuação que recompensa as interações dos fãs.

---

## 📋 Funcionalidades Principais

- **Cadastro de Usuários**: Permite que os fãs se registrem e criem perfis personalizados.
- **Upload de Documentos**: Envio de documentos para validação, com extração de dados via OCR.
- **Validação de Maioridade**: Verifica automaticamente se o usuário é maior de idade com base nos dados extraídos.
- **Sistema de Pontuação**: Os fãs acumulam pontos com base em suas interações e podem subir de patente.
- **Acompanhamento de Eventos**: Os fãs podem visualizar eventos e postagens do time.

---

## 🖥️ Frontend (Aplicação React com TypeScript)

A aplicação frontend é construída com React e TypeScript, oferecendo uma interface moderna e responsiva para os usuários.

### Tecnologias Utilizadas

- **[React](https://react.dev/)**: Framework JavaScript para construção de interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que adiciona tipagem estática.
- **[Vite](https://vite.dev/)**: Ferramenta de build para desenvolvimento rápido e eficiente.
- **[Lucide](https://lucide.dev/)**: Biblioteca de ícones vetoriais para uma interface visual atraente.
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação dentro da aplicação.
- **[Tesseract.js](https://github.com/naptha/tesseract.js)**: Biblioteca para OCR, permitindo a extração de texto de imagens.

---

## 🔧 Backend (Firebase)

O backend da aplicação utiliza o Firebase para autenticação, armazenamento de documentos e manipulação do banco de dados.

### Tecnologias Utilizadas

- **[Firebase](https://firebase.google.com/?hl=pt-br)**: Plataforma para autenticação, banco de dados em tempo real e armazenamento.
- **[Firestore Database](https://firebase.google.com/docs/firestore?hl=pt-br)**: Banco de dados NoSQL para armazenamento de dados do usuário.
- **[Firebase Auth](https://firebase.google.com/docs/auth)**: Serviço de autenticação para a verificação de usuários.
- **[Firebase Storage](https://firebase.google.com/docs/storage)**: Armazenamento de arquivos, como documentos enviados pelos usuários.

### Funções do Backend

- **Cadastro de Usuários**: Os dados dos usuários são enviados para o Firebase, que gera um token de autenticação para validar o acesso.
- **Upload de Documentos**: Os documentos são armazenados no Firebase Storage, e as URLs são salvas no Firestore.
- **Extração e Validação de Dados**: Utilizando o Tesseract.js, o sistema extrai informações como data de nascimento e valida se o usuário é maior de idade.
- **Gerenciamento de Pontuação**: O backend registra as interações dos usuários e atualiza suas pontuações no Firestore.

---

## ⚙️ Pré-requisitos

Certifique-se de ter o seguinte instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** (versão LTS recomendada).
- **npm** (instalado com o Node.js) ou **[Yarn](https://yarnpkg.com/)**.

---

## Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/PSRprogam/Know-Your-Fan
    cd src
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```
## Dependências
Instale as dependências principais para rodar o projeto:

  ```bash
  npm install react react-dom typescript vite lucide-react firebase tesseract.js
  ```
Instale as dependências de desenvolvimento:
  ```bash
  npm install --save-dev @vitejs/plugin-react @types/react @types/react-dom @types/react-router-dom typescript-eslint/eslint-plugin typescript-eslint/parser vitest
  ```
## Configuração do Firebase

Siga os passos abaixo para configurar o Firebase no seu projeto:
---

## 🔥 Guia de Configuração do Firebase

Siga os passos abaixo para configurar o Firebase no seu projeto:

### 1. Crie um Projeto no Firebase
1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Clique em **Criar um projeto do Firebase**.
3. Insira um nome para o projeto (ex.: `Know Your Fan`) e clique em **Continuar**.
4. Desative o Google Analytics (opcional) e clique em **Criar Projeto**.

---

### 2. Adicione um Aplicativo Web
1. No painel do Firebase, clique em **Adicionar Aplicativo** e selecione a opção **Web**.
2. Insira um apelido para o aplicativo (ex.: `Frontend`).
3. Clique em **Registrar Aplicativo**.
4. Copie as credenciais de configuração fornecidas (você usará isso no próximo passo).
5. Clique em **Continuar para o Console**.

---

### 3. Configure o Firebase no Projeto
1. No diretório do projeto, vá até o arquivo `firebaseConfig.ts` na pasta `src/firebase`.
2. Cole as credenciais de configuração copiadas no passo anterior no arquivo `firebaseConfig.ts`:

```typescript
export const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};
```
### 4. Ative os Serviços Necessários
   1. Autenticação:

    No painel do Firebase, vá até Authentication > Método de Login.
    Ative os métodos de login desejados (ex.: Email/Senha, Google, etc.).

   2. Firestore Database:

    Vá até Firestore Database > Criar Banco de Dados.
    Escolha o modo de produção ou teste (para desenvolvimento, o modo de teste é recomendado).
    Configure as regras de segurança conforme necessário. 

   3. Storage:
    Vá até Storage > Introdução.
    Configure as regras de segurança para permitir uploads durante o desenvolvimento.
### 5. Configure as Regras de Segurança (Opcional)
Durante o desenvolvimento, você pode usar regras de segurança mais permissivas. No painel do Firebase, configure as regras para Firestore e Storage:

#### Firestore (Modo de Teste):
```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
### 6. Teste a Configuração
Certifique-se de que todas as dependências do Firebase estão instaladas:
```bash
npm install firebase
```
Teste a autenticação, o Firestore e o Storage no seu projeto para garantir que tudo está funcionando corretamente.


## Estrutura do Projeto 
 ```bash
 src
├── App.tsx
├── main.tsx
├── components
│   ├── Navbar.tsx
│   └── navbar.module.css
├── contexts
│   └── AuthContext.tsx
├── firebase
│   ├── authService.ts
│   └── firebaseConfig.ts
├── pages
│   ├── Auth
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── shared
│   │       └── AuthForm.tsx
│   └── UserArea
│       ├── Dashboard.tsx
│       ├── Home.tsx
│       ├── Pontos.tsx
│       └── Upload.tsx
└── routes
    └── PrivateRoute.tsx
  ```
