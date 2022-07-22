# Boas vindas ao repositório do Talker Manager!

O Projeto Talker Menager foi desenvolvido para treinar meus conhecimentos em Node.js.
Foi desenvolvido uma API fazendo um CRUD (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes. Utilizei Expresses para os endpoints que irão ler e escrever em um arquivo, isso utilizando o módulo `fs`.
Tive 1 dia para entrega deste projeto.

---

# Habilidades

Neste projeto, exercitei as habilidades:

- Realizar operações assíncronas utilizando callbacks;
- Realizar operações assíncronas utilizando Promises;
- Ler e escrever arquivos localmente com NodeJS;
- Escrever seus próprios scripts que criam e consomem Promises;
- Reescrever código que usa callbacks para que use Promises;
- Realizar chamadas de funções de forma consciente;
- Entender os conceitos básicos de como o JavaScript funciona;
- Detectar e solucionar problemas no código de forma mais objetiva;
- Entender a diferença entre execução síncrona e assíncrona;
- Entender o que é o HTTP, o que é uma API e o que os dois têm a ver com o Express;
- Escrever APIs utilizando Node e Express;
- Entender a estrutura de uma aplicação Express e como organizar seu código;
- Criar rotas e aplicar middlewares.

---

# Como rodar localmente...

- Para rodar este projeto localmente você vai precisar ter instalado o GitHub e o Node , e basta seguir o passo a passo abaixo.
- 1. Clone o repositório com o comando:
  - `git clone git@github.com:caioBatistaDosSantos/Project-Talker-Manager.git`;
    - Entre na pasta do repositório:
      - `cd Project-Talker-Manager`
- 2. Instale as dependencia com o comando:
  - `npm install`
- 3. Por fim inicie a aplicação com o comando:
  - `npm start`

---

# ROTAS DO PROJETO

### 1 - Endpoint GET `/talker`

- O endpoint retorna um array com todas as pessoas palestrantes cadastradas. Devendo retornar o `status 200`, com os dados no corpo.


### 2 - Endpoint GET `/talker/:id`

- O endpoint retorna uma pessoa palestrante com base no id da rota. Devendo retornar o `status 200` ao fazer uma requisição `/talker/1`, com o seguinte corpo:

  ```json
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
  ```

- Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o `status 404` com o seguinte corpo:

  ```json
  {
    "message": "Pessoa palestrante não encontrada"
  }
  ```

### 3 - Endpoint POST `/login`

O endpoint deverá receber no corpo da requisição os campos `email` e `password` e retornar um token aleatório de 16 caracteres. Este token será utilizado pelas requisições dos próximos requisitos do projeto.

- O corpo da requisição deverá ter o seguinte formato:

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

As regras de validação são:
- o campo `email` é obrigatório;
- o campo `email` deve ter um email válido;
- o campo `password` é obrigatório;
- o campo `password` deve ter pelo menos 6 caracteres.

- O endpoint retorna um código de `status 200` com o token gerado no corpo.

### 4 - Endpoint POST `/talker`

- O endpoint adiciona uma nova pessoa palestrante ao seu arquivo;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

- O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.
- O campo `age` deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.
- O campo `talk` deverá ser um objeto com as seguintes chaves:
  - A chave `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.
  - A chave `rate` deve ser um inteiro de 1 à 5.


- Caso esteja tudo certo, retorna o `status 201`  e a pessoa cadastrada.

### 5 - Endpoint PUT `/talker/:id`

- O endpoint edita uma pessoa palestrante com base no id da rota, sem alterar o id registrado.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```
- A requisição deve ter o token de autenticação nos headers, no campo `authorization` e valida as nformações da mesma maneira do endpoint anterior (POST `/talker`).

- Caso esteja tudo certo, retorne o `status 200` e a pessoa editada.


### 6 - Endpoint DELETE `/talker/:id`

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

- O endpoint deleta uma pessoa palestrante com base no id da rota. Devendo retornar o `status 204`, sem conteúdo na resposta.

### 7 - Endpoint GET `/talker/search?q=searchTerm`

- O endpoint retorna um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o `status 200`, com o seguinte corpo:

  ```
  /search?q=Da
  ```

  ```json
  [
    {
      "id": 1,
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5,
      },
    }
  ]
  ```

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

---

# Feedback são bem-vindos!!

- Se Possivel, deixe seu feedback ou seu code-review! Muito Obrigado! :)🤝🛠

- Linkedin: https://www.linkedin.com/in/caio-batista-dos-santos/
- Gmail: drcaiosan@gmail.com