# Backend

## Technologies

- Bun
- Elysia
- Prisma
- PostgreSQL

## Requirements

- Bun
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies

```bash
bun install
```

3. Configure environment variables

```bash
cp .env.example .env
```

4. Start the database

```bash
docker-compose up -d db
```

5. Run migrations

```bash
bunx prisma migrate dev
```

## Development

```bash
bun run dev
```

## Testing

```bash
bun test
```

## Docker

To run the application with Docker:

```bash
docker-compose up
```
