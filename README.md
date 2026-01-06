## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. If Fail try the step 2 again 

4. When run press 'w' to simulate the app in browser.

5. Usuários para testes:
     - Perfil Professor -> wesley@email.com / 12345678
     - Perfil Aluno -> joao@email.com / 123456
  
6. Caso necessite maniputar alguma informação direto da API - [Link](https://api-snowy-silence-6194.fly.dev/api-docs/)


# Documentação :

# 📱 Portal de Postagens

Aplicativo mobile desenvolvido em React Native com foco em gerenciamento de posts, alunos e professores, integrando-se a uma API REST para autenticação e controle de permissões.

## 🛠 Tecnologias Utilizadas

- React Native
- JavaScript / TypeScript
- React Hooks
- Context API
- Axios (requisições HTTP)
- React Navigation
- Styled Components / StyleSheet

## 📋 Requisitos Técnicos

- Aplicação desenvolvida com React Native
- Uso de componentes funcionais e Hooks
- Integração com API REST
- Controle de autenticação e permissões
- Estilização baseada em layout definido pelo grupo

## 🏗 Arquitetura da Aplicação - Em desenvolvimento...

O projeto segue uma arquitetura baseada em separação de responsabilidades:

src/
├── components/        # Componentes reutilizáveis
├── app/               # Telas do aplicativo
├── services/          # Comunicação com a API (Axios)
├── contexts/          # Context API (Auth, Posts, etc.)
├── styles/            # Estilos globais
└── utils/             # Funções utilitárias


## 🔄 Gerenciamento de Estado

O gerenciamento de estado da aplicação é feito utilizando a Context API do React, permitindo o compartilhamento de dados como:

- Usuário autenticado
- Token de autenticação
- Lista de posts
- Permissões (Aluno ou Professor)

## 🔗 Integração com Back-End - Em desenvolvimento...

A comunicação com o back-end é realizada através de uma API REST.

### Endpoints principais:

- Autenticação
  - POST /login

- Posts
  - GET /posts
  - POST /posts (Professor)
  - PUT /posts/:id (Professor)
  - DELETE /posts/:id (Professor)

- Alunos
  - GET /alunos
  - POST /alunos
  - PUT /alunos/:id
  - DELETE /alunos/:id

- Professores
  - GET /professores
  - POST /professores
  - PUT /professores/:id
  - DELETE /professores/:id
 
## 🔐 Controle de Permissões

O sistema possui dois tipos de usuários:

### 👨‍🏫 Professor
- Pode criar, editar e excluir posts
- Pode visualizar alunos e professores
- Pode criar alunos e professores
- Pode editar e excluir professores

### 👨‍🎓 Aluno
- Pode apenas visualizar os posts
- Pode adicionar comentários em posts
- Não possui permissão para criação ou edição de posts 
- Pode criar, editar e excluir alunos (Conforme requisito solicitado)

## 🎨 Estilização

A estilização do aplicativo segue o layout definido pelo grupo - minimalista, mantendo:

- Consistência visual
- Responsividade
- Uso de cores básicas e tipografia padronizadas

## ⚙️ Setup do Projeto

### Pré-requisitos
- Node.js
- npm ou yarn
- Expo CLI
  
### Instalação

```bash
git clone https://github.com/ScientistWsy/tech-challenge-fase4
cd tech-challenge-fase4/Portal
npm install
```

### Execução 

```bash
npx expo start
```


---

### 📌 10. Guia de Uso

Fluxo do usuário:

```md
## 📖 Guia de Uso

1. O usuário realiza login
2. O sistema identifica se é aluno ou professor
3. Professores podem criar e gerenciar posts
4. Alunos podem visualizar os posts disponíveis
5. Professores podem criar e gerenciar os comentários de um post
6. Alunos podem criar comentários e gerenciar os seus próprios comentários
7. Professores podem criar e gerenciar usuários
8. Alunos podem criar e gerenciar usuários que são alunos
```

## 🚀 Melhorias Futuras

- Implementação de testes automatizados
- Cache de dados offline
- Notificações push

## 👥 Autores

- Anderson Rodrigo
- Wesley Silveira dos Santos



