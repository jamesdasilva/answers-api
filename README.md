# questions-api

API REST de perguntas e respostas 

### Pré-requisitos

É necessário ter instalado o Docker e o Docker Compose 

### Iniciar aplicação

Para iniciar a execução da API, execute o comando 
```
npm run up
```
ou 
```
docker-compose up
```
Com isso, o ambiente com Node e MongoDB será montado, as dependências da aplicação serão instaladas e o servidor será iniciado.

### Seeds

Para tornar os testes funcionais (back-end + front-end) mais confiáveis, foi criado um seed para garantir um estado previsível dos dados. Ele pode ser acessado através de requisições HTTP no endpoint api/seed. O método POST popula o banco com dados e o DELETE o esvazia.

### Documentação

A documentação está expressa em forma de postman collection, disponível na raiz do projeto.

### Contruído com
- [Node.js](https://nodejs.org/) - Um ambiente de execução JavaScript criado com o mecanismo JavaScript V8 do Chrome.
- [Express](https://expressjs.com/) - Um framework web minimalista para Node.js. 
- [MongoDB](https://www.mongodb.com/) - Um gerenciador de banco de dados baseado em documentos.
- [Docker](https://www.docker.com/) - Um gerenciador de conatiners.

### Autor
James Oliveira da Silva - Initial work - [jamesodas](https://github.com/jamesodas)

### Licença

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/jamesdasilva/answers-web/blob/master/LICENSE) file for details
