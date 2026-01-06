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

# Portal de Postagens

Aplicativo mobile desenvolvido em React Native com foco em gerenciamento de posts, alunos e professores, integrando-se a uma API REST para autenticação e controle de permissões.

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

O projeto segue uma arquitetura baseada em separação de responsabilidades:

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
│   ├── assets/images            -- Remover pasta
│   ├── components/                    # Componentes do Projeto
│   ├── contexts/
│   │   ├── AuthConstext.tsx           # Configurações de Autenticação                 
│   ├── services/
│   │   ├── api.js                     # Configurações de comunicação com API
│   ├── styles/
│   │   ├── GlobalStyles.js            # Configurações de Estilos das páginas e componentes
│   ├── types/               
│   ├── .gitignore               -- Remover arquivo
│   ├── app.json
│   ├── eslint.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
├── LICENSE
└── README.md
```


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

### Guia de Uso

Fluxo do usuário:

```md
## Guia de Uso

1. O usuário realiza login
2. O sistema identifica se é aluno ou professor
3. Professores podem criar e gerenciar posts
4. Alunos podem visualizar os posts disponíveis
5. Professores podem criar e gerenciar os comentários de um post
6. Alunos podem criar comentários e gerenciar os seus próprios comentários
7. Professores podem criar e gerenciar usuários
8. Alunos podem criar e gerenciar usuários que são alunos
```

## Melhorias Futuras

- Implementação de testes automatizados
- Cache de dados offline
- Notificações push

## Autores

- Anderson Rodrigo
- Wesley Silveira dos Santos
