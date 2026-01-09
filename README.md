## Índice

- [Visão Geral](#portal-de-postagens)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos Técnicos](#requisitos-técnicos)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
  - [Estrutura de Pastas](#estrutura-de-pastas)
  - [Principais Decisões Arquiteturais](#principais-decisões-arquiteturais)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Integração com Back-End](#integração-com-back-end)
- [Controle de Permissões](#controle-de-permissões)
- [Estilização](#estilização)
- [Guia de Uso da Aplicação](#guia-de-uso-da-aplicação)
- [Experiências e Desafios Enfrentados](#experiências-e-desafios-enfrentados)
- [Setup do Projeto](#setup-do-projeto)
- [Melhorias Futuras](#melhorias-futuras)
- [Autores](#autores)

# Portal de Postagens

O Portal de Postagens é um aplicativo mobile desenvolvido em React Native, com foco no gerenciamento de postagens educacionais, usuários (alunos e professores) e comentários. A aplicação integra-se a uma API REST para autenticação, autorização e persistência dos dados, oferecendo diferentes fluxos e permissões de uso conforme o perfil do usuário.

## Tecnologias Utilizadas

- React Native
- JavaScript / TypeScript
- React Hooks
- Context API
- Axios (requisições HTTP)
- React Navigation
- Styled Components / StyleSheet

## Requisitos Técnicos

- Aplicação desenvolvida com React Native
- Uso de componentes funcionais e Hooks
- Integração com API REST
- Controle de autenticação e permissões
- Estilização baseada em layout definido pelo grupo

## Arquitetura da Aplicação

A aplicação segue uma arquitetura baseada em separação de responsabilidades, visando facilitar a manutenção, escalabilidade e reutilização de código.

### Estrutura de Pastas

```bash
tech-challenge-fase4/
├── Portal/              
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login.tsx              # Página de Autenticação - Login de usuários
│   │   ├── (private)/
│   │   │   ├── editar/        
│   │   │   │   ├── [id].tsx           # Página do Professor - Detalhes de uma Postagem
│   │   │   │   ├── usuario.tsx        # Página do Professor - Detalhes de um usuário
│   │   │   ├── professores.tsx        # Página do Professor - Listagem de usuários
│   │   │   ├── gerenciar.tsx          # Página do Professor - Lista de Postagens
│   │   │   ├── newpost.tsx            # Página do Professor - Criar um novo post
│   │   │   ├── register.tsx           # Página do Professor - Cadastramento de usuário
│   │   │   ├── _layout.tsx            # Configuração das páginas do Professor
│   │   ├── (public)/
│   │   │   ├── visualizar/        
│   │   │   │   ├── [id].tsx           # Página do Aluno - Detalhes de uma Postagem
│   │   │   │   ├── usuario.tsx        # Página do Aluno - Detalhes de um usuário
│   │   │   ├── alunos.tsx             # Página do Aluno - Listagem de usuários
│   │   │   ├── home.tsx               # Página do Aluno - Lista de Postagens
│   │   │   ├── registerAluno.tsx      # Página do Aluno - Cadastramento de usuário
│   │   │   ├── _layout.tsx            # Configuração das páginas do Aluno
│   │   ├── post/
│   │   │   ├── [id].tsx               # Página pública - Detalhes de uma Postagem
│   │   ├── _layout.tsx                # Configuração das páginas públicas
│   │   ├── index.tsx                  # Página pública - Lista de Postagens
│   ├── assets/images            
│   ├── components/                    # Componentes do Projeto
│   ├── contexts/
│   │   ├── AuthContext.tsx           # Configurações de Autenticação                 
│   ├── services/
│   │   ├── api.js                     # Configurações de comunicação com API
│   ├── styles/
│   │   ├── GlobalStyles.js            # Configurações de Estilos das páginas e componentes
│   ├── types/               
│   ├── app.json
│   ├── eslint.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
├── LICENSE
└── README.md
```

### Principais Decisões Arquiteturais

- Expo Router para organização das rotas por contexto (público, autenticado e privado)
- Context API para gerenciamento global de autenticação e permissões
- Services para centralizar a comunicação com a API
- Componentização para reutilização de elementos visuais e lógicos

## Gerenciamento de Estado

O gerenciamento de estado da aplicação é feito utilizando a Context API do React, permitindo o compartilhamento de dados como:

- Usuário autenticado
- Token de autenticação
- Lista de posts
- Permissões (Aluno ou Professor)

## Integração com Back-End

A comunicação com o back-end é realizada através de uma API REST.

### Endpoints da API:

| Grupo | Método | Endpoint | Descrição |
|--------|---------|-----------|------------|
| **Autenticação** | POST | `/auth/login` | Login e geração de token JWT |
| **Usuários** | GET | `/auth/usuarios` | Lista usuários com filtros |
| **Usuários** | POST | `/auth/registrar` | Registra novo usuário |
| **Usuários** | PUT | `/auth/usuarios/{id}` | Edita um usuário |
| **Usuários** | DELETE | `/auth/usuarios/{id}` | Exclui um usuário |
| **Posts** | GET | `/posts/busca` | Lista posts com filtro |
| **Posts** | GET | `/posts` | Lista posts ativos |
| **Posts** | GET | `/posts/professor` | Lista todos os posts (modo professor) |
| **Posts** | GET | `/posts/{id}` | Busca post por ID |
| **Posts** | POST | `/posts` | Cria novo post |
| **Posts** | PUT | `/posts/{id}` | Atualiza post existente |
| **Posts** | DELETE | `/posts/{id}` | Exclui post |
| **Comentários** | GET | `/posts/{id}/comentarios` | Lista comentários de um post |
| **Comentários** | POST | `/posts/{id}/comentarios` | Adiciona comentário |
| **Comentários** | PUT | `/posts/{postId}/comentarios/{comentarioId}` | Edita comentário existente |
| **Comentários** | DELETE | `/posts/{postId}/comentarios/{comentarioId}` | Exclui comentário |
 
## Controle de Permissões

O sistema possui dois tipos de usuários:

### Professor
- Pode criar, editar e excluir posts
- Pode visualizar alunos e professores
- Pode criar alunos e professores
- Pode editar e excluir professores

### Aluno
- Pode apenas visualizar os posts
- Pode adicionar comentários em posts
- Não possui permissão para criação ou edição de posts 
- Pode criar, editar e excluir alunos (Conforme requisito solicitado)

## Estilização

A estilização do aplicativo segue o layout definido pelo grupo - minimalista, mantendo:

- Consistência visual
- Responsividade
- Uso de cores básicas e tipografia padronizadas

## Experiências e Desafios Enfrentados

Durante o desenvolvimento do projeto, a equipe enfrentou diversos desafios técnicos e organizacionais, que contribuíram significativamente para o aprendizado prático.

### Principais Desafios

- Controle de permissões: garantir que cada perfil tivesse acesso apenas às funcionalidades permitidas exigiu atenção tanto no front-end quanto na integração com a API.
- Organização de rotas: a separação entre rotas públicas, privadas e autenticadas demandou estudo e adaptação ao modelo do Expo Router.
- Gerenciamento de estado global: estruturar corretamente o contexto de autenticação para evitar inconsistências durante a navegação.
- Integração com a API: ajustes frequentes nos endpoints e tratamento de erros foi realizado para garantir uma boa experiência do usuário.

### Aprendizados

- Melhor compreensão da arquitetura de aplicações mobile
- Uso eficiente de Hooks e Context API
- Importância de documentação clara e padronizada
- Trabalho em equipe e divisão de responsabilidades

Esses desafios contribuíram para a evolução técnica da equipe e para a entrega de uma aplicação mais robusta.

## Setup do Projeto

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

### Guia de Uso da Aplicação

1. O usuário realiza login;
2. O sistema identifica o perfil (Aluno ou Professor);
3. Professores acessam o painel de gerenciamento de posts e usuários;
4. Alunos visualizam os posts disponíveis;
5. Comentários podem ser adicionados conforme as permissões;
6. Usuários podem ser gerenciados de acordo com o perfilais robusta.

## Melhorias Futuras

- Implementação de testes automatizados
- Cache de dados offline
- Notificações push

## Autores

- Anderson Rodrigo Barreira
- Wesley Silveira dos Santos
