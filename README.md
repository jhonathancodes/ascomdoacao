# Doe Fácil 🎁  
Sistema de doações desenvolvido em React com Firebase, permitindo que usuários cadastrem itens para doação e administradores aprovem ou rejeitem as solicitações.

---

## 📋 Funcionalidades

### Para Doadores
- **Cadastro e Login**: Sistema completo de autenticação  
- **Cadastro de Doações**: Formulário para registrar itens para doação  
- **Acompanhamento**: Visualização do status das doações (pendente/aprovado)  
- **Gerenciamento**: Possibilidade de excluir doações próprias  

### Para Administradores
- **Painel de Moderação**: Visualização de todos os itens pendentes  
- **Aprovação/Rejeição**: Sistema de aprovação com feedback visual  
- **Gerenciamento**: Controle total sobre as doações no sistema  

---

## ⚙️ Recursos Gerais

- **Sistema de Roles**: Diferenciação entre doadores e administradores  
- **Interface Responsiva**: Adaptável a diferentes tamanhos de tela  
- **Notificações**: Sistema de toast para feedback ao usuário  
- **Navegação Protegida**: Rotas privadas baseadas em autenticação e permissões  

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 com Vite  
- **Autenticação**: Firebase Auth  
- **Banco de Dados**: Cloud Firestore  
- **Roteamento**: React Router DOM  
- **Ícones**: React Icons (Feather Icons)  
- **Estilos**: CSS puro com design responsivo  

---

## 🚀 Instalação e Execução

### ✅ Pré-requisitos

- Node.js (versão 14 ou superior)  
- npm ou yarn  
- Conta no Firebase  

### 🔧 Configuração do Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com)  
2. Crie um novo projeto ou use um existente  
3. Habilite **Authentication** (Email/Password)  
4. Configure o **Cloud Firestore**  
5. Copie as credenciais do projeto  

### 🖥️ Instalação

```bash
# Clone o repositório
git clone [url-do-repositório]

# Navegue até o diretório
cd doe-facil

# Instale as dependências
npm install
🔑 Configure o Firebase
No arquivo firebase.js, substitua as credenciais pelas do seu projeto.

▶️ Execute o projeto
bash
Copiar
Editar
npm run dev
🧱 Estrutura de Dados no Firestore
📄 Coleção users
js
Copiar
Editar
{
  uid: "user_id",
  email: "usuario@email.com",
  phone: "11999999999",
  role: "doador" | "admin",
  createdAt: timestamp
}
📄 Coleção objetos
js
Copiar
Editar
{
  title: "Título do item",
  description: "Descrição detalhada",
  phone: "11999999999",
  userId: "user_id",
  status: "pendente" | "aprovado",
  createdAt: timestamp
}
📁 Estrutura do Projeto
bash
Copiar
Editar
src/
├── components/
│   ├── AdminPanel.jsx          # Painel do administrador
│   ├── DoadorPanel.jsx         # Painel do doador
│   ├── ItemCard.jsx            # Card de exibição de item
│   ├── Login.jsx               # Componente de autenticação
│   ├── Navbar.jsx              # Barra de navegação
│   ├── ObjectForm.jsx          # Formulário de doação
│   ├── PrivateRoute.jsx        # Componente de rota protegida
│   └── Auth.css                # Estilos de autenticação
├── assets/
│   ├── logo.jpeg               # Logo da aplicação
│   └── kids.jpg                # Imagem decorativa
├── firebase.js                 # Configuração do Firebase
├── App.jsx                     # Componente principal
├── main.jsx                    # Ponto de entrada
└── styles.css                  # Estilos globais
🔐 Sistema de Autenticação
Fluxo de Autenticação
Cadastro: Usuários se registram com email, senha e telefone

Login: Autenticação via email e senha

Verificação de Role: Sistema verifica permissões no Firestore

Redirecionamento: Usuários são direcionados para o painel apropriado

Roles e Permissões
Doador: Pode cadastrar e gerenciar suas próprias doações

Admin: Pode aprovar/rejeitar todas as doações pendentes

🎨 Interface do Usuário
Tela de Login
Design split-screen com imagem lateral

Formulário de login/cadastro alternável

Validação de campos e feedback de erro

Responsivo para dispositivos móveis

Painel do Doador
Formulário para cadastro de novas doações

Lista de doações próprias com status

Possibilidade de excluir doações

Painel do Administrador
Lista de doações pendentes

Botões de aprovação e rejeição

Feedback visual das ações

🔧 Configuração Adicional
Criando um Usuário Administrador
Acesse o Firestore Console

Encontre o documento do usuário na coleção users

Altere o campo role de "doador" para "admin"

Customização de Estilos
src/styles.css - Estilos globais

src/components/Auth.css - Estilos de autenticação

📱 Responsividade
O sistema foi desenvolvido com design responsivo, adaptando-se a:

Desktop: 1200px+

Tablet: 768px - 1199px

Mobile: até 767px

🚧 Funcionalidades Futuras
Sistema de notificações push

Upload de imagens para doações

Chat entre doadores e interessados

Sistema de categorias

Geolocalização para doações

Relatórios e estatísticas

🤝 Contribuindo
Faça um fork do projeto

Crie uma branch para sua feature

bash
Copiar
Editar
git checkout -b feature/NomeDaFeature
Commit suas mudanças

bash
Copiar
Editar
git commit -m 'Adiciona nova feature'
Push para a branch

bash
Copiar
Editar
git push origin feature/NomeDaFeature
Abra um Pull Request

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👥 Autor
Desenvolvido por Jhonathan Lima.

📞 Suporte
Email: jhonathandev7@gmail.com

GitHub Issues: https://github.com/jhonathancodes

Doe Fácil - Facilitando a solidariedade através da tecnologia 🌟