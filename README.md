## zPlatform

Company Z provides essential online services for tens of thousands of users through their platform ZPlatform.

### Pre-requisite

- Node.js
- Express
- Typescript
- Docker

### Installation

Recommended to use docker way rather than installing the project in your PC

- Clone this project
- Install all dependencies `yarn`
- Create a `.env.dev` file and fill it with data from `.env.example`
- Start postgres container in docker `docker compose up`
- Build the app `yarn build`
- Migrate your database `yarn migrate:dev`
- Start the server `yarn start`

### Starting through docker

- Clone this project
- Install all dependencies `yarn`
- Create a `.env.dev` file and fill it with data from `.env.example`
- Start postgres container in docker `docker compose up`
- Get all running containers `docker ps`
- Migrate your database in the container `docker exec [image id with api name] npm run migrate:dev`

### Testing

Start postman client and send a get request to `localhost:8080`

### Routes

#### Authentication

- Signup [POST] `/api/auth/signup
- Email Verification [GET] `/api/auth/verify/?token={token}`
- login [POST] `/api/auth/login`

#### Users

- Get one's profile [GET] `/api/users/me`
- Update your profile [PUT] `/api/users/update`

#### Schema

- Signup Schema

```json
  firstname: string;
  lastname: string;
  email: string;
  password: string;
```

- Login

```json
  firstname: string;
  lastname: string;
```

- Profile

```json
  firstname?: string;
  lastname?: string;
  gender?: string;
  dob?: string;
  maritalStatus?: string;
  nationality?: string;
  profile?: string;
```
