# crudPostgres
Crud utilizando Node + Express + Angular + PostgreSQL
Rodando na porta: 3000

Instalar o express generator:
$ npm install -g express-generator@4.13.4

Criar um novo projeto e instalar as dependências
$ express node-postgres-todo
$ cd node-postgres-todo && npm install

Adicione Supervisor para observar as alterações de código:
$ npm install supervisor@0.11.0 -g

Executar utilizando o comando: npm start

#Banco de Dados

Executar o comando dentro da pasta /server:
Deve ter criado a tabela "todo" no postgres

$ node models/database.js
