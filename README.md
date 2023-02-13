# todo-app-api
Created for BeeGee.

##### [Source code](https://github.com/vovoka-path/todo-app-api) | [Deploy](https://todo-app-api-production.up.railway.app/)

### Stack

- Node.js
- Express
- MySQL
- Sequelize
- jsonwebtoken
- bcrypt

### Frontend (Todo app) for this API

- [Source code](https://github.com/vovoka-path/todo-app)
- [Deploy](https://todo-app-beegee.vercel.app)

### REST endpoints

#### Todos
###### Get all:  `GET` `/api/todos`
###### Get by id: `GET` `/api/todos/:id`
###### Create: `POST` `/api/todos` 
Body: { userName, email, title, isDone, isEdited }
###### Update: `PUT` `/api/todos/:id`
Body: { id, title, isDone, isEdited }
###### Delete: `DELETE` `/api/todos/:id`

#### Users
###### Sign up: `POST` `/api/users/signup`
Body: { login, password }
###### Sign in: `POST` `/api/users/signin`
Body: { login, password }
###### Sign out: `POST` `/api/users/signout`
###### Check authorization: `POST` `/api/users/checkauth`
###### Refresh tokens/authorization: `GET` `/api/users/refresh`

### Install

###### `npm i`

### Available Scripts

###### `npm run develop`

You will also see logs in the console.

## Enviroment variables

`CLIENT_URL="https://todo-app-api-production.up.railway.app/"`
`PORT=8080`
`DATABASE_NAME="DB name"`
`DATABASE_HOST="DB host"`
`DATABASE_USERNAME="DB username"`
`DATABASE_PASSWORD="DB password"`
`DATABASE_DIALECT="mysql"`
`SALT_ROUNDS=5`
`ACCESS_SECRET_KEY="some-words"`
`REFRESH_SECRET_KEY="some-another-words"`

### Developer

[Vladimir Polansky](https://vovoka.space)

### Contact me:

<p align="left">
  <a href="https://www.linkedin.com/in/areawed">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&color=f0f6fc&logo=linkedin&logoColor=0A66C2" height="32" />
  </a>
  <a href="https://t.me/vovoka">
    <img alt="Telegram" src="https://img.shields.io/badge/Telegram-blue?style=for-the-badge&color=f0f6fc&logo=telegram&logoColor=26A5E4&s" height="32" />
  </a>
  <a href="https://discordapp.com/users/919948615399665675/">
    <img alt="Discord" src="https://img.shields.io/badge/Discord-blue?style=for-the-badge&color=f0f6fc&logo=discord&logoColor=5865F2" height="32" />
  </a>
  <a href="https://twitter.com/HocWmVhqQoDVK9m">
    <img alt="Twitter" src="https://img.shields.io/badge/Twitter-blue?style=for-the-badge&color=f0f6fc&logo=twitter&logoColor=1DA1F2" height="32" />
  </a>
  <a href="mailto:vovoka.path@gmail.com">
    <img alt="Gmail" src="https://img.shields.io/badge/Gmail-blue?style=for-the-badge&color=f0f6fc&logo=gmail&logoColor=EA4335" height="32" />
  </a>
</p>
