# Aplicação de Ramais

Esta é uma aplicação web que exibe os ramais de uma empresa, permitindo que os usuários visualizem as informações de contato por filial, setor e pessoa responsável. O sistema utiliza SQLite como banco de dados.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
```bash
npm init -y

npm install express sqlite3 body-parser ejs
```
- [SQLite](https://www.sqlite.org/) (para gerenciamento de banco de dados)

### Estrutura do Banco de Dados

Para configurar o banco de dados, você pode executar os seguintes comandos SQL:

```sql
CREATE TABLE ramais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filial TEXT NOT NULL,
    setor TEXT NOT NULL,
    pessoa TEXT NOT NULL,
    ramal TEXT NOT NULL
);

INSERT INTO ramais (filial, setor, pessoa, ramal) VALUES ('Filial A', 'Setor 1', 'Pessoa 1', '101');
INSERT INTO ramais (filial, setor, pessoa, ramal) VALUES ('Filial A', 'Setor 2', 'Pessoa 2', '102');
INSERT INTO ramais (filial, setor, pessoa, ramal) VALUES ('Filial B', 'Setor 1', 'Pessoa 3', '201');
INSERT INTO ramais (filial, setor, pessoa, ramal) VALUES ('Filial B', 'Setor 2', 'Pessoa 4', '202');

Clone o repositório: git clone https://github.com/seu_usuario/nome_do_repositorio.git e acesse o diretório do projeto com cd nome_do_repositorio. Instale as dependências com npm install. Crie um arquivo setup.sql na raiz do projeto com o conteúdo do SQL acima. Para criar a tabela, use o terminal SQLite: sqlite3 ramais.db < setup.sql. Para iniciar o servidor, execute node index.js. O servidor estará disponível em http://localhost:3000. Como administrador, você pode adicionar novos ramais diretamente na URL utilizando o formato http://localhost:3000/add?filial=FILIAL_NAME&setor=SETOR_NAME&pessoa=PESSOA_NAME&ramal=RAMAL_NUMBER, substituindo FILIAL_NAME, SETOR_NAME, PESSOA_NAME e RAMAL_NUMBER pelos valores desejados.
Uso

Selecione a filial desejada no menu suspenso para visualizar apenas os ramais daquela filial. As informações dos ramais serão exibidas em uma tabela organizada.