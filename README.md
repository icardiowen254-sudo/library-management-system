# Library Management System

A backend library management system built with NestJS, Prisma ORM, and PostgreSQL.

## Technology Stack
- NestJS and TypeScript
- Prisma ORM 6
- PostgreSQL
- Prisma Client
- tsx for database seeding

## Database Schema

### Role
The Role enum defines two roles: PATRON and LIBRARIAN.

### User
Stores user names, unique email addresses, passwords, roles, and timestamps.

### Genre
Stores unique genre names, optional descriptions, and related books.

### Book
Stores titles, authors, unique ISBNs, descriptions, publication dates, and genre references.

## Schema Decisions

Genre is stored as a separate model instead of repeating genre names inside every Book record.

A Genre can have many Books, while each Book belongs to one Genre through the genreId foreign key.

This relational design provides:
- Normalization: genre information is stored once, reducing unnecessary duplication.
- Consistency: genre details can be updated in one place.
- Referential integrity: each book must reference an existing genre.
- Maintainability: genres can be managed independently of books.
- Data protection: the Restrict deletion rule prevents deleting genres that are still referenced by books.

Unique constraints on User.email, Genre.name, and Book.isbn prevent duplicate records.

## Database Migration and Seeding

From the api directory, install dependencies:
npm install

Configure DATABASE_URL in a local .env file using api/.env.example as a template.

Apply migrations:
npx prisma migrate dev

Generate Prisma Client:
npx prisma generate

Seed the database:
npx prisma db seed

The seed script creates four genres and fifteen books. It uses upsert operations to avoid duplicate records when executed repeatedly.

## Prisma Service

The NestJS PrismaService extends PrismaClient and implements OnModuleInit. It connects to PostgreSQL when the application initializes.

## Project Structure

`	ext
library-management-system/
|-- README.md
|-- api/
    |-- prisma/
    |   |-- schema.prisma
    |   |-- seed.ts
    |   |-- migrations/
    |-- src/
    |   |-- prisma/prisma.service.ts
    |-- .env.example
    |-- prisma.config.ts
    |-- package.json
`",
",


From the api directory:
npm run start:dev

Build the application:
npm run build

## Environment Security

Database credentials must remain in the local .env file. Never commit real credentials to GitHub. The .env.example file contains placeholders only.
