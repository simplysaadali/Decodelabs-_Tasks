# Project 2: Database Integration (CRUD)

Backend API for a `User` resource with full CRUD, built with **Node.js + Express + Prisma + PostgreSQL**.

## 1. Prerequisites to install

- **Node.js** (v18+) and npm — https://nodejs.org
- **PostgreSQL** running locally, OR Docker (recommended):
  ```bash
  docker run --name decodelabs-pg -e POSTGRES_PASSWORD=password -e POSTGRES_DB=decodelabs_db -p 5432:5432 -d postgres
  ```

## 2. Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and edit DATABASE_URL if needed
cp .env.example .env

# 3. Generate Prisma client
npx prisma generate

# 4. Run the migration (creates the "users" table)
npx prisma migrate dev --name init

# 5. Start the server
npm run dev   # (uses nodemon, auto-restarts)
# or
npm start
```

Server runs at: `http://localhost:3000`

## 3. File structure

```
backend-crud-project/
├── package.json
├── .env.example
├── prisma/
│   └── schema.prisma        <- User model definition
└── src/
    ├── server.js             <- Express app entry point
    ├── prismaClient.js       <- Shared Prisma DB client
    ├── routes/
    │   └── userRoutes.js     <- Maps HTTP verbs to controller functions
    └── controllers/
        └── userController.js <- CRUD logic + 409 conflict handling
```

## 4. Testing the CRUD lifecycle (matches the deck's verification steps)

| Step | Request | Expected |
|---|---|---|
| Create | `POST /users` body: `{"email":"intern@tech.com","age":24}` | `201 Created` |
| Duplicate | `POST /users` same email again | `409 Conflict` |
| Read all | `GET /users` | `200 OK` |
| Read one | `GET /users/1` | `200 OK` |
| Update | `PATCH /users/1` body: `{"age":25}` | `200 OK` |
| Delete | `DELETE /users/1` | `204 No Content` |

### Example curl commands

```bash
# Create
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"intern@tech.com","age":24}'

# Duplicate (expect 409)
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"intern@tech.com","age":24}'

# Read all
curl http://localhost:3000/users

# Update
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age":25}'

# Delete
curl -X DELETE http://localhost:3000/users/1
```

You can also import these into **Postman** as described in the training deck's verification slide.

## 5. Notes on data integrity
- `email` is marked `@unique` in the Prisma schema → duplicate POSTs are rejected by the database and translated into an HTTP `409` by the controller (catching Prisma error code `P2002`).
- `age` is validated in the controller (`>= 0`) before it ever reaches the database.
- `isActive` defaults to `true` and `createdAt` is auto-set — matching the schema blueprint in the deck.