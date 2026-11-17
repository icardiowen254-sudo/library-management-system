# Library Management API setup

## 1. Install dependencies

Open a terminal in the `api` directory:

```bash
npm install
```

The API uses NestJS, Prisma, class-validator, Passport/JWT, and bcrypt.

## 2. Configure environment variables

Copy `.env.example` to `.env` and set:
- `DATABASE_URL`: your PostgreSQL connection string.
- `JWT_SECRET`: a private random secret of at least 32 characters.

Do not commit your real `.env` file or share your JWT secret.

## 3. Generate Prisma Client and migrate

Run these commands from `api/`:

```bash
npx prisma generate
npx prisma migrate dev
npx ts-node prisma/seed.ts
```

The migrations create the database tables and add genre slugs plus book inventory fields. The seed script inserts four genres and fifteen sample books.

## 4. Start the API

```bash
npm run start:dev
```

The default local address is `http://localhost:3000`. Import `docs/postman_collection.json` into Postman and set the `baseUrl` collection variable to that address.

## 5. Authentication and librarian access

Registering creates a PATRON account. The API intentionally does not let a user choose their own role during registration. To test librarian-only book create, update, and delete routes, promote a trusted test account using Prisma Studio:

```bash
npx prisma studio
```

Open the User table and change only the intended test account's `role` to `LIBRARIAN`. Log in again to obtain a JWT containing the updated role, then use it as a Bearer token in Postman.

## Available routes

- `POST /auth/register`, `POST /auth/login`
- `GET /genres`, `GET /genres/:id`, `POST /genres`, `PATCH /genres/:id`, `DELETE /genres/:id`
- `GET /books`, `GET /books/:id`, `POST /books`, `PATCH /books/:id`, `DELETE /books/:id`
- `GET /users/profile` (authenticated)

Book listing supports `genreId`, `search`, `page`, and `limit` query parameters. Search matches title and author. Book create/update/delete require a valid LIBRARIAN JWT. DTO validation is enabled globally and unknown request properties are rejected.
